"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var SaveTheDate = (function () {
  function SaveTheDate() {
    var _this = this;

    _classCallCheck(this, SaveTheDate);

    this.webgl = new THREE.WebGLRenderer({ alpha: true });
    this.webgl.setClearColor(16777215, 0);

    this.civilization = new Civilization();

    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();

    this.dragging = false;

    this.offUp = onUp(this.element, function () {
      _this.civilization.automaticallyRotate();
    });

    this.offDrag = onDrag(this.element, function (start, current, delta) {
      _this.civilization.manuallyRotate();
      _this.dragging = true;
      _this.civilization.rotateBy(delta.x / 100);
    });

    this.offSwipe = onSwipe(this.element, function (velocity) {
      _this.civilization.rotationVelocity += velocity.x / 5;
    });
  }

  _createClass(SaveTheDate, {
    element: {
      get: function () {
        return this.webgl.domElement;
      }
    },
    updateDimensions: {
      value: function updateDimensions() {
        this.webgl.setSize(window.innerWidth, window.innerHeight);

        this.civilization.updateDimensions();
      }
    },
    start: {
      value: function start(time) {
        this.civilization.update();
        window.TWEEN.update(time);

        this.webgl.render(this.civilization.scene, this.civilization.camera);

        window.requestAnimationFrame(this.start.bind(this));
      }
    },
    reveal: {
      value: function reveal() {
        this.civilization.reveal();
      }
    }
  });

  return SaveTheDate;
})();