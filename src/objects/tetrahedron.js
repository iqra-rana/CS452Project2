function getTetrahedronColors() {
  return [
    vec4(0.0, 0.0, 1.0, 1.0),   // p0
    vec4( 0.0, 1.0, 0.0, 1.0),  // p1
    vec4( 1.0, 0.0, 0.0, 1.0),  // p2
    vec4(1.0, 1.0, 0.0, 1.0)    // p3
  ]; 
}

function getTetrahedronFaces() {
  return [
    0, 1, 2,
    0, 2, 3,
    0, 1, 3,
    1, 2, 3
  ];
}

function getTetrahedronVertices() {
  return [
    vec4(12.0, 12.0, 12.0, 1),   
    vec4(-12.0, -12.0,  12.0,  1),   
    vec4(-12.0,  12.0, -12.0,  1),   
    vec4(12.0, -12.0, -12.0, 1)
  ]; 						  
}
