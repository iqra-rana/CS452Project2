/**
  * Iqra Rana, Jackson DeMeyers, Matthew Michaels
  * 5/8/2018
  */
 
class LightingParams {
  /**
   * Create an object containing the object's 
   * lighting coeficients.
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
