/* eslint-disable no-irregular-whitespace */
import { vec3 } from 'gl-matrix'

export default class {
  static reflectMatrix(m, plane) {
    m[0] = 1 - 2 * plane[0] * plane[0]
    m[4] = -2 * plane[1] * plane[0]
    m[8] = -2 * plane[2] * plane[0]
    m[12] = -2 * plane[3] * plane[0]

    m[1] = -2 * plane[0] * plane[1]
    m[5] = 1 - 2 * plane[1] * plane[1]
    m[9] = -2 * plane[2] * plane[1]
    m[13] = -2 * plane[3] * plane[1]

    m[2] = -2 * plane[0] * plane[2]
    m[6] = -2 * plane[1] * plane[2]
    m[10] = 1 - 2 * plane[2] * plane[2]
    m[14] = -2 * plane[3] * plane[2]

    m[3] = 0
    m[7] = 0
    m[11] = 0
    m[15] = 1

    return m
  }

  static reflectVector(out, vec, plane) {
    var i = vec3.normalize(vec3.create(), vec)
    var n = vec3.normalize(vec3.create(), plane)
    var s2 = vec3.scale(vec3.create(), n, -2 * vec3.dot(i, n))
    vec3.add(out, i, s2)

    return out
  }

  static pointPlaneToVectorPlane(out, vec1, vec2, vec3) {
    //
    // (y2*z3 - y2*z1 - y1*z3 - y3*z2 + y1*z2 + y3*z1)*X +
    // (x3*z2 - x1*z2 - x3*z1 - x2*z3 + x2*z1 + x1*z3)*Y +
    //  (x2*y3 - x2*y1 - x1*y3 - x3*y2 + x3*y1 + x1*y2)*Z +
    // x1*y3*z2 + x2*y1*z3 + x3*y2*z1 - x1*y2*z3 - x3*y1*z2 - x2*y3*z1 = 0;

    var x1 = vec1[0]
    var y1 = vec1[1]
    var z1 = vec1[2]
    var x2 = vec2[0]
    var y2 = vec2[1]
    var z2 = vec2[2]
    var x3 = vec3[0]
    var y3 = vec3[1]
    var z3 = vec3[2]
    out[0] = y2 * z3 - y2 * z1 - y1 * z3 - y3 * z2 + y1 * z2 + y3 * z1
    out[1] = x3 * z2 - x1 * z2 - x3 * z1 - x2 * z3 + x2 * z1 + x1 * z3
    out[2] = x2 * y3 - x2 * y1 - x1 * y3 - x3 * y2 + x3 * y1 + x1 * y2
    out[3] = x1 * y3 * z2 + x2 * y1 * z3 + x3 * y2 * z1 - x1 * y2 * z3 - x3 * y1 * z2 - x2 * y3 * z1
    return out
  }
}
