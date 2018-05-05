/**
  * Iqra Rana, Jackson DeMeyers, Matthew Michaels
  * 5/8/2018
  */
 
class TransformationParams {
  /**
   * Create an object with details about the object's
   * x, y, and z translations and rotations.
   * @param {*} tx 
   * @param {*} ty 
   * @param {*} tz 
   * @param {*} alpha 
   * @param {*} beta 
   * @param {*} gamma 
   */
  constructor(tx, ty, tz, alpha, beta, gamma) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;

    this.alpha = alpha;
    this.beta = beta;
    this.gamma = gamma;
  }
}