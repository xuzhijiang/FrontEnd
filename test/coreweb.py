#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import functools


def get(path):
    '''
    Define decorator @get('/path')
    '''
    def decorator(func):
        @functools.wraps(func)
	def wrapper(*args, **kw)
            func(*args, **kw)
	return wrapper
	wrapper.__method__ = 'GET'
	wrapper.__route__ = path
    return decorator

def post(path):
    def decorator(func):
        @functools.wraps(func)
	def wrapper(*args, **kw):
	    func(*args, **kw)
	return wrapper
	wrapper.__method__ = 'POST'
	wrapper.__route__ = path
    return decorator
