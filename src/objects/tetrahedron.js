function getTetrahedronTexCoords() {
  return [
    0, 0,
    0, 1,
    1, 0,
    0, 0,
    0, 1,
    1, 0,
    0, 0,
    0, 1,
    1, 0,
    0, 0,
    0, 1,
    1, 0
  ];
}

function getTetrahedronFaces() {
  return [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    9, 10, 11
  ];
}

function getTetrahedronVertices() {
  return [
    vec4(0, 0, 0, 1),
    vec4(0, 22, 0, 1),
    vec4(22, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 22, 1),
    vec4(0, 22, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(22, 0, 0, 1),
    vec4(0, 0, 22, 1),
    vec4(22, 0, 0, 1),
    vec4(0, 22, 0, 1),
    vec4(0, 0, 22, 1)
  ];
}
