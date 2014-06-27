import Settings

import tornado.web
import tornado.wsgi
import tornado.httpserver
import tornado.ioloop


class Application(tornado.wsgi.WSGIApplication):
    def __init__(self):
        handlers = [
            (r'/', MainHandler),
            (r'/api', ApiHandler),
            (r'/favicon.ico', tornado.web.StaticFileHandler, {'path': "./"}),
        ]
        settings = {
            "WSServerUrl": "ws://pywsserver.herokuapp.com/ws",
            "template_path": Settings.TEMPLATE_PATH,
            "static_path": Settings.STATIC_PATH,

            #"ui_modules": {"Entry": EntryModule},
            #"xsrf_cookies": True,
        }
        tornado.web.Application.__init__(self, handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class ApiHandler(tornado.web.RequestHandler):
    def get(self, *args):
        pass
        """
        self.finish()
        id = self.get_argument("id")
        value = self.get_argument("value")
        data = {"id": id, "value": value}
        data = json.dumps(data)
        """

    def post(self):
        pass

application = Application()
