"""
models.py - define the database model that are used in the app
"""

from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON

db = SQLAlchemy()

#Table reports maps to this class
class Reports(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(1000))





