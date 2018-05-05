/**
  * Iqra Rana, Jackson DeMeyers, Matthew Michaels
  * 5/8/2018
  */
  
/**
 * Simple WebGL Camera using the lookat approach and perspective projection.
 * Provide access to ModelView matrix (M), ModelView Inverse Transpose matrix
 * (MInvTrans), and the perspective projection matrix (PPersp).
 */
class WebGlCamera {
  /**
   * Create a new WebGL camera using the lookat approach and perspective projection.
   * @param {vec3} eye Location of the "eye" of the camera represented as a WebGL vec3.
   * @param {vec3} lookAt Location of the "look at" point of the scene, represented as a WebGL vec3.
   * @param {vec3} upVector The positive y-axis unit vector of the scene represented as a WebGL vec3.
   * @param {projectionParams} projectionParams Perspective projection parameters object (light, right, top, bottom, etc...).
   */
  constructor(eye, lookAt, upVector, projectionParams) {
    this.e = eye;
    this.a = lookAt;
    this.vup = upVector;
    this.projection = projectionParams;

    this.d = subtract(this.e, this.a);
    this.n = normalize(this.d, 0);

    this.k = cross(this.vup, this.n);
    this.u = normalize(this.k, 0);

    this.l = cross(this.n, this.u);
    this.v = normalize(this.l, 0);

    this.M = this._calcM();
    this.MInvTrans = this._calcMInvTrans();
    this.PPersp = this._calcPPersp();
  }

  /**
   * Calculate the ModelView matrix.
   */
  _calcM() {
    return [
      this.u[0], this.v[0], this.n[0], 0.0,
      this.u[1], this.v[1], this.n[1], 0.0,
      this.u[2], this.v[2], this.n[2], 0.0,
      -(this.e[0] * this.u[0]) - (this.e[1] * this.u[1]) - (this.e[2] * this.u[2]),
      -(this.e[0] * this.v[0]) - (this.e[1] * this.v[1]) - (this.e[2] * this.v[2]),
      -(this.e[0] * this.n[0]) - (this.e[1] * this.n[1]) - (this.e[2] * this.n[2]),
      1.0
    ];
  }

  /**
   * Calculate the ModelView Inverse Transpose matrix.
   */
  _calcMInvTrans() {
    return [
      this.u[0], this.u[1], this.u[2], 0.0,
      this.v[0], this.v[1], this.v[2], 0.0,
      this.n[0], this.n[1], this.n[2], 0.0,
      this.e[0], this.e[1], this.e[2], 1.0
    ];
  }

  /**
   * Calculate the perspective projection matrix.
   */
  _calcPPersp() {
    return [(2 * this.projection.near) / (this.projection.right - this.projection.left), 0.0, 0.0, 0.0,
      0.0, (2 * this.projection.near) / (this.projection.top - this.projection.bottom), 0.0, 0.0,
    (this.projection.right + this.projection.left) / (this.projection.right - this.projection.left), (this.projection.top + this.projection.bottom) / (this.projection.top - this.projection.bottom), -((this.projection.far + this.projection.near) / (this.projection.far - this.projection.near)), -1.0,
      0.0, 0.0, -((2 * this.projection.far * this.projection.near) / (this.projection.far - this.projection.near)), 0.0];
  }
}
