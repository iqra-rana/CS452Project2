/**
  * Iqra Rana, Jackson DeMeyers, Matthew Michaels
  * 5/8/2018
  */
  
/**
 * Simple WebGL Light.
 * Sends ambient, diffuse, specular, and position data to the the gpu to render in 
 * the shaders.
 */
class WebGLLight {
  /**
   * Setup a new WebGL light.
   * @param {vec3} ambient Ambient reflection values represented as a WebGL vec3.
   * @param {vec3} diffuse Diffuse reflection values represented as a WebGL vec3.
   * @param {vec3} specular Specular reflection values represented as a WebGL vec3.
   * @param {vec3} position Light position represented was a WebGL vec3.
   * @param {number} lightNum Light number (used to access correct light in vertex shader).
   */
  constructor(ambient, diffuse, specular, position, lightNum) {
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.position = position;
    this.lightNum = lightNum;
  }

  /**
   * Setup a light for the given WebGL program.
   * @param {WegGLProgram} glProgram Program in which to use the light for use with a 3D object.
   */
  show(glProgram) {
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightAmbient"+ this.lightNum.toString() ), flatten(this.ambient));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightDiffuse"+ this.lightNum.toString() ), flatten(this.diffuse));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightSpecular"+ this.lightNum.toString() ), flatten(this.specular));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightPosition"+ this.lightNum.toString() ), flatten(this.position));
  }
}
