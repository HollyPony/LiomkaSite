from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import Settings

__author__ = 'Liomka'


class Database(object):
    instance = None

    class __Database:
        def __init__(self):
            self.engine = create_engine(Settings.DATABASE_URI)
            self.Session = sessionmaker(bind=self.engine)

            print("Connected to db")

    def __init__(self):
        if not Database.instance:
            Database.instance = Database.__Database()

    def __getattr__(self, name):
        return getattr(self.instance, name)
