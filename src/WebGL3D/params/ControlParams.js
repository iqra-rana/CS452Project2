class ControlParams {
  /**
   * Create an object containing the transformation 
   * controls for creating a new WebGL3D object.
   * @param {string} xRotatekey 
   * @param {string} yRotatekey 
   * @param {string} zRotateKey 
   * @param {string} xMoveKey 
   * @param {string} yMoveKey 
   * @param {string} xScaleKey 
   * @param {string} yScaleKey 
   */
  constructor(
    xRotatekey,
    yRotatekey,
    zRotateKey,
    xMoveKey,
    yMoveKey,
    xScaleKey,
    yScaleKey
  ) {
    this.xRotatekey = xRotatekey;
    this.yRotatekey = yRotatekey;
    this.zRotateKey = zRotateKey;
    this.xMoveKey = xMoveKey;
    this.yMoveKey = yMoveKey;
    this.xScaleKey = xScaleKey;
    this.yScaleKey = yScaleKey;
  }
}
