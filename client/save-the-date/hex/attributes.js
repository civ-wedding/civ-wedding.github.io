/*
class HexGridView {
  constructor (grid, width, height) {
    this.grid = grid;
    this.width = width;
    this.height = height;
  }

  neighbors (x, y) {
    // odd-q
    return [
      this.tileAt(x,     y - 1),
      this.tileAt(x - 1, y),
      this.tileAt(x - 1, y + 1),
      this.tileAt(x    , y + 1),
      this.tileAt(x + 1, y + 1),
      this.tileAt(x + 1, y)
    ];
  }

  tileAt (x, y) {
    return this.grid[this.width * y + x];
  }

  map (fn, context) {
    var results = [];

    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        results.push(
          fn.call(context, this.tileAt(j, i), j, i, this);
        );
      }
    }

    return results;
  }
}

function Type (tile) {
  return tile.material.uniforms.tileType.value;
}

function ApplyHexAttributes (grid, width, height) {
  new HexGridView(grid, width, height).map(function (tile, x, y, grid) {
    let type = Type(tile);
    if (type === HexMaterial.sea) {
    }
    var neighbors = grid.neighbors(x, y);
  });
}*/
