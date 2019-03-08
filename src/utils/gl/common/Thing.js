import Transform from './Transform'

export default class {
  constructor(gl) {
    this.gl = gl
    this.created = false
    this.technique = null
    this.transform = new Transform()
  }

  create() {
    if (!this.created) {
      this.created = true
      this.onCreateVbo()
    }
  }

  draw() {
    this.onDraw()
  }

  createVao(technique, requirement) {
    technique.getProgram().bind()
    this.onCreateVao(technique, requirement)
    return this
  }
}
