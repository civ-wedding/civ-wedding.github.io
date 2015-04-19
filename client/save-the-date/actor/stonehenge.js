"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Stonehenge = (function () {
  function Stonehenge() {
    _classCallCheck(this, Stonehenge);

    var mesh = new THREE.Mesh(this.geometry, this.material);

    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = -0.025;
    mesh.position.z = 0.75;
    mesh.position.x = -4.25;
    mesh.position.y = 10;

    mesh.origin = mesh.position.clone();

    return mesh;
  }

  _createClass(Stonehenge, {
    material: {
      get: function () {
        var material = new THREE.MeshBasicMaterial({
          map: window.textureCache.getTexture("./stonehenge.png"),
          wireframe: false
        });

        material.transparent = true;

        return material;
      }
    },
    geometry: {
      get: function () {
        return new THREE.PlaneBufferGeometry(this.scaledWidth, this.scaledHeight);
      }
    },
    scaledWidth: {
      get: function () {
        return this.width / this.scalar;
      }
    },
    scaledHeight: {
      get: function () {
        return this.height / this.scalar;
      }
    },
    width: {
      get: function () {
        return 4096;
      }
    },
    height: {
      get: function () {
        return 4096;
      }
    },
    scalar: {
      get: function () {
        return 1200;
      }
    }
  });

  return Stonehenge;
})();