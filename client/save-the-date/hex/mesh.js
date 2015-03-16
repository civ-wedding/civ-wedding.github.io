class MapHexTileMetrics {
  constructor (column, row, columns, rows, size = 1) {
    this.row = row;
    this.rows = rows;
    this.column = column;
    this.columns = columns;

    this.size = size;
  }

  get height () {
    return this.size * 2;
  }

  get width () {
    return this.height * MapHexTile.hexWidthRatio;
  }

  get xOffset () {
    return ((this.row&1) ? this.width / 2 : 0) -
      (this.columns / 2) * this.width;
  }

  get yOffset () {
    return (-this.rows / 2) * this.height * 0.75;
  }

  get x () {
    return this.xOffset + this.width * this.column;
  }

  get y () {
    return this.yOffset + this.row * this.height * 0.75;
  }
}

class MapHexTile {
  static get hexWidthRatio () {
    return HEX_WIDTH_RATIO;
  }

  constructor (type, ...args) {
    this.type = type;
    this.metrics = new MapHexTileMetrics(...args);

    return this.mesh;
  }


  get mesh () {
    var mesh = new THREE.Mesh(
      this.geometry,
      this.material
    );

    mesh.position.x = this.metrics.x;
    mesh.position.y = this.metrics.y;
    mesh.position.z = 0.25;

    return mesh;
  }

  get material () {
    return new HexMaterial(this.type, this.metrics);
  }

  get geometry () {
    return new HexTileGeometry(this.metrics.size);
  }
}
