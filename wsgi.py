from alembic.config import Config
from alembic import command
from WSGIApplication import Application

__author__ = 'Liomka'

# Apply migrations
config = Config('alembic.ini')
command.upgrade(config, 'head')

# Instantiate application
application = Application()

# Run ...
if __name__ == "__main__":
    import tornado.ioloop
    application.listen(8080)
    tornado.ioloop.IOLoop.instance().start()

