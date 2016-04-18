"""
views.py renders html based on given URL and handles PDF and XML file generation
"""

import flask
import json
from flask import request
import StringIO
from xhtml2pdf import pisa
import dicttoxml

import logging
log = logging.getLogger(__name__)

view = flask.Blueprint("view", __name__, template_folder='templates')

app = flask.Flask(__name__)

@view.route('/reportgen/', methods=['GET', 'POST'])
def defaultview():
    """
    serving landing page index.html
    """
    if request.method == "POST":
        #in case of report generation
        dict = json.loads(request.form['data'])

        if request.form['type'] == "pdf":

            #Generate PDF

            html = flask.render_template('report.html', content=dict)
            result = StringIO.StringIO()
            pisa.pisaDocument(StringIO.StringIO(html), result)
            result.seek(0)
            download_filename = "reports.pdf"
            response = flask.current_app.response_class(result, mimetype='application/pdf')
            response.headers.add('Content-Disposition', 'attachment',
                             filename=download_filename)

            return response
        else:
            #Generate XML
            xml = dicttoxml.dicttoxml(dict)
            download_filename='reports.xml'

            response = flask.current_app.response_class(xml, mimetype='application/pdf')
            response.headers.add('Content-Disposition', 'attachment',
                             filename=download_filename)

            return response
    else:
        #Serve index.html
        return flask.render_template('index.html')
