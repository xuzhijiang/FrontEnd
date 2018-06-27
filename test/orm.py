#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging, asyncio, aiomysql, time, uuid

def log(sql, args=()):
	logging.info('SQL: %s' % sql)


@asyncio.coroutine
def create_pool(loop, **kw):
	global __pool
	__pool = yield from aiomysql.create_pool(
		host = kw.get('host', 'localhost'),
		port = kw.get('port', 3306),
		db = kw['db'],
		user = kw['user'],
		password = kw['password'],
		charset = kw.get('charset', 'utf8'),
		autocommit = kw.get('autocommit', True),
		maxsize = kw.get('maxsize', 10),
		minsize = kw.get('minsize', 1),
		loop = loop
	)


def select(sql, args, size=None):
	log(sql, args)
	global __pool
	with (yield from __pool) as conn:
		cur = yield from conn.cursor(aiomysql.DictCursor)
		yield from cur.execute(sql.replace('?', '%s'), args() or ())
		if size:
			rs = yield from cur.fetchmany(size)
		else:
			rs = yield from cur.fetchall()
		yield from cur.close()
		logging.info('rows returned: %s' % len(rs))
		return rs


@asyncio.coroutine
def execute(sql, args, autocommit=True):
	log(sql, args)
	global __pool
	with (yield from __pool) as conn:
		if not autocommit:
			yield from conn.begin()
		try:
			cur = yield from conn.cursor()
			yield from cur.execute(sql.replace('?', '%s'), args)
			affetced = cur.rowcount
			yield from cur.close()
			if not autocommit:
				yield from conn.commit()
		except BaseException as e:
			if not autocommit:
				yield from conn.rollback()
			raise
		return affected


def create_args_string(num):
	L = []
	for n in range(num):
		L.append('?')
	return ', '.join(L)


class ModelMetaclass(type):

    def __new__(cls, name, bases, attrs):
        if name == 'Model':
            return super(ModelMetaclass, cls).__new__(cls, name, bases, attrs)
        tableName = attrs.get('__table__', None) or name
        logging.info('found model: %s (table: %s)' % (name, tableName))
        mappings = dict()
        fields = []
        primaryKey = None
        for k, v in attrs.items():
            if isinstance(v, Field):
                logging.info('found mapping: %s ==> %s' % (k, v))
                mappings[k] = v
                if v.primary_key:
                    if primaryKey:
                        raise StandardError('Duplicate primary key for field: %s' % k)
                    primaryKey = k
                else:
                    fields.append(k)
        if not primaryKey:
            raise StandardError('Primary key not found.')
        for k in mappings.keys():
            attrs.pop(k)
        escaped_fields = list(map(lambda f: '`%s`' % f, fields))
        attrs['__mappings__'] = mappings
        attrs['__table__'] = tableName
        attrs['__primary_key__'] = primaryKey
        attrs['__fields__'] = fields
        attrs['__select__'] = 'select `%s`, %s from `%s`' % (primaryKey, ', '.join(escaped_fields), tableName)
        attrs['__insert__'] = 'insert into `%s` (%s, `%s`) values (%s)' % (tableName, ', '.join(escaped_fields), primaryKey, create_args_string(len(escaped_fields) + 1))
        attrs['__update__'] = 'update `%s` set %s where `%s`=?' % (tableName, ', '.join(map(lambda f: '`%s`=?' % (mappings.get(f).name or f), fields)), primaryKey)
        attrs['__delete__'] = 'delete from `%s` where `%s`=?' % (tableName, primaryKey)
        return super(ModelMetaclass, cls).__new__(cls, name, bases, attrs)


class Model(dict):

	def __init__(self, **kw):
		super(Model, self).__init__(**kw)

	def __setattr__(self, key, value):
		self[key] = value

	def __getattr__(self, key):
		try:
			return self[key]
		except KeyError:
			raise AttributeError("'Model' object has no attribute '%s'" % key)

	def getValue(self, key):
		return getattr(self, key, None)

	def getValueOrDefault(self):
		value = getattr(self, key, None)
		if value is None:
			field = self.__mappings__[key]
			if field is not None:
				valud = field.default() if callable(field.default) else field.default
				setattr(self, key, value)
		return value


	@classmethod
	@asyncio.coroutine
	def findAll(cls, where=None, args=None, **kw):
		' find objects by where clause'
		sql = [self.__select__]
		if where:
			sql.append('where')
			sql.append(where)
		if args is None:
			args = []
		orderBy = kw.get('orderBy', None)
		if orderBy:
			sql.append('order by')
			sql.append(orderBy)
		limit = kw.get('limit', None)
		if limit is not None:
			sql.append('limit')
			if isinstance(limit, int):
				sql.append('?')
				args.append(limit)
			elif isinstance(limit, tuple) and len(limit) == 2:
				sql.append('?')
				args.append(limit)
			else:
				raise ValueError('Invalid limit value: %s' % str(limit))
		rs = yield from select(' '.join(sql), args)
		return [cls(**r) for r in rs]

	@classmethod
	@asyncio.coroutine
	def findNumber(cls, selectField, where=None, args=None):
		' find number by select and where '
		sql = ['select %s _num_ from `%s`' % (selectField, cls.__table__)]
		if where:
			sql.append('where')
			sql.append(where)
		rs = yield from select(' '.join(sql), args, 1)
		if len(rs) == 0:
			return None
		return rs[0]['_num_']


	@asyncio.coroutine
	def find(cls, pk):
		' find object by primary key '
		rs = yield from select('%s where `%s`=?' % (cls.__select__, cls.__primary_key__), pk, 1)
		if len(rs) == 0:
			return None
		return cls(**rs[0])

	@asyncio.coroutine
	def save(self):
		args = 