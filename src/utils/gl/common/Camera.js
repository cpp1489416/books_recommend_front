/* eslint-disable indent,no-multi-spaces */

import { mat4, vec3, vec4 } from 'gl-matrix'

export default class Camera {
  static TransformType = {
    LandObject: 0,
    Aircraft: 1,
    Local: 2
  }

  constructor(gl) {
    this.gl = gl
    this.transformType = Camera.TransformType.LandObject
  }

  getProjectionMatrix() {
    return this.projectionMatrix
  }

  getViewMatrix() {
    return this.viewMatrix
  }

  lookAt(eye, center, up) {
    this.position = vec3.clone(eye)
    var target = vec3.clone(center)

    this.zVector = vec3.create()
    vec3.sub(this.zVector, this.position, target)
    vec3.normalize(this.zVector, this.zVector)

    this.xVector = vec3.create()
    vec3.cross(this.xVector, up, this.zVector)
    vec3.normalize(this.xVector, this.xVector)

    this.yVector = vec3.create()
    vec3.cross(this.yVector, this.zVector, this.xVector)
    vec3.normalize(this.yVector, this.yVector)

    this.updateViewMatrix()

    var viewMatrix = mat4.create()
    mat4.lookAt(viewMatrix, eye, center, up)
  }

  updateViewMatrix() {
    var x = -vec3.dot(this.xVector, this.position)
    var y = -vec3.dot(this.yVector, this.position)
    var z = -vec3.dot(this.zVector, this.position)

    var view = mat4.create()

    mat4.set(
      view,
      this.xVector[0], this.yVector[0], this.zVector[0], 0,
      this.xVector[1], this.yVector[1], this.zVector[1], 0,
      this.xVector[2], this.yVector[2], this.zVector[2], 0,
      x, y, z, 1
    )
    this.viewMatrix = view
  }

  perspective2(fovy, near, far) {
    this.fovy = fovy
    this.near = near
    this.far = far
    this.aspect = 0.8
    this.updateProjectionMatrix()
  }

  setAspect(aspect) {
    this.aspect = aspect
    this.updateProjectionMatrix()
  }

  updateProjectionMatrix() {
    var projection = mat4.create()
    var a = Math.tan(this.fovy / 2)
    var b = this.aspect
    var f = this.far
    var n = this.near

    mat4.set(
      projection,
      1.0 / (a * b),       0,                       0,     0,
                  0, 1.0 / a,                       0,     0,
                  0,       0,       (f + n) / (n - f),  -1.0,
                  0,       0,   2.0 * f * n / (n - f),     0
    )
    this.projectionMatrix = projection
  }

  walk(distance) {
    if (this.transformType === Camera.TransformType.LandObject) {
      vec3.add(this.position, this.position, vec3.scale(vec3.create(), vec3.fromValues(this.zVector[0], 0, this.zVector[2]), distance))
    } else {
      vec3.add(this.position, this.position, vec3.scale(vec3.create(), this.zVector, distance))
    }
    this.updateViewMatrix()
  }

  fly(distance) {
    vec3.add(this.position, this.position, vec3.scale(vec3.create(), this.yVector, distance))
    this.updateViewMatrix()
  }

  strafe(distance) {
    vec3.add(this.position, this.position, vec3.scale(vec3.create(), this.xVector, distance))
    this.updateViewMatrix()
  }

  vec3ToVec4() {
    this.xVector = vec4.fromValues(this.xVector[0], this.xVector[1], this.xVector[2], 1)
    this.yVector = vec4.fromValues(this.yVector[0], this.yVector[1], this.yVector[2], 1)
    this.zVector = vec4.fromValues(this.zVector[0], this.zVector[1], this.zVector[2], 1)
    this.position = vec4.fromValues(this.position[0], this.position[1], this.position[2], 1)
  }

  vec4ToVec3() {
    this.xVector = vec3.fromValues(this.xVector[0], this.xVector[1], this.xVector[2])
    this.yVector = vec3.fromValues(this.yVector[0], this.yVector[1], this.yVector[2])
    this.zVector = vec3.fromValues(this.zVector[0], this.zVector[1], this.zVector[2])
    this.position = vec3.fromValues(this.position[0], this.position[1], this.position[2])
  }

  pitch(distance) {
    this.vec3ToVec4()
    var rm = mat4.create()
    if (this.transformType === Camera.Local) {
      mat4.rotate(rm, rm, distance, this.xVector)
      vec4.transformMat4(this.position, this.position, rm)
    } else {
      mat4.rotate(rm, rm, distance, this.xVector)
    }
    vec4.transformMat4(this.yVector, this.yVector, rm)
    vec4.transformMat4(this.zVector, this.zVector, rm)
    this.vec4ToVec3()
    this.updateViewMatrix()
  }

  yall(distance) {
    this.vec3ToVec4()
    var rm = mat4.create()
    if (this.transformType === Camera.Local) {
      mat4.rotate(rm, rm, distance, this.yVector)
      vec4.transformMat4(this.position, this.position, rm)
    } else {
      mat4.rotate(rm, rm, distance, this.yVector)
    }
    vec4.transformMat4(this.xVector, this.xVector, rm)
    vec4.transformMat4(this.zVector, this.zVector, rm)
    this.vec4ToVec3()
    this.updateViewMatrix()
  }
}

