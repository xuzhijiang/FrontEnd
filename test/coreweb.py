#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import functools, inspect


def get(path):
    '''
    Define decorator @get('/path')
    '''
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            return func(*args, **kw)
        wrapper.__method__ = 'GET'
        wrapper.__route__ = path
        return wrapper
    return decorator

def post(path):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            return func(*args, **kw)
        wrapper.__method__ = 'POST'
        wrapper.__route__ = path
        return wrapper
    return decorator


@get('/')
def index(a, b, page = 1):
    pass


def get_required_kw_args(fn):
    args = []
    params = inspect.signature(fn).parameters
    for name, param in params.items():
        print('%s : %s' % (name, param))
        print('param.kind : %s' % param.kind)
        print('param.default : %s' % param.default)
        if param.kind == inspect.Parameter.KEYWORD_ONLY \
            and param.default == inspect.Parameter.empty:
            args.append(name)
    return tuple(args)

def get_named_kw_args(fn):
    args = []
    params = inspect.signature(fn).parameters
    for name, param in params.items():
        print('param.kind : %s' % param.kind)
        if param.kind == inspect.Parameter.KEYWORD_ONLY:
            args.append(name)
    return args


def power(n, x=3, *args, d, city='bj', **kw):
    print('n: %s, x: %s, d: %s, city: %s' % (n, x, d, city))


args = get_named_kw_args(power)
print(args)
power(2, 4, 3, 5, city='hz', d=3, k='xzj')

# def power(n, x=3, *, d, city='bj', **kw):
#     print('n: %s, x: %s, d: %s, city: %s' % (n, x, d, city))
# inspect.Parameter.KEYWORD_ONLY (named keyword argument) e.g: d,city
# inspect.Parameter.VAR_KEYWORD (keyword argument) e.g: kw

# def power(n, x=3, *args, d, city='bj', **kw):
#     print('n: %s, x: %s, d: %s, city: %s' % (n, x, d, city))
# inspect.Parameter.VAR_POSITIONAL e.g: *args
# inspect.Parameter.POSITIONAL_OR_KEYWORD e.g: n, x

def manager(*, page=1):
    pass
m_args = get_required_kw_args(manager)
print(m_args)