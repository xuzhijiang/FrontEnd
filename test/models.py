#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging


def create_args_string(num):
	L = []
	for _ in range(num):
		L.append('?')
	return ', '.join(L)

class Field(object):

	def __init__(self, name=None, column_type=None, primary_key=False, default=None):
		self.name = name
		self.primary_key = primary_key
		self.column_type = column_type
		self.default = default


class StringField(Field):

	def __init__(self, name=None, primary_key=False, default=None, ddl='varchar(100)'):
		super(StringField, self).__init__(name, ddl, primary_key, default)


class ModelMetaclass(type):

	def __new__(cls, clsname, bases, attr):
		if clsname == 'Model':
			return type.__new__(cls, clsname, bases, attr)
		tablename = attr.get('__tablename__', None)
		if tablename is None:
			tablename = clsname
		print('tablename: %s' % tablename)
		mappings = dict()
		fields = []
		primary_key = None
		for k, v in attr.items():
			if isinstance(v, Field):
				mappings[k] = v
				if v.primary_key:
					if primary_key:
						raise StandardError('Duplicate primary_key for field: %s' % k)
					else:
						primary_key = k
				else:
					fields.append(k)
		if not primary_key:
			raise StandardError('primary_key not found')
		for key in mappings.keys():
			attr.pop(key)
		print('fields: %s' % fields)
		escape_fields = list(map(lambda f: '`%s`' % f, fields))
		print('escape_fields: %s' % list(escape_fields))
		attr['__select__'] = 'select `%s`, %s from `%s`' % (primary_key, ', '.join(escape_fields), tablename)
		print(attr.get('__select__', None))
		attr['__insert__'] = 'insert into `%s` (%s, `%s`) values (%s)' % (tablename, ', '.join(escape_fields), primary_key, create_args_string(len(escape_fields) + 1))
		print(attr.get('__insert__', None))
		attr['__update__'] = 'update `%s` set %s where `%s`=?' % (tablename, ', '.join(map(lambda f: '`%s`=?' % (mappings.get(f).name or f), fields)), primary_key)
		print(attr.get('__update__', None))
		attr['__delete__'] = 'delete from `%s` where `%s`=?' % (tablename, primary_key)
		print(attr.get('__delete__', None))
		return type.__new__(cls, clsname, bases, attr)

class User(metaclass=ModelMetaclass):
	__tablename__ = 'User'

	id = StringField(name='id', primary_key=True, ddl='varchar(50)')
	email = StringField(name='email', ddl='varchar(20)')
	passwd = StringField(name='passwd', ddl='varchar(10)')
	gender = StringField(name='gender', ddl='varchar(3)')
