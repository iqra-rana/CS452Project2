class ObjectParams {
  /**
   * Create an object containing the details required
   * to render an object.
   * @param {number} numTriangles 
   * @param {vec4[]} vertices 
   * @param {number[]} indexList 
   */
  constructor(numTriangles, vertices, indexList) {
    this.numTriangles = numTriangles;
    this.vertices = vertices;
    this.numVertices = vertices.length;
    this.indexList = indexList;

    this.faceNormals = this._getFaceNormals();
    this.vertexNormals = this._getVertexNormals();
  }

  /**
   * Return the face normals for the object detailed by this
   * objects properties.
   */
  _getFaceNormals() {
    // array of face normals
    var faceNormals = [];
    var faceNormal = [];

    // Following lines iterate over triangles
    for (var i = 0; i < this.numTriangles; i++) {
      // Following lines give you three vertices for each face of the triangle
      var p0 = vec3(this.vertices[this.indexList[3 * i]][0],
        this.vertices[this.indexList[3 * i]][1],
        this.vertices[this.indexList[3 * i]][2]);

      var p1 = vec3(this.vertices[this.indexList[3 * i + 1]][0],
        this.vertices[this.indexList[3 * i + 1]][1],
        this.vertices[this.indexList[3 * i + 1]][2]);

      var p2 = vec3(this.vertices[this.indexList[3 * i + 2]][0],
        this.vertices[this.indexList[3 * i + 2]][1],
        this.vertices[this.indexList[3 * i + 2]][2]);

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

  /**
   * Return the vertex normals for the object detailed by this
   * objects properties.
   */
  _getVertexNormals() {
    var vertexNormals = [];
    // Iterate over all vertices
    for (var j = 0; j < this.numVertices; j++) {
      // Initialize the vertex normal for the j-th vertex
      var vertexNormal = vec3(0.0, 0.0, 0.0);

      // Iterate over all the faces to find if this vertex belongs to
      // a particular face        
      for (var i = 0; i < this.numTriangles; i++) {
        // The condition of the following if statement should check
        // if the j-th vertex belongs to the i-th face
        if (j == this.indexList[3 * i] || j == this.indexList[3 * i + 1] || j == this.indexList[3 * i + 2]) { // NEEDS CODE IN PARENTHESES
          // Update the vertex normal (NEEDS CODE)
          vertexNormal = add(vertexNormal, this.faceNormals[i]); //?
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
