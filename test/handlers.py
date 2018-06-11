#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from coreweb import post, get


@get('/')
def index(*, page=1):
    pass
