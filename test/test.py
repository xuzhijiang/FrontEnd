#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def add_routes(module_name):
    n = module_name.rfind('.')
    print('n: %s' % n)
    if n == (-1):
        mod = __import__(module_name, globals(), locals())
    else:
        name = module_name[n+1:]
        mod = __import__(module_name[:n], globals(), locals(), [name])
    print(dir(mod))
    for attr in dir(mod):
        if attr.startswith('__'):
            continue
        fn = getattr(mod, attr)



add_routes("handlers.py")

