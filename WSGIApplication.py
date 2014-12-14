__author__ = 'Liomka'

import Settings
from datas.ProjectsDao import ProjectsDao

import tornado.web
import tornado.wsgi
import tornado.httpserver

class Application(tornado.wsgi.WSGIApplication):
    def __init__(self):
        self.projectDao = ProjectsDao()
        settings = {
            "site_title": "Liomka.IO",
            "template_path": Settings.TEMPLATE_PATH,
            "static_path": Settings.STATIC_PATH,
            "ui_modules" : {"Project": ProjectModule},

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


class BaseHandler(tornado.web.RequestHandler):
    @property
    def projectDao(self):
        return self.application.projectDao


class IndexHandler(BaseHandler):
    def get(self):
        self.render("index.html", projects=self.projectDao.get_all_projects())


class JsWSClientHandler(BaseHandler):
    def get(self):
        self.render("jswsclient.html", wsserver=Settings.WSSERVER_URI)


class CvHandler(BaseHandler):
    def get(self):
        self.render("cv.html")


class ProjectModule(tornado.web.UIModule):
    def render(self, project):
        self.project = project
        return self.render_string("modules/project.html", project=project)