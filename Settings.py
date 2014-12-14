import os
dirname = os.path.dirname(__file__)

DATABASE_NAME = os.environ.get("DATABASE_NAME", "LiomkaSite")
DATABASE_HOST = os.environ.get("DATABASE_HOST", "localhost")
DATABASE_PORT = os.environ.get("DATABASE_PORT", "5432")
DATABASE_USER = os.environ.get("DATABASE_USER", "user")
DATABASE_PASS = os.environ.get("DATABASE_PASS", "")
WSSERVER_URI = os.environ.get("WSSERVERURI", "ws://pywsserver.herokuapp.com/ws")

STATIC_PATH = os.path.join(dirname, 'static')
TEMPLATE_PATH = os.path.join(dirname, 'templates')
