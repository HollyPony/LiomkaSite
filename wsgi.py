from WSGIApplication import Application

__author__ = 'Liomka'

application = Application()

if __name__ == "__main__":
    import tornado.ioloop
    application.listen(8080)
    tornado.ioloop.IOLoop.instance().start()