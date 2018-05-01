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
   * @param {boolean} isOn Whether the light is illuminated (true = on, false = off).
   */
  constructor(ambient, diffuse, specular, position, isOn) {
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.position = position;
    this.isOn = isOn;
  }

  /**
   * Setup a light for the given WebGL program.
   * @param {WegGLProgram} glProgram Program in which to use the light for use with a 3D object.
   */
  show(glProgram) {
    gl.uniform1i(gl.getUniformLocation(glProgram, "light1"), this.isOn);
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightAmbient1"), flatten(this.ambient));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightDiffuse1"), flatten(this.diffuse));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightSpecular1"), flatten(this.specular));
    gl.uniform3fv(gl.getUniformLocation(glProgram, "lightPosition1"), flatten(this.position));
  }
}
