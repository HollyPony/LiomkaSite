import os
dirname = os.path.dirname(__file__)

WSSERVER_URI = os.environ.get("WSSERVERURI", "ws://pywsserver.herokuapp.com/ws")

STATIC_PATH = os.path.join(dirname, 'static')
TEMPLATE_PATH = os.path.join(dirname, 'templates')
