class LightingParams {
  /**
   * 
   * @param {*} ambient 
   * @param {*} diffuse 
   * @param {*} specular 
   * @param {*} shininess 
   */
  constructor(ambient, diffuse, specular, shininess) {
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
  }
}
