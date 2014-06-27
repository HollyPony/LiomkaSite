import Settings

import tornado.web
import tornado.wsgi
import wsgiref.simple_server


class Application(tornado.web.Application):
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

if __name__ == "__main__":
    application = Application()
    wsgiApp = tornado.wsgi.WSGIAdapter(application)
    server = wsgiref.simple_server.make_server('', Settings.HTTPPORT, wsgiApp)
    server.serve_forever()