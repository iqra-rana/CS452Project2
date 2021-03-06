/**
  * Iqra Rana, Jackson DeMeyers, Matthew Michaels
  * 5/8/2018
  */
  
class ProjectionParams {
  /**
   * Create an abject containing the perspective
   * projection parameters.
   * @param {number} left 
   * @param {number} right 
   * @param {number} top 
   * @param {number} bottom 
   * @param {number} near 
   * @param {number} far 
   */
  constructor(left, right, top, bottom, near, far) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
  }
}
