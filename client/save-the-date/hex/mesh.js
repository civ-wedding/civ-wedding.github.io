"use strict";

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MapHexTileMetrics = (function () {
  function MapHexTileMetrics(column, row, columns, rows) {
    var size = arguments[4] === undefined ? 1 : arguments[4];

    _classCallCheck(this, MapHexTileMetrics);

    this.row = row;
    this.rows = rows;
    this.column = column;
    this.columns = columns;

    this.size = size;
  }

  _createClass(MapHexTileMetrics, {
    height: {
      get: function () {
        return this.size * 2;
      }
    },
    width: {
      get: function () {
        return this.height * MapHexTile.hexWidthRatio;
      }
    },
    xOffset: {
      get: function () {
        return (this.row & 1 ? this.width / 2 : 0) - this.columns / 2 * this.width;
      }
    },
    yOffset: {
      get: function () {
        return -this.rows / 2 * this.height * 0.75;
      }
    },
    x: {
      get: function () {
        return this.xOffset + this.width * this.column;
      }
    },
    y: {
      get: function () {
        return this.yOffset + this.row * this.height * 0.75;
      }
    }
  });

  return MapHexTileMetrics;
})();

var MapHexTile = (function () {
  function MapHexTile(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, MapHexTile);

    this.type = type;
    this.metrics = _applyConstructor(MapHexTileMetrics, args);

    return this.mesh;
  }

  _createClass(MapHexTile, {
    mesh: {
      get: function () {
        var mesh = new THREE.Mesh(this.geometry, this.material);

        mesh.position.x = this.metrics.x;
        mesh.position.y = this.metrics.y;
        mesh.position.z = 0.25;

        return mesh;
      }
    },
    material: {
      get: function () {
        return new HexMaterial(this.type, this.metrics);
      }
    },
    geometry: {
      get: function () {
        return new HexTileGeometry(this.metrics.size);
      }
    }
  }, {
    hexWidthRatio: {
      get: function () {
        return HEX_WIDTH_RATIO;
      }
    }
  });

  return MapHexTile;
})();