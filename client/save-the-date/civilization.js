var HEX_WIDTH_RATIO = Math.sqrt(3) / 2;

class Ocean {
  constructor () {
    return new THREE.Mesh(
      this.geometry,
      this.material
    );
  }

  get material () {
    return new THREE.MeshLambertMaterial({ color: 0x2299ff, fog: true });
  }

  get geometry () {
    return new THREE.PlaneGeometry(50, 50);
  }
}

class Map {
  constructor (width = 5, height = 5) {
    var obj = new Ocean();
    var hex;
    var i;
    var j;

    for (i = 0; i < height; ++i) {
      for (j = 0; j < width; ++j) {
        obj.add(new MapHexTile(
          this.tileType(j, i, width, height),
          i,
          j,
          width,
          height
        ));
      }
    }

    return obj;
  }

  tileType (x, y, width, height) {
    var clampScale = 5;
    var clampHeight = height / clampScale;
    var clampWidth = width / clampScale;

    if (x > clampWidth && x < (width - clampWidth) &&
        y > clampHeight && y < (height - clampHeight) ||
        Math.random() < 0.33) {
      if (Math.random() < 0.5) {
        return HexMaterial.desert;
      }

      return HexMaterial.land;
    }

    return HexMaterial.sea;
  }
}

class GlobalLight {
  constructor () {
    return new THREE.HemisphereLight(0xffffff, 0xffffff, 0.85);
  }
}


class Civilization {
  constructor () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.map = new Map(12, 12);
    this.globalLight = new GlobalLight();

    this.scene.add(this.globalLight);
    this.scene.add(this.map);

    this.scene.fog = new THREE.FogExp2(0xffffff, 0.1);

    this.camera.position.z = 2;
    this.camera.rotation.x = Math.PI / 2;
    this.map.position.y = 10;
  }

  updateDimensions () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  update () {
    this.map.rotation.z += 0.005;
  }
}
