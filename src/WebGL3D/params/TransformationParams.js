class TransformationParams {
  /**
   * 
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