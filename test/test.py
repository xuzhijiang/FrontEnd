#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def add_route(fn):
    method = getattr(fn, '__method__', None)
    route = getattr(fn, '__route__', None)

text = 'handlers.py'
index = text.rfind('.')
print('result is %s' % text[:index])

mod = __import__(text[:index], globals(), locals())
print('mod is %s' % mod)


