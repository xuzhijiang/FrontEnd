#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def init_jinja2(**kw):
    options = dict(
        autoescape = kw.get('autoescape', True),
        auto_reload = kw.get('auto_reload', True)
        )
    print('options: %s' % options)

init_jinja2(filter=dict(autoescape=False))