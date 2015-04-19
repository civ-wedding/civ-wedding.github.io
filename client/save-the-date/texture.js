"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TextureCache = (function () {
  function TextureCache() {
    _classCallCheck(this, TextureCache);

    this.urlMap = {};
    this.loads = Promise.all(this.loadTextures());
  }

  _createClass(TextureCache, {
    getTexture: {
      value: function getTexture(path) {
        return this.urlMap[path];
      }
    },
    loadTextures: {
      value: function loadTextures() {
        var urlMap = this.urlMap;

        return TextureCache.urls.map(function (url) {
          return new Promise(function (resolve, reject) {
            new THREE.TextureLoader().load(url, function onLoad(texture) {
              texture.minFilter = THREE.LinearFilter;
              texture.minFilter = THREE.LinearMipMapNearestFilter;
              resolve(urlMap[url] = texture);
            }, function onProgress() {}, function onError(error) {
              reject(error);
            });
          });
        });
      }
    }
  }, {
    urls: {
      get: function () {
        return ["./chris.png", "./donna.png", "./village.png", "./pyramids.png", "./stonehenge.png"];
      }
    }
  });

  return TextureCache;
})();