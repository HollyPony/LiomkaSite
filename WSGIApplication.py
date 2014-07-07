__author__ = 'Liomka'

import Settings

import tornado.web
import tornado.wsgi
import tornado.httpserver


class Application(tornado.wsgi.WSGIApplication):
    def __init__(self):
        settings = {
            "site_title": "Liomka.IO",
            "template_path": Settings.TEMPLATE_PATH,
            "static_path": Settings.STATIC_PATH,

            # "ui_modules": {"Entry": EntryModule},
            # "xsrf_cookies": True,
        }
        handlers = [
            (r'/', IndexHandler),
            (r'/cv', CvHandler),
            (r'/demo', JsWSClientHandler),
            (r"/(apple-touch-icon\.png)", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),
            (r'/favicon.ico', tornado.web.StaticFileHandler, {'path': ""})  # http://www.vectortown.com/
        ]
        tornado.web.Application.__init__(self, handlers, **settings)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class JsWSClientHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("jswsclient.html", wsserver=Settings.WSSERVER_URI)


class CvHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("cv.html")