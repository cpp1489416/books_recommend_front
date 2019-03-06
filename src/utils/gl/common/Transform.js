import { mat4, vec3 } from 'gl-matrix'

export default class {
  constructor(gl) {
    this.gl = gl
    /*
    this.position = new THREE.Vector3(0, 0, 0)
    this.rotation = new THREE.Vector3(0, 0, 0)
    this.scale = new THREE.Vector3(0.5, 0.5, 0.5)
    */
    this.position = vec3.fromValues(0, 0, 0)
    this.rotation = vec3.fromValues(0, 0, 0)
    this.scale = vec3.fromValues(1, 1, 1)
    this.matrix = mat4.create()
  }

  updateMatrix() {
    /*
    this.matrix = new THREE.Matrix4().makeTranslation(this.position.x, this.position.y, this.position.z)
    this.matrix.multiply(new THREE.Matrix4().makeRotationX(this.rotation.x))
    this.matrix.multiply(new THREE.Matrix4().makeRotationY(this.rotation.y))
    this.matrix.multiply(new THREE.Matrix4().makeRotationZ(this.rotation.z))
    this.matrix.multiply(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z))
    */
    this.matrix = mat4.create()
    mat4.translate(this.matrix, this.matrix, this.position)
    mat4.rotateX(this.matrix, this.matrix, this.rotation[0])
    mat4.rotateY(this.matrix, this.matrix, this.rotation[1])
    mat4.rotateZ(this.matrix, this.matrix, this.rotation[2])
    mat4.scale(this.matrix, this.matrix, this.scale)
    return this
  }

  getMatrix() {
    this.updateMatrix()
    return this.matrix
  }
}
