class TextureParams {
  /**
   * Create an object containing details required to render
   * a texture.
   * @param {*} textureCoords 
   * @param {*} texture 
   * @param {*} textureSize 
   */
  constructor(textureCoords, texture, textureSize) {
    this.textureCoords = textureCoords;
    this.texture = texture;
    this.textureSize = textureSize;
  }
}
