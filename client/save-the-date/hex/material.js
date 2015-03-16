class HexMaterial {
  static get sea () {
    return 1;
  }

  static get land () {
    return 2;
  }

  static get desert () {
    return 3;
  }

  constructor (type, metrics) {
    this.type = type;
    this.metrics = metrics;
    return this.material;
  }

  get material () {
    return new THREE.ShaderMaterial({
      fog: true,
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });
  }

  get uniforms () {
    var uniforms = Object.create(THREE.UniformsLib.fog);
    uniforms.tileType = {
      type: 'f',
      value: this.type
    };
    return uniforms;
  }

  get fragmentShader () {
return `
uniform float fogDensity;
uniform float fogNear;
uniform float fogFar;
uniform vec3 fogColor;

uniform float tileType;
varying vec2 pos;

void main(void) {
  #ifdef USE_LOGDEPTHBUF_EXT
    float depth = gl_FragDepthEXT / gl_FragCoord.w;
  #else
    float depth = gl_FragCoord.z / gl_FragCoord.w;
  #endif

  const float LOG2 = 1.442695;
  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
  fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

  vec2 mid = pos/2.0;
  float len = length(mid);
  float r;
  float g;
  float b;

  // Sea
  if (tileType == 1.0) {
    r = min(len - 0.33, 0.5);
    g = 0.33 + len * 0.5;
    b = 0.85;
  // Land
  } else if (tileType == 2.0) {
    r = max(len, 0.33) * 0.85;
    g = 0.66 + len / 3.0;
    b = len / 4.0;
  // Desert
  } else {
    r = (len + 0.25);
    g = 0.75 + len / 4.0;
    b = len / 2.0;
  }

  gl_FragColor = vec4(r, g, b, 1.0);
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}
`;
  }

  get vertexShader () {
    return `
varying vec2 pos;

void main(void) {
  pos = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
  }
}
