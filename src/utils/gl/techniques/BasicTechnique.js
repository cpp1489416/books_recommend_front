import Technique from '../common/Technique'
import Shader from '../common/Shader'
import Program from '../common/Program'
import vs_code from '@/assets/shaders/BasicVS.glsl'
import ps_code from '@/assets/shaders/BasicPS.glsl'

export default class extends Technique {
  onCreate() {
    this.vertexShader = new Shader(this.gl, this.gl.VERTEX_SHADER).compile(vs_code)
    this.fragmentShader = new Shader(this.gl, this.gl.FRAGMENT_SHADER).compile(ps_code)
    this.program = new Program(this.gl)
    this.program.addShader(this.vertexShader).addShader(this.fragmentShader).link()
  }

  getPositionAttribute() { return this.getAttributeLocation('position') }
  getColorAttribute() { return this.getAttributeLocation('color') }
  getProjectionMatrixUniform() { return this.getUniformLocation('projectionMatrix') }
  getViewMatrixUniform() { return this.getUniformLocation('viewMatrix') }
  getModelMatrixUniform() { return this.getUniformLocation('modelMatrix') }

  getThingRequirement() {
    return {
      needColor: true,
      needNormal: false,
      needTexture: false
    }
  }
}