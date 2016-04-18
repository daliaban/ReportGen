#This is Backbone row view (model)
class ReportView extends Backbone.View
  tagName: 'tr'
  template: _.template($("#ContentTable").html())
  render: ->
    json = @model.toJSON()
    newjson = JSON.parse(json.type)
    newjson.id = json.id
    @$el.html(@template(newjson))
    @

  events:
    "click #pdfgen": "generatepdf"
    "click #xmlgen": "generatexml"

  generatepdf: (e) ->
    #when pdfgen button is clicked, add an attribute named "data" to the form and submit the form. "data"
    #contains the context (current) Backbone model

    e.preventDefault()
    e.stopPropagation()
    input = $('<input>').attr('type', 'hidden').attr('name', 'data').val(@model.toJSON().type)
    $('#pdfform'+@model.toJSON().id).append $(input)
    $('form#pdfform'+@model.toJSON().id).submit()

  generatexml: (e) ->
    #when xmlgen button is clicked, add an attribute named "data" to the form and submit the form. "data"
    #contains the context (current) Backbone model. These two functions could have been combined into one
    #but keeping them separate improves clarity/readability

    e.preventDefault()
    e.stopPropagation()
    input = $('<input>').attr('type', 'hidden').attr('name', 'data').val(@model.toJSON().type)
    $('#xmlform'+@model.toJSON().id).append $(input)
    $('form#xmlform'+@model.toJSON().id).submit()


#This is the Backbone reports view (collection) on index page
class AllReportsView extends Backbone.View
  el: "#allreports"
  initialize: () ->
    @collection = new ReportsCollection()
    @fetch_records()


  fetch_records: ->
    that=@
    @collection.fetch(
      success: ->
        that.render()
    )

  render: ->
    @collection.each((item) ->
      @renderItem(item)
     ,@)
    @

  renderItem: (item) ->
    reportview = new ReportView(model:item)
    $('tbody', @$el).append(reportview.render().el)






