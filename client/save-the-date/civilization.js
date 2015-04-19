"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var HEX_WIDTH_RATIO = Math.sqrt(3) / 2;

var Ocean = (function () {
  function Ocean() {
    _classCallCheck(this, Ocean);

    return new THREE.Mesh(this.geometry, this.material);
  }

  _createClass(Ocean, {
    material: {
      get: function () {
        return new THREE.MeshLambertMaterial({ color: 2267647, fog: true });
      }
    },
    geometry: {
      get: function () {
        return new THREE.PlaneBufferGeometry(50, 50);
      }
    }
  });

  return Ocean;
})();

var Map = (function () {
  function Map() {
    var width = arguments[0] === undefined ? 5 : arguments[0];
    var height = arguments[1] === undefined ? 5 : arguments[1];

    _classCallCheck(this, Map);

    var ocean = new Ocean();
    var grid = [];
    var hex;
    var i;
    var j;

    for (i = 0; i < height; ++i) {
      for (j = 0; j < width; ++j) {
        hex = new MapHexTile(this.tileType(j, i, width, height), i, j, width, height);

        /*if (i === 0 && j === 0) {
          hex.position.z += 2;
        } else if (i === 0 && j === 1) {
          hex.position.z += 1;
        }*/

        ocean.add(hex);
        grid.push(hex);
      }
    }

    ocean.grid = grid;

    return ocean;
  }

  _createClass(Map, {
    tileType: {
      value: function tileType(x, y, width, height) {
        var clampScale = 5;
        var clampHeight = height / clampScale;
        var clampWidth = width / clampScale;

        if (x > clampWidth && x < width - clampWidth && y > clampHeight && y < height - clampHeight || Math.random() < 0.33) {
          if (Math.random() < 0.5) {
            return HexMaterial.desert;
          }

          return HexMaterial.land;
        }

        return HexMaterial.sea;
      }
    }
  });

  return Map;
})();

var GlobalLight = function GlobalLight() {
  _classCallCheck(this, GlobalLight);

  return new THREE.HemisphereLight(16777215, 16777215, 0.85);
};

var Civilization = (function () {
  function Civilization() {
    var _this = this;

    _classCallCheck(this, Civilization);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.z = 2;
    this.camera.rotation.x = Math.PI / 4;

    this.map = new Map(12, 12);

    this.actors = [this.chris = new Chris(), this.donna = new Donna(), this.village = new Village(), this.pyramids = new Pyramids(), this.stonehenge = new Stonehenge()];

    this.globalLight = new GlobalLight();

    this.scene.add(this.globalLight);
    this.scene.add(this.map);

    this.actors.forEach(function (actor) {
      _this.scene.add(actor);
    });

    this.scene.fog = new THREE.FogExp2(16777215, 0.1);

    this.initializeCameraTween();

    this.map.position.y = 10;

    this.rotationVelocity = Civilization.defaultRotationVelocity;
    this.autoRotate = true;
  }

  _createClass(Civilization, {
    manuallyRotate: {
      value: function manuallyRotate() {
        this.autoRotate = false;
      }
    },
    automaticallyRotate: {
      value: function automaticallyRotate() {
        this.autoRotate = true;
      }
    },
    updateDimensions: {
      value: function updateDimensions() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }
    },
    rotateBy: {
      value: function rotateBy(value) {
        if (this.autoRotate) {
          return;
        }

        this.map.rotation.z += value;
      }
    },
    scaledAcceleration: {
      get: function () {
        var scalar = Math.abs(this.rotationVelocity / Civilization.defaultRotationVelocity);

        if (scalar < 1) {
          scalar = 1;
        }

        return Civilization.deceleration * scalar;
      }
    },
    clampedRotationVelocity: {
      get: function () {
        if (this.rotationVelocity > 0.05) {
          return 0.05;
        } else if (this.rotationVelocity < -0.05) {
          return -0.05;
        }

        return this.rotationVelocity;
      }
    },
    initializeCameraPosition: {
      value: function initializeCameraPosition() {}
    },
    initializeCameraTween: {
      value: function initializeCameraTween() {
        var camera = this.camera;

        this.cameraTween = new TWEEN.Tween({
          positionZ: 10,
          rotationX: Math.PI
        }).to({
          positionZ: 2,
          rotationX: Math.PI / 2
        }, 3000).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
          console.log(this.positionZ, this.rotationX);
          camera.position.z = this.positionZ;
          camera.rotation.x = this.rotationX;
        });

        this.camera.position.z = 10;
        this.camera.rotation.x = Math.PI;
      }
    },
    reveal: {
      value: function reveal() {
        this.cameraTween.start();
      }
    },
    update: {
      value: function update() {
        var _this = this;

        this.rotationVelocity = this.clampedRotationVelocity;

        if (this.autoRotate) {
          if (this.rotationVelocity > Civilization.defaultRotationVelocity) {
            this.rotationVelocity -= this.scaledAcceleration;
          } else if (this.rotationVelocity < Civilization.defaultRotationVelocity) {
            this.rotationVelocity += this.scaledAcceleration;
          } else {
            this.rotationVelocity = Civilization.defaultRotationVelocity;
          }

          this.map.rotation.z += this.rotationVelocity;
        }

        this.actors.forEach(function (actor) {
          actor.position.copy(actor.origin);
          actor.position.sub(_this.map.position).applyEuler(_this.map.rotation).add(_this.map.position);
        });

        this.stonehenge.position.x -= 0.5 * Math.sin(this.map.rotation.z - Math.PI / 2);

        var rot = Math.pow(Math.abs(Math.sin((this.map.rotation.z - Math.PI / 2) / 2)), 2);

        this.stonehenge.scale.x = this.stonehenge.scale.y = 1 - rot * 0.5;
        this.stonehenge.position.z -= rot * 0.25;

        //this.stonehenge.position.x -= 0.5 *
        //Math.sin(this.map.rotation.z - Math.PI / 2);

        this.pyramids.position.x += 0.5 * Math.sin(this.map.rotation.z - Math.PI / 2);
      }
    }
  }, {
    defaultRotationVelocity: {
      get: function () {
        return 0.005;
      }
    },
    deceleration: {
      get: function () {
        return 0.0001;
      }
    }
  });

  return Civilization;
})();