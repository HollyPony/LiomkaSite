import Settings

import tornado.web
import tornado.wsgi
import tornado.httpserver
import tornado.ioloop
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

def simple_app(environ, start_response):
    status = "200 OK"
    response_headers = [("Content-type", "text/plain")]
    start_response(status, response_headers)
    return ["Hello world!\n"]

container = tornado.wsgi.WSGIContainer(simple_app)
http_server = tornado.httpserver.HTTPServer(container)
http_server.listen(Settings.HTTPPORT)
tornado.ioloop.IOLoop.instance().start()

"""
application = Application()
wsgiApp = tornado.wsgi.WSGIAdapter(application)
server = wsgiref.simple_server.make_server('', Settings.HTTPPORT, wsgiApp)
server.serve_forever()
"""