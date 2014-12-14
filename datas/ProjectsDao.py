from Database import Database
from Models import Project

__author__ = 'Liomka'


class ProjectsDao(object):
    def __init__(self):
        self.db = Database()
        self.session = Database.instance.Session()

    def get_all_projects(self):
        projects = self.session.query(Project).order_by(Project.ordering)
        return projects