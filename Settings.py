import os

__author__ = 'Liomka'

# Local params
dirname = os.path.dirname(__file__)
STATIC_PATH = os.path.join(dirname, 'static')
TEMPLATE_PATH = os.path.join(dirname, 'templates')

# DB params
DATABASE_NAME = os.environ.get("DATABASE_NAME", "LiomkaSite")
DATABASE_HOST = os.environ.get("DATABASE_HOST", "localhost")
DATABASE_PORT = os.environ.get("DATABASE_PORT", "5432")
DATABASE_USER = os.environ.get("DATABASE_USER", "user")
DATABASE_PASS = os.environ.get("DATABASE_PASS", "")
DATABASE_URI = os.environ.get("DATABASE_URI", "postgresql+psycopg2://"
                               + DATABASE_USER + ":" + DATABASE_PASS
                               + "@" + DATABASE_HOST + ":" + DATABASE_PORT
                               + "/" + DATABASE_NAME)

# Websockets chat server
WSSERVER_URI = os.environ.get("WSSERVERURI", "ws://pywsserver.herokuapp.com/ws")
