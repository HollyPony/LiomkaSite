import psycopg2
import sys

__author__ = 'arthur'


class Database:
    def __init__(self):
        try:
            self.conn = psycopg2.connect(database='LiomkaSite',
                                         user='postgres',
                                         host='localhost',
                                         password='toor')
        except:
            print("Unexpected error:", sys.exc_info()[0])

        print("Connected to db")