GroupedVisitsView = Backbone.View.extend({
  events: {
    'click .expand': 'toggle'
  },

  render: function() {
    var firstVisit = this.collection.at(0);
    $('#groupedVisitsTemplate').tmpl({
      domain: firstVisit.domain(),
      url: firstVisit.get('url')
    }).appendTo(this.el);
    var expandedVisits = $('#expandedVisitsTemplate').tmpl({});
    $.each(this.collection.models, function(i, visit) {
      var visitView = new VisitView({model: visit});
      $(expandedVisits).append(visitView.render().el);
    });
    $(this.el).append(expandedVisits);
    return this;
  },

  toggle: function(ev) {
    ev.preventDefault();
    var element = ev.target;
    if($(element).hasClass('active')) {
      $(element).text('Expand');
      $(element).parents('.page').next().slideUp('fast');
    } else {
      $(element).text('Collapse');
      $(element).parents('.page').next().slideDown('fast');
    }
    $(element).toggleClass('active');
  }
});