class TextureCache {
  static get urls () {
    return [
      './chris.png',
      './donna.png'
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
