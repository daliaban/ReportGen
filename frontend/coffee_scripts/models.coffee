#Create backbone Model and Collection classes based on data model

class Reports extends Backbone.FlaskRestless.Model
  urlRoot: app.url_prefix + "/reports"
  name: "reports"


class ReportsCollection extends Backbone.FlaskRestless.Collection
  model: Reports
  url: app.url_prefix + "/reports"

