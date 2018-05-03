/**
 * WebGL 3D Object with a textures, transformation controls, a camera and lighting.
 * Render the shape through the camera using the lookat approach and perspective 
 * projection.
 */
class WebGL3DObject {
  /**
   * Create a new WebGL 3D object.
   * @param {WebGLProgram} glProgram The program configured to render.
   * @param {ObjectParams} objParams Required object parameters to render the object.
   * @param {TransformationParams} transParams Default translation parameters.
   * @param {WebGLCamera} camera The WebGLCamera object configured to render the scene.
   * @param {LightingParams} lightParams The lighting parameters for the object.
   * @param {TextureParams} texParams Optional texture parameters for the object.
   * @param {ControlParams} controlParams Optional paremeters to allow for transformations using keys.
   */
  constructor(glProgram, objParams, transParams, camera, lightParams, texParams, controlParams) {
    this.program = glProgram;
    this.object = objParams;
    this.transformation = transParams;
    this.texture = texParams;
    this.control = controlParams;
    this.camera = camera;
    this.light = lightParams;

    gl.useProgram(this.program);

    this.MUniform = gl.getUniformLocation(this.program, "M");
    this.MTransUniform = gl.getUniformLocation(this.program, "trans");
    this.MRotXUniform = gl.getUniformLocation(this.program, "rot_x");
    this.MRotYUniform = gl.getUniformLocation(this.program, "rot_y");
    this.MRotZUniform = gl.getUniformLocation(this.program, "rot_z");
    this.projection_persp = gl.getUniformLocation(this.program, "projection_persp");
    this.MInvTransUniform = gl.getUniformLocation(this.program, "M_inv_transpose");
    this.vertexNormal = gl.getAttribLocation(this.program, "vertexNormal");
    this.vertexPosition = gl.getAttribLocation(this.program, "vertexPosition");
  }

  /**
   * Draw the 3D object using the camera and lights.
   * @param {WebGLLight[]} lights An array of WebGLLight objects to be used in drawing the object.
   */
  draw(lights) {
    gl.useProgram(this.program);

    const trans = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      this.transformation.tx, this.transformation.ty, this.transformation.tz, 1
    ];
    const yRot = [
      Math.cos(this.transformation.beta), 0, -Math.sin(this.transformation.beta), 0,
      0, 1, 0, 0,
      Math.sin(this.transformation.beta), 0, Math.cos(this.transformation.beta), 0,
      0, 0, 0, 1
    ];
    const xRot = [
      1, 0, 0, 0,
      0, Math.cos(this.transformation.alpha), -Math.sin(this.transformation.alpha), 0,
      0, Math.sin(this.transformation.alpha), Math.cos(this.transformation.alpha), 0,
      0, 0, 0, 1
    ];
    const zRot = [
      Math.cos(this.transformation.gamma), -Math.sin(this.transformation.gamma), 0, 0,
      Math.sin(this.transformation.gamma), Math.cos(this.transformation.gamma), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    
    gl.uniformMatrix4fv(this.MUniform, false, flatten(this.camera.M));
    gl.uniformMatrix4fv(this.projection_persp, false, flatten(this.camera.PPersp));
    gl.uniformMatrix4fv(this.MTransUniform, false, flatten(trans));
    gl.uniformMatrix4fv(this.MRotXUniform, false, flatten(xRot));
    gl.uniformMatrix4fv(this.MRotYUniform, false, flatten(yRot));
    gl.uniformMatrix4fv(this.MRotZUniform, false, flatten(zRot));

    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.object.vertexNormals), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.vertexNormal);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.object.indexList), gl.STATIC_DRAW);

    const verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.object.vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertexPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.vertexPosition);

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
}
