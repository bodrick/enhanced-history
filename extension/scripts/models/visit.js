Visit = Backbone.Model.extend({
  defaults: {
    title: '(No Title)'
  },

  initialize: function() {
    if(this.get('title') === '') {
      this.set({title: this.defaults.title});
    }
  },

  domain: function() {
    var match = this.get('url').match(/\w+:\/\/(.*?)\//);
    return (match === null ? null : match[0]);
  },

  compare: function(aVisit) {
    if(this.domain() === null || aVisit.domain() === null) {
      return false;
    } else if(this.domain() == aVisit.domain()) {
      return true;
    } else {
      return false;
    }
  }
});

Visit.search = function(options, callback) {
  chrome.history.search(options, function(results) {
    var items = [];

    $.each(results, function(i, result) {
      if(options.startTime != null && options.endTime != null) {
        if(result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime) {
          items.push(new Visit(result));
        }
      } else {
        items.push(new Visit(result));
      }
    });

    callback(items);
  });
};