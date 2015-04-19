"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var RADIAN_RATIO = Math.PI / 180;

var HexVertex = (function () {
  function HexVertex(index) {
    var size = arguments[1] === undefined ? 1 : arguments[1];

    _classCallCheck(this, HexVertex);

    var angleDegrees = -60 * index + 90;
    var angleRadians = HexVertex.radianRatio * angleDegrees;

    return new THREE.Vector3(size * Math.cos(angleRadians), size * Math.sin(angleRadians), 0);
  }

  _createClass(HexVertex, null, {
    radianRatio: {
      get: function () {
        return RADIAN_RATIO;
      }
    }
  });

  return HexVertex;
})();

var HexTileGeometry = function HexTileGeometry() {
  _classCallCheck(this, HexTileGeometry);

  var geometry = new THREE.Geometry();
  var faces = [0, 5, 1, 1, 5, 4, 1, 4, 2, 2, 4, 3];
  var i;

  for (i = 0; i < 6; ++i) {
    geometry.vertices.push(new HexVertex(i, 1));
  }

  for (i = 0; i < faces.length; i += 3) {
    geometry.faces.push(new THREE.Face3(faces[i], faces[i + 1], faces[i + 2]));
  }

  geometry.computeFaceNormals(false);

  return geometry;
};

//0, 1, 5,
//5, 1, 2,
//2, 4, 5,
//2, 3, 4