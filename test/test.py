#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import logging, inspect, time, uuid
logging.basicConfig(level=logging.INFO)

def foo(x):
	return x * x

r = map(foo, [1, 2, 4, 8])
print(list(r))