from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Table, Column, Integer, String, Boolean, ForeignKey

__author__ = 'Liomka'

Base = declarative_base()

project_tags = Table("projecttags", Base.metadata,
                     Column("project_id", Integer, ForeignKey("project.id")),
                     Column("tag_id", Integer, ForeignKey("tag.id"))
)


class Project(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    content = Column(String, nullable=False)
    is_professional = Column(Boolean, name="is_professional", nullable=False)
    ordering = Column(Integer, nullable=False)
    anchor_name = Column(String)
    sub_projects = relationship("SubProject", order_by="SubProject.ordering", backref="project")
    tags = relationship("Tag", secondary=project_tags)


class SubProject(Base):
    __tablename__ = "sub_project"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    ordering = Column(Integer, nullable=False)
    anchor_name = Column(String)
    project_id = Column(Integer, ForeignKey('project.id'))


class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)