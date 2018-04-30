/**
 * Simple WebGL Light.
 */
class WebGLLight {
  /**
   * Setup a new WebGL light.
   * @param {*} ambient 
   * @param {*} diffuse 
   * @param {*} specular 
   * @param {*} position 
   * @param {boolean} isOn 
   */
  constructor(ambient, diffuse, specular, position, isOn) {
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.position = position;
    this.isOn = isOn;
  }

  /**
   * Setup the light for the given WebGL program.
   * @param {WegGLProgram} glProgram 
   */
  show(glProgram) {
    gl.uniform1i(gl.getUniformLocation(glProgram, "light1"), this.isOn);
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightAmbient1"), flatten(this.ambient));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightDiffuse1"), flatten(this.diffuse));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightSpecular1"), flatten(this.specular));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightPosition1"), flatten(this.position));

  }
}
