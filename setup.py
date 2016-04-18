from setuptools import setup, find_packages
import os

name = "reportgen"
version = "0.1"


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()


setup(
    name=name,
    version=version,
    description="Flask boiler plate",
    long_description=read('README'),
    #Please update your name here
    author="Dalia Banerjee",
    author_email='dalia.ban@gmail.com',
    url='',
    license='',
    include_package_data=True,
    packages=['reportgen'],
    zip_safe=False,
    # Note: the following list is processed in reverse order !!!!
    install_requires=[
        'Flask-SQLAlchemy==1.0',
        'Flask-Restless==0.13.1',
        'Flask==0.10.1',
        'Werkzeug==0.9.4',
        'Jinja2==2.7.1',
        'psycopg2==2.6.1',
        'dicttoxml==1.6.6',
        'xhtml2pdf==0.0.6',
        'Pillow==2.4.0',
        'PasteScript==1.7.5',
        'PasteDeploy==1.5.0',
        'Paste==1.7.5.1'
    ],
    entry_points="""
    [paste.app_factory]
    main = reportgen.app:make_app
    debug = reportgen.app:make_debug
    """,
)
