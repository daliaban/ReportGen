var AllReportsView, App, ReportView, Reports, ReportsCollection, app,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_.templateSettings = {
  interpolate: /\[\[\=(.+?)\]\]/g,
  escape: /\[\[\-(.+?)\]\]/g,
  evaluate: /\[\[(.+?)\]\]/g
};

App = (function() {
  function App() {}

  App.prototype.init = function(prefix) {
    return this.url_prefix = prefix;
  };

  return App;

})();

app = new App();

app.init("/reportgen/api");

Reports = (function(_super) {
  __extends(Reports, _super);

  function Reports() {
    return Reports.__super__.constructor.apply(this, arguments);
  }

  Reports.prototype.urlRoot = app.url_prefix + "/reports";

  Reports.prototype.name = "reports";

  return Reports;

})(Backbone.FlaskRestless.Model);

ReportsCollection = (function(_super) {
  __extends(ReportsCollection, _super);

  function ReportsCollection() {
    return ReportsCollection.__super__.constructor.apply(this, arguments);
  }

  ReportsCollection.prototype.model = Reports;

  ReportsCollection.prototype.url = app.url_prefix + "/reports";

  return ReportsCollection;

})(Backbone.FlaskRestless.Collection);

ReportView = (function(_super) {
  __extends(ReportView, _super);

  function ReportView() {
    return ReportView.__super__.constructor.apply(this, arguments);
  }

  ReportView.prototype.tagName = 'tr';

  ReportView.prototype.template = _.template($("#ContentTable").html());

  ReportView.prototype.render = function() {
    var json, newjson;
    json = this.model.toJSON();
    newjson = JSON.parse(json.type);
    newjson.id = json.id;
    this.$el.html(this.template(newjson));
    return this;
  };

  ReportView.prototype.events = {
    "click #pdfgen": "generatepdf",
    "click #xmlgen": "generatexml"
  };

  ReportView.prototype.generatepdf = function(e) {
    var input;
    e.preventDefault();
    e.stopPropagation();
    input = $('<input>').attr('type', 'hidden').attr('name', 'data').val(this.model.toJSON().type);
    $('#pdfform' + this.model.toJSON().id).append($(input));
    return $('form#pdfform' + this.model.toJSON().id).submit();
  };

  ReportView.prototype.generatexml = function(e) {
    var input;
    e.preventDefault();
    e.stopPropagation();
    input = $('<input>').attr('type', 'hidden').attr('name', 'data').val(this.model.toJSON().type);
    $('#xmlform' + this.model.toJSON().id).append($(input));
    return $('form#xmlform' + this.model.toJSON().id).submit();
  };

  return ReportView;

})(Backbone.View);

AllReportsView = (function(_super) {
  __extends(AllReportsView, _super);

  function AllReportsView() {
    return AllReportsView.__super__.constructor.apply(this, arguments);
  }

  AllReportsView.prototype.el = "#allreports";

  AllReportsView.prototype.initialize = function() {
    this.collection = new ReportsCollection();
    return this.fetch_records();
  };

  AllReportsView.prototype.fetch_records = function() {
    var that;
    that = this;
    return this.collection.fetch({
      success: function() {
        return that.render();
      }
    });
  };

  AllReportsView.prototype.render = function() {
    return this.collection.each(function(item) {
      return this.renderItem(item);
    }, this);
  };

  AllReportsView;

  AllReportsView.prototype.renderItem = function(item) {
    var reportview;
    reportview = new ReportView({
      model: item
    });
    return $('tbody', this.$el).append(reportview.render().el);
  };

  return AllReportsView;

})(Backbone.View);

$(document).ready(function() {
  var reportsview;
  return reportsview = new AllReportsView();
});
