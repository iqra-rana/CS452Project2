class WebGL3DObject {
  /**
   * 
   * @param {WebGLProgram} glProgram 
   * @param {ObjectParams} objParams 
   * @param {WebGLCamera} camera
   * @param {LightingParams} lightParams
   * @param {TextureParams} texParams 
   * @param {ControlParams} controlParams 
   */
  constructor(glProgram, objParams, camera, lightParams, texParams, controlParams) {
    this.program = glProgram;
    this.object = objParams;
    this.texture = texParams;
    this.control = controlParams;
    this.camera = camera;
    this.light = lightParams;

    gl.useProgram(this.program);

    this.MUniform = gl.getUniformLocation(this.program, "M");
    this.projection_persp = gl.getUniformLocation(this.program, "projection_persp");
    this.MInvTransUniform = gl.getUniformLocation(this.program, "M_inv_transpose");
    this.vertexNormal = gl.getAttribLocation(this.program, "vertexNormal");
    this.vertexPosition = gl.getAttribLocation(this.program, "vertexPosition");

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.object.indexList), gl.STATIC_DRAW);

    const verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.object.vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertexPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.vertexPosition);
  }

  draw(lights) {
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.MUniform, false, flatten(this.camera.M));
    gl.uniformMatrix4fv(this.projection_persp, false, flatten(this.camera.PPersp));

    const faceNormals = this._getFaceNormals(this.object.vertices, this.object.indexList, this.object.numTriangles);
    const vertexNormals = this._getVertexNormals(this.object.vertices, this.object.indexList, faceNormals, this.object.numVertices, this.object.numTriangles);

    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.vertexNormal);

    gl.uniform3fv(gl.getUniformLocation(this.program, "ambient"), flatten(this.light.ambient));
    gl.uniform3fv(gl.getUniformLocation(this.program, "diffuse"), flatten(this.light.diffuse));
    gl.uniform3fv(gl.getUniformLocation(this.program, "specular"), flatten(this.light.specular));
    gl.uniform1f(gl.getUniformLocation(this.program, "shininess"), this.light.shininess);

    lights.forEach(light => {
      light.show(this.program);
    });

    gl.uniformMatrix4fv(this.MInvTransUniform, false, flatten(this.camera.MInvTrans));
    gl.drawElements(gl.TRIANGLES, 3 * this.object.numTriangles, gl.UNSIGNED_SHORT, 0);
  }

  _getFaceNormals(vertices, indexList, numTriangles) {
    // array of face normals
    var faceNormals = [];
    var faceNormal = [];

    // Following lines iterate over triangles
    for (var i = 0; i < numTriangles; i++) {
      // Following lines give you three vertices for each face of the triangle
      var p0 = vec3(vertices[indexList[3 * i]][0],
        vertices[indexList[3 * i]][1],
        vertices[indexList[3 * i]][2]);

      var p1 = vec3(vertices[indexList[3 * i + 1]][0],
        vertices[indexList[3 * i + 1]][1],
        vertices[indexList[3 * i + 1]][2]);

      var p2 = vec3(vertices[indexList[3 * i + 2]][0],
        vertices[indexList[3 * i + 2]][1],
        vertices[indexList[3 * i + 2]][2]);

      // Calculate vector from p0 to p1 ( use subtract function in MV.js, NEEDS CODE )
      var p01 = subtract(p1, p0); //p1-p0

      // Calculate vector from p0 to p2 ( use subtract function, NEEDS CODE )
      var p02 = subtract(p2, p0); //p2-p0

      // Calculate face normal as the cross product of the above two vectors
      // (use cross function in MV.js, NEEDS CODE )
      faceNormal = cross(p01, p02);

      // normalize face normal (use normalize function in MV.js, NEEDS CODE)
      faceNormal = normalize(faceNormal, 0);

      // Following line pushes the face normal into the array of face normals
      faceNormals.push(faceNormal);
    }

    // Following line returns the array of face normals
    return faceNormals;
  }

  _getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles) {
    var vertexNormals = [];
    // Iterate over all vertices
    for (var j = 0; j < numVertices; j++) {
      // Initialize the vertex normal for the j-th vertex
      var vertexNormal = vec3(0.0, 0.0, 0.0);

      // Iterate over all the faces to find if this vertex belongs to
      // a particular face        
      for (var i = 0; i < numTriangles; i++) {
        // The condition of the following if statement should check
        // if the j-th vertex belongs to the i-th face
        if (j == indexList[3 * i] || j == indexList[3 * i + 1] || j == indexList[3 * i + 2]) { // NEEDS CODE IN PARENTHESES
          // Update the vertex normal (NEEDS CODE)
          vertexNormal = add(vertexNormal, faceNormals[i]); //?
        }
      }
      // Normalize the vertex normal here (NEEDS CODE)
      vertexNormal = normalize(vertexNormal);

      // Following line pushes the vertex normal into the vertexNormals array
      vertexNormals.push(vertexNormal);
    }
    return vertexNormals;
  }
}
