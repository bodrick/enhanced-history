//@ sourceMappingURL=modal_view.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.ModalView = (function(_super) {

    __extends(ModalView, _super);

    function ModalView() {
      return ModalView.__super__.constructor.apply(this, arguments);
    }

    ModalView.prototype.pulseClass = 'pulse';

    ModalView.prototype.generalEvents = {
      'click .close-button': 'close',
      'click .overlay': 'overlayClicked'
    };

    ModalView.prototype.attachGeneralEvents = function() {
      return _.extend(this.events, this.generalEvents);
    };

    ModalView.prototype.renderTemplate = function(json) {
      var overlay;
      overlay = $(BH.Templates['modal']);
      $('.page', overlay).append(Mustache.to_html(this.template, json));
      return overlay;
    };

    ModalView.prototype.open = function() {
      var _this = this;
      $('body').append(this.render().el);
      this._globalBinds();
      $(window).trigger('resize');
      return setTimeout(function() {
        _this.$('.overlay').removeClass('transparent');
        return _this.trigger('open');
      }, 0);
    };

    ModalView.prototype.overlayClicked = function() {
      var _this = this;
      this.$('.page').addClass('pulse');
      return this.$('.page').on('webkitAnimationEnd', function() {
        return _this.$('.page').removeClass('pulse');
      });
    };

    ModalView.prototype.close = function() {
      var _this = this;
      this.$('.overlay').addClass('transparent');
      setTimeout(function() {
        _this.remove();
        return _this.trigger('close:removed');
      }, 1000);
      this._globalUnbinds();
      return this.trigger('close');
    };

    ModalView.prototype._globalBinds = function() {
      $(window).resize(this._updateHeight);
      return $(window).keydown($.proxy(this._closeOnEscape, this));
    };

    ModalView.prototype._globalUnbinds = function() {
      $(window).unbind('resize');
      return $(document).unbind('keydown');
    };

    ModalView.prototype._updateHeight = function() {
      return this.$('.page').css({
        maxHeight: Math.min(0.9 * window.innerHeight, 640)
      });
    };

    ModalView.prototype._closeOnEscape = function(e) {
      if (e.keyCode === 27) {
        return this.close();
      }
    };

    return ModalView;

  })(Backbone.View);

}).call(this);
