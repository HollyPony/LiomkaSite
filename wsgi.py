import Settings

import cyclone.web
import cyclone.wsgi
import wsgiref.simple_server
import sys

from twisted.python import log


class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [
            (r'/', MainHandler),
            (r'/api', ApiHandler),
            (r'/favicon.ico', cyclone.web.StaticFileHandler, {'path': "./"}),
            ]
        settings = {
            "WSServerUrl": "ws://pywsserver.herokuapp.com/ws",
            "template_path": Settings.TEMPLATE_PATH,
            "static_path": Settings.STATIC_PATH,
            }
        cyclone.web.Application.__init__(self, handlers, **settings)


class MainHandler(cyclone.web.RequestHandler):
    def get(self):
        self.render("index.html")


class ApiHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self, *args):
        pass
        """
        self.finish()
        id = self.get_argument("id")
        value = self.get_argument("value")
        data = {"id": id, "value": value}
        data = json.dumps(data)
        """

    @cyclone.web.asynchronous
    def post(self):
        pass

if __name__ == "__main__":
    application = Application()
    log.startLogging(sys.stdout)

    wsgi_app = cyclone.wsgi.WSGIAdapter(application)
    server = wsgiref.simple_server.make_server('', Settings.HTTPPORT, wsgi_app)
    server.serve_forever()