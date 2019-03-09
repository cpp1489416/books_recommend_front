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
}
