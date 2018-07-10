class Config(dict):

	def from_object(self, obj):
		if isinstance(obj, string_types):
			obj = import_string(obj)
		print(dir(obj))
		for key in dir(obj):
			print('key -> %s' % key)
			if key.isupper():
				self[key] = getattr(obj, key)
				print('value -> %s' % getattr(obj, key))

class C(dict):
	SECRET_KEY = 'hard to guess string'
	mail_server = '163.mail.server'

config = {
	'default': Config
}

string_types = (str)

print(type(config['default']))
print(isinstance(config['default'], string_types))
c = config['default']()
c.from_object(C)
print()