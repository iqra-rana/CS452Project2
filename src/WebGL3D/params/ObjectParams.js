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
  }
}
