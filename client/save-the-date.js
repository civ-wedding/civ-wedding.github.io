class SaveTheDate {
  get element () {
    return this.webgl.domElement;
  }

  constructor () {
    this.webgl = new THREE.WebGLRenderer({ alpha: true });
    this.webgl.setClearColor(0xffffff, 0.0);

    this.civilization = new Civilization();

    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.updateDimensions();

    this.dragging = false;

    this.offUp = onUp(this.element, () => {
      this.civilization.automaticallyRotate();
    });

    this.offDrag = onDrag(this.element, (start, current, delta) => {
      this.civilization.manuallyRotate();
      this.dragging = true;
      this.civilization.rotateBy(delta.x / 100);
    });

    this.offSwipe = onSwipe(this.element, (velocity) => {
      this.civilization.rotationVelocity += velocity.x / 5;
    });
  }

  updateDimensions () {
    this.webgl.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.civilization.updateDimensions();
  }

  start (time) {
    this.civilization.update();
    window.TWEEN.update(time);

    this.webgl.render(
      this.civilization.scene,
      this.civilization.camera
    );

    window.requestAnimationFrame(this.start.bind(this));
  }

  reveal () {
    this.civilization.reveal();
  }
}
