"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var RSVP = (function () {
  function RSVP() {
    _classCallCheck(this, RSVP);

    this.token = "";
    this.name = "";
    this.willAttend = false;
    this.plusOne = false;
    this.warOrPeace = -1;
  }

  _createClass(RSVP, {
    validate: {
      value: function validate() {
        return new Promise(function (resolve, reject) {
          if (!this.name || !this.token) {
            return reject(new Error("Name or token not specified."));
          }

          resolve();
        });
      }
    },
    submit: {
      value: function submit() {
        return this.validate().then(function () {});
      }
    }
  }, {
    diplomacyChoices: {
      get: function () {
        return {
          WAR: 0,
          PEACE: 1
        };
      }
    }
  });

  return RSVP;
})();

//new