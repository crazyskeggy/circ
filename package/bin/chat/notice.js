// Generated by CoffeeScript 1.4.0
(function() {
  "use strict";
  var Notice, exports, _ref,
    __slice = [].slice;

  var exports = (_ref = window.chat) != null ? _ref : window.chat = {};

  /*
   * A UI element to inform and/or prompt the user.
  */


  Notice = (function() {

    function Notice() {
      var _this = this;
      this.$notice = $('#notice');
      this.$content = $('#notice .content');
      this.$close = $('#notice button.close');
      this.$option1 = $('#notice button.option1');
      this.$option2 = $('#notice button.option2');
      this.$close.click(function() {
        return _this._hide();
      });
    }

    /*
       * Display a message to the user.
       * The prompt representation has the following format:
       *   "message_text [button_1_text] [button_2_text]"
       *
       * @param {string} representation A string representation of the message.
       * @param {...function} callbacks Specifies what function should be called when
       *##
       *     an option is clicked.
       *##
    */


    Notice.prototype.prompt = function() {
      var callbacks, representation,
        _this = this;
      representation = arguments[0], callbacks = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this._hide();
      this._callbacks = callbacks;
      this._parseRepresentation(representation);
      this.$option1.click(function() {
        var _base;
        _this._hide();
        return typeof (_base = _this._callbacks)[0] === "function" ? _base[0]() : void 0;
      });
      this.$option2.click(function() {
        var _base;
        _this._hide();
        return typeof (_base = _this._callbacks)[1] === "function" ? _base[1]() : void 0;
      });
      return this._show();
    };

    Notice.prototype.close = function() {
      return this._hide();
    };

    Notice.prototype._hide = function() {
      this.$notice[0].style.top = "-35px";
      this.$option1.off('click');
      return this.$option2.off('click');
    };

    Notice.prototype._show = function() {
      return this.$notice[0].style.top = "0px";
    };

    Notice.prototype._parseRepresentation = function(representation) {
      var options;
      this._setMessageText(representation);
      options = representation.match(/\[.+?\]/g);
      this._setOptionText(this.$option1, options != null ? options[0] : void 0);
      return this._setOptionText(this.$option2, options != null ? options[1] : void 0);
    };

    Notice.prototype._setMessageText = function(representation) {
      representation = representation.split('[')[0];
      return this.$content.text($.trim(representation));
    };

    Notice.prototype._setOptionText = function(button, textWithBrackets) {
      var text;
      if (textWithBrackets) {
        text = textWithBrackets.slice(1, +(textWithBrackets.length - 2) + 1 || 9e9);
        button.removeClass('hidden');
        return button.text(text);
      } else if (!button.hasClass('hidden')) {
        return button.addClass('hidden');
      }
    };

    return Notice;

  })();

  exports.Notice = Notice;

}).call(this);
