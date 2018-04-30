let gl;

const TEX_SIZE = 64;

const cubeVertices = [
  vec4(-0.2, 0.2, 0.0, 1), //p0
  vec4(-0.2, -0.2, 0.0, 1), //p1
  vec4(0.2, -0.2, 0.0, 1), //p2
  vec4(0.2, 0.2, 0.0, 1), //p3
  vec4(0.2, 0.2, 0.4, 1), //p4
  vec4(-0.2, 0.2, 0.4, 1), //p5
  vec4(-0.2, -0.2, 0.4, 1), //p6
  vec4(0.2, -0.2, 0.4, 1) //p7
];
const cubeColors = [
  vec4(1.0, 1.0, 0.0, 1.0), //p0
  vec4(1.0, 0.0, 1.0, 1.0), //p1
  vec4(1.0, 1.0, 1.0, 1.0), //p2
  vec4(1.0, 0.0, 0.0, 1.0), //p3
  vec4(0.0, 0.0, 0.0, 1.0), //p4
  vec4(0.0, 1.0, 0.0, 1.0), //p5
  vec4(0.0, 0.0, 1.0, 1.0), //p6
  vec4(0.0, 1.0, 1.0, 1.0) //p7
];
const cubeIndexList = [
  0, 1, 3,
  1, 2, 3,
  6, 5, 7,
  4, 7, 5,
  0, 6, 1,
  5, 6, 0,
  2, 4, 3,
  2, 7, 4,
  0, 4, 5,
  0, 3, 4,
  2, 1, 6,
  2, 6, 7
];
const tetrahedronVertices = [
  vec4(0, 0, 0, 1),
  vec4(0, 1, 0, 1),
  vec4(1, 0, 0, 1),
  vec4(0, 0, 0, 1),
  vec4(0, 0, 1, 1),
  vec4(0, 1, 0, 1),
  vec4(0, 0, 0, 1),
  vec4(1, 0, 0, 1),
  vec4(0, 0, 1, 1),
  vec4(1, 0, 0, 1),
  vec4(0, 1, 0, 1),
  vec4(0, 0, 1, 1)
];
const tetrahedronTextureCoords = [
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 0),
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 0),
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 0),
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 0)
];
const tetrahedronIndexList = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
  9, 10, 11,
];

let cube;
let tetrahedron;

/**
 * Entry point.
 */
function initGL() {
  const canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) alert("WebGL is not available");
  gl.viewport(0, 0, 512, 512);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  const cubeProgram = initShaders(gl, "vertex-shader1", "fragment-shader1");
  cube = new WebGl3dObject(cubeProgram, cubeVertices, cubeIndexList, 36, cubeColors, null, null, null);

  const texture = createRandomTexture(TEX_SIZE);
  const tetProgram = initShaders(gl, "vertex-shader2", "fragment-shader2");
  tetrahedron = new WebGl3dObject(tetProgram, tetrahedronVertices, tetrahedronIndexList, 12, null, tetrahedronTextureCoords, texture, TEX_SIZE);

  render();
}

/**
 * Render the scene useing RAF. Draw both cube and tetrahedron.
 */
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  cube.draw();
  tetrahedron.draw();
  requestAnimationFrame(render);
}

/**
 * Create a randomly generated texels array.
 * @param {number} size texture size.
 */
function createRandomTexture(size) {
  const texels = new Uint8Array(4 * size * size);
  for (var i = 0; i < size * size; i++) {
    let c = 255 * Math.random();
    for (var j = 0; j < 4; j++) {
      texels[4 * i + j] = c;
    }
  }
  return texels;
}
