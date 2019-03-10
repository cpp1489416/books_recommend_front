import { mat4 } from 'gl-matrix'

export default class {
  constructor(gl) {
    this.gl = gl
    this.matrix = mat4.create()
  }

  updateMatrix() {
    return this
  }

  getMatrix() {
    return this.matrix
  }
}

