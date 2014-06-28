__author__ = 'Liomka'

from WSGIApplication import Application

application = Application()

if __name__ == "__main__":
    import tornado.ioloop
    application.listen(8080)
    tornado.ioloop.IOLoop.instance().start()