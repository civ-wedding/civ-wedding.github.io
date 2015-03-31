class TextureCache {
  static get urls () {
    return [
      './chris.png',
      './donna.png',
      './village.png',
      './pyramids.png',
      './stonehenge.png'
    ];
  }

  constructor () {
    this.urlMap = {};
    this.loads = Promise.all(this.loadTextures());
  }

  getTexture (path) {
    return this.urlMap[path];
  }

  loadTextures () {
    let urlMap = this.urlMap;

    return TextureCache.urls.map(function (url) {
      return new Promise(function (resolve, reject) {
        (new THREE.TextureLoader()).load(
          url,
          function onLoad (texture) {
            texture.minFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapNearestFilter;
            resolve(urlMap[url] = texture);
          },
          function onProgress() {},
          function onError (error) {
            reject(error);
          }
        );
      });
    });
  }
}
