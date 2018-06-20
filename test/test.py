#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def get_page_index(p_str):
	page = 1
	try:
		page = int(p_str)
	except ValueError as e:
		print('error')
		pass
	print('page: %s' % page)
	if page < 1:
		page = 1
	return page

print(get_page_index('35'))