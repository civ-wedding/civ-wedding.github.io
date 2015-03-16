class SaveTheDate {
  get element () {
    return this.webgl.domElement;
  }

  constructor () {
    this.webgl = new THREE.WebGLRenderer();
    this.webgl.setClearColor(0xffffff, 1.0);

    this.civilization = new Civilization();
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.updateDimensions();
  }

  updateDimensions () {
    this.webgl.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.civilization.updateDimensions();
  }

  start () {
    this.civilization.update();

    this.webgl.render(
      this.civilization.scene,
      this.civilization.camera
    );

    window.requestAnimationFrame(this.start.bind(this));
  }
}
