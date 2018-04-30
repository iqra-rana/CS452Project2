class WebGlCamera {
  /**
   * 
   * @param {*} eye 
   * @param {*} lookAt 
   * @param {*} upVector 
   * @param {projectionParams} projectionParams 
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

  _calcMInvTrans() {
    return [
      this.u[0], this.u[1], this.u[2], 0.0,
      this.v[0], this.v[1], this.v[2], 0.0,
      this.n[0], this.n[1], this.n[2], 0.0,
      this.e[0], this.e[1], this.e[2], 1.0
    ];
  }

  _calcPPersp() {
    return [(2 * this.projection.near) / (this.projection.right - this.projection.left), 0.0, 0.0, 0.0,
      0.0, (2 * this.projection.near) / (this.projection.top - this.projection.bottom), 0.0, 0.0,
    (this.projection.right + this.projection.left) / (this.projection.right - this.projection.left), (this.projection.top + this.projection.bottom) / (this.projection.top - this.projection.bottom), -((this.projection.far + this.projection.near) / (this.projection.far - this.projection.near)), -1.0,
      0.0, 0.0, -((2 * this.projection.far * this.projection.near) / (this.projection.far - this.projection.near)), 0.0];
  }
}
