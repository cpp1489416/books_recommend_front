
export default class {
  constructor(gl) {
    this.gl = gl
    this.created = false
  }

  create() {
    if (!this.created) {
      this.created = true
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
      this.gl.activeTexture(this.gl.TEXTURE0)
      this.id = this.gl.createTexture()
    }
  }

  destroy() {
    if (this.created) {
      this.created = false
    }
  }

  bind() {
    if (!this.created) {
      this.create()
    }
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id)
  }

  getId() {
    return this.id
  }

  fromImage(url) {
    this.bind()
    var image = new Image()
    var that = this
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 122, 255, 255]))

    image.onload = function() {
      that.bind()
      that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGB, that.gl.RGB, that.gl.UNSIGNED_BYTE, image)
      that.gl.texParameterf(that.gl.TEXTURE_2D, that.gl.TEXTURE_MIN_FILTER, that.gl.LINEAR)
      that.gl.texParameterf(that.gl.TEXTURE_2D, that.gl.TEXTURE_MAG_FILTER, that.gl.LINEAR)
      that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_R, that.gl.CLAMP_TO_EDGE)
      that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_S, that.gl.CLAMP_TO_EDGE)
      that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_T, that.gl.CLAMP_TO_EDGE)
    }
    image.src = url

    return this
  }
}
