"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var HexMaterial = (function () {
  function HexMaterial(type, metrics) {
    _classCallCheck(this, HexMaterial);

    this.type = type;
    this.metrics = metrics;
    return this.material;
  }

  _createClass(HexMaterial, {
    material: {
      get: function () {
        return new THREE.ShaderMaterial({
          fog: true,
          uniforms: this.uniforms,
          vertexShader: this.vertexShader,
          fragmentShader: this.fragmentShader
        });
      }
    },
    uniforms: {
      get: function () {
        var uniforms = Object.create(THREE.UniformsLib.fog);
        uniforms.tileType = {
          type: "f",
          value: this.type
        };
        return uniforms;
      }
    },
    fragmentShader: {
      get: function () {
        return "\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\n\nuniform float tileType;\nvarying vec2 pos;\n\nvoid main(void) {\n  #ifdef USE_LOGDEPTHBUF_EXT\n    float depth = gl_FragDepthEXT / gl_FragCoord.w;\n  #else\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n  #endif\n\n  const float LOG2 = 1.442695;\n  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n  fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\n  vec2 mid = pos/2.0;\n  float len = length(mid);\n  float r;\n  float g;\n  float b;\n\n  // Sea\n  if (tileType == 1.0) {\n    r = 0.4 - len * 0.25;\n    g = 0.6 - len * 0.1;\n    b = 0.8 - len * 0.05;\n    /*\n    r = min(len - 0.33, 0.5);\n    g = 0.33 + len * 0.5;\n    b = 0.85;\n    */\n  // Land\n  } else if (tileType == 2.0) {\n    r = 0.5 - len * 0.15;\n    g = 0.75 - len * 0.1;\n    b = 0.2 - len * 0.05;\n    /*\n    r = max(len, 0.33) * 0.85;\n    g = 0.66 + len / 3.0;\n    b = len / 4.0;\n    */\n  // Desert\n  } else {\n    r = 0.6 - len * 0.15;\n    g = 0.75 - len * 0.1;\n    b = 0.2 - len * 0.05;\n    /*\n    r = (len + 0.25);\n    g = 0.75 + len / 4.0;\n    b = len / 2.0;\n    */\n  }\n\n  gl_FragColor = vec4(r, g, b, 1.0);\n  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n";
      }
    },
    vertexShader: {
      get: function () {
        return "\nvarying vec2 pos;\n\nvoid main(void) {\n  pos = position.xy;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
      }
    }
  }, {
    sea: {
      get: function () {
        return 1;
      }
    },
    land: {
      get: function () {
        return 2;
      }
    },
    desert: {
      get: function () {
        return 3;
      }
    }
  });

  return HexMaterial;
})();