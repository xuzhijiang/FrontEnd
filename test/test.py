#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client.pymongo_test

posts = db.posts
post_data = {
	'title': 'Python and MongoDb',
	'content': 'learn MongoDb in Python',
	'author': 'xzj'
}
result = posts.insert_one(post_data)
print('One post: {0}'.format(result.inserted_id))
