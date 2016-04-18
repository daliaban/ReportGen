"""
apis.py sets up the restful interface with the existing model
"""
from flask.ext.restless import APIManager, ProcessingException
from models import db, Reports


import logging
log = logging.getLogger(__name__)

#Create the API - in this case only GET is allowed, but supports POST, PATCH, PUT, DELETE as well
def create_api(app):
    manager = APIManager(app, flask_sqlalchemy_db=db)
    manager.create_api(Reports, methods=['GET'],
                       results_per_page=None,
                       url_prefix='/reportgen/api')
