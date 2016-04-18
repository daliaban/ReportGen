# Underscore.js Template Settings
_.templateSettings =
  interpolate: /\[\[\=(.+?)\]\]/g
  escape: /\[\[\-(.+?)\]\]/g
  evaluate: /\[\[(.+?)\]\]/g


class App
  init: (prefix)->
    @url_prefix = prefix

app = new App()
app.init("/reportgen/api")
