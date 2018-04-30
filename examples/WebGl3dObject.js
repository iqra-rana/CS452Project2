/**
 * WebGL 3D Object class.
 */
class WebGl3dObject {
  /**
   * Create a new 3D WebGL object.
   * @param {WebGLProgram} glProgram 
   * @param {[]} vertices 
   * @param {[]} indexList 
   * @param {} numTriangles 
   * @param {[]} vertexColors 
   * @param {[]} textureCoords 
   * @param {ArrayBufferView} texture
   * @param {number} texSize 
   */
  constructor(glProgram, vertices, indexList, numTriangles, vertexColors, textureCoords, texture, texSize) {
    this.program = glProgram;
    this.vertices = vertices;
    this.indexList = indexList;
    this.triangles = numTriangles;
    this.vertexColors = vertexColors;
    this.textureCoords = textureCoords;
    this.texture = texture;
    this.texSize = texSize;

    gl.useProgram(this.program);

    this.Ibuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Ibuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexList), gl.STATIC_DRAW);

    this.Vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.Vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

    this.Vpointer = gl.getAttribLocation(this.program, "vertexPosition");
    gl.vertexAttribPointer(this.Vpointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.Vpointer);

    if (this.vertexColors) {
      this.useTexture = false;
      this.Cbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.Cbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexColors), gl.STATIC_DRAW);

      this.Cpointer = gl.getAttribLocation(this.program, "vertexColor");
      gl.vertexAttribPointer(this.Cpointer, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.Cpointer);
    } else if (this.textureCoords) {
      this.useTexture = true;
      this.Tbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.Tbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(this.textureCoords), gl.STATIC_DRAW);

      this.Tpointer = gl.getAttribLocation(this.program, "textureCoords");
      gl.vertexAttribPointer(this.Tpointer, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.Tpointer);

      this.textureChecker = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textureChecker);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.texSize, this.texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else {
      console.log("Missing vertex colors or textureCoords");
    }
  }

  draw() {
    gl.useProgram(this.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.Vbuffer);
    gl.enableVertexAttribArray(this.Vpointer);
    gl.vertexAttribPointer(this.Vpointer, 4, gl.FLOAT, false, 0, 0);

    if (this.useTexture) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.Tbuffer);
      gl.vertexAttribPointer(this.Tpointer, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.Tpointer);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textureChecker);
      gl.uniform1i(gl.getUniformLocation(this.program, "texMap0"), 0);
    } else {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.Cbuffer);
      gl.enableVertexAttribArray(this.Cpointer);
      gl.vertexAttribPointer(this.Cpointer, 4, gl.FLOAT, false, 0, 0);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Ibuffer);
    gl.drawElements(gl.TRIANGLES, this.triangles, gl.UNSIGNED_SHORT, 0);
  }
}
