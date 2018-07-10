# -*- coding: utf-8 -*-
import sys

PY2 = sys.version_info[0] == 2

if not PY2:
	text_type = str
	string_types = (str,)
	integer_types = (int,)