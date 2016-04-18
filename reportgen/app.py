import os


def create_naked_app(**conf):
    import flask
    from views import view
    from models import db
    from apis import create_api
    app = flask.Flask("reportgen",
                      static_url_path="/reportgen",
                      static_folder='public')
    for k in conf.keys():
        if k.startswith("flask"):
            flask_key = k.replace("flask.", "")
            app.config[flask_key] = conf.pop(k)
    db.init_app(app)
    app.register_blueprint(view)
    create_api(app)

    return app


def create_app(global_conf={}, debug=False, **conf):
    os.environ["NLS_LANG"] = ".UTF8"
    app = create_naked_app(**conf)
    app.debug = debug
    return app


def make_app(global_conf={}, **conf):
    return create_app(global_conf, debug=False, **conf)


def make_debug(global_conf={}, **conf):
    from werkzeug.debug import DebuggedApplication
    app = create_app(global_conf, debug=True, **conf)
    return DebuggedApplication(app, evalex=True)


if __name__ == "__main__":
    """
    If you would like to use other app wraper than paster,
    you can take this app as it is outside.
    """
    config = {
        'SQLALCHEMY_DATABASE_URI': 'sqlite:////tmp/dev.db',
    }
    app = make_app(**config)
    app.debug = True
    app.run(host="0.0.0.0")
