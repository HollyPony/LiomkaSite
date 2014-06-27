import os
dirname = os.path.dirname(__file__)

HTTPPORT = int(os.environ.get("PORT", 80))
STATIC_PATH = os.path.join(dirname, 'static')
TEMPLATE_PATH = os.path.join(dirname, 'templates')
