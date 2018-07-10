class Blueprint(object):

	def __init__(self, name):
		self.name = name

	def route(self, f, **options):
		endpoint = options.pop("endpoint", f.__name__)
		print(endpoint)
		print(options)

def shutdown():
	pass

main = Blueprint('main')
main.route(shutdown, methods=['GET', 'POST'])