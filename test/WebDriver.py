#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from selenium import webdriver

driver = webdriver.Chrome()
executor_url = driver.command_executor._url
session_id = driver.session_id
print(executor_url)
print(session_id)
driver.get("http://www.spiderpy.cn/")