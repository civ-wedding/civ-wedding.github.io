
var RADIAN_RATIO = Math.PI / 180;

class HexVertex {
  static get radianRatio() {
    return RADIAN_RATIO;
  }

  constructor (index, size = 1) {
    var angleDegrees = -60 * index + 90;
    var angleRadians = HexVertex.radianRatio * angleDegrees;

    return new THREE.Vector3(
      size * Math.cos(angleRadians),
      size * Math.sin(angleRadians),
      0
    );
  }
}

class HexTileGeometry {
  constructor () {
    var geometry = new THREE.Geometry();
    var faces = [
      0, 5, 1,
      1, 5, 4,
      1, 4, 2,
      2, 4, 3,

      //0, 1, 5,
      //5, 1, 2,
      //2, 4, 5,
      //2, 3, 4
    ];
    var i;

    for (i = 0; i < 6; ++i) {
      geometry.vertices.push(
        new HexVertex(i, 1)
      );
    }

    for (i = 0; i < faces.length; i += 3) {
      geometry.faces.push(
        new THREE.Face3(
          faces[i],
          faces[i + 1],
          faces[i + 2]
        )
      );
    }

    geometry.computeFaceNormals(false);

    return geometry;
  }
}

