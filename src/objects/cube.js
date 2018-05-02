function getTableVertices() {
  cubeVertices = [
    vec4(-20, 20, 0.0, 1.0), //p0
    vec4(-20, -20, 0.0, 1.0), //p1
    vec4(20, -20, 0.0, 1.0), //p2
    vec4(20, 20, 0.0, 1.0), //p3
    vec4(20, 20, 40, 1.0), //p4
    vec4(-20, 20, 40, 1.0), //p5
    vec4(-20, -20, 40, 1.0), //p6
    vec4(20, -20, 40, 1.0) //p7
  ];
  return cubeVertices;
}

function getTableFaces() {
  cubeIndexList = [
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
  return cubeIndexList;
}
