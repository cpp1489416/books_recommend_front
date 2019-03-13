import Technique from '../common/Technique'
import Shader from '../common/Shader'
import Program from '../common/Program'
import vs_code from '@/assets/shaders/main_vertex_shader.glsl'
import ps_code from '@/assets/shaders/main_fragment_shader.glsl'

export default class extends Technique {
  onCreate() {
    this.vertexShader = new Shader(this.gl, this.gl.VERTEX_SHADER).compile(vs_code)
    this.fragmentShader = new Shader(this.gl, this.gl.FRAGMENT_SHADER).compile(ps_code)
    this.program = new Program(this.gl)
    this.program.addShader(this.vertexShader).addShader(this.fragmentShader).link()
    this.locations = {
      attributes: {
        position: this.getAttributeLocation('position'),
        textureCoord: this.getAttributeLocation('textureCoord'),
        normal: this.getAttributeLocation('normal')
      },
      uniforms: {
        normalMatrix: this.getUniformLocation('normalMatrix'),
        clipPlane0: {
          enabled: this.getUniformLocation('clipPlane0.enabled'),
          plane: this.getUniformLocation('clipPlane0.plane')
        },
        material: {
          diffuseColor: this.getUniformLocation('material.diffuseColor'),
          diffuseMapEnabled: this.getUniformLocation('material.diffuseMapEnabled'),
          normalExist: this.getUniformLocation('material.normalExist')
        },
        directionLight: {
          enabled: this.getUniformLocation('directionLight.enabled'),
          direction: this.getUniformLocation('directionLight.direction'),
          color: this.getUniformLocation('directionLight.color'),
          intensity: this.getUniformLocation('directionLight.intensity')
        }
      }
    }
    this.setClipPlane0(null)
    this.setDirectionLight(null)
  }

  drawThings() {
    this.getProgram().bind()
    this.updateProjectionMatrixAndViewMatrix()
    for (var i in this.things) {
      var thing = this.things[i]
      this.getProgram().bind()
      this.updateModelMatrix(thing.transform.getMatrix())
      this.setNormalMatrix(thing.transform.getNormalMatrix())
      thing.draw()
    }
  }

  getPositionAttribute() { return this.locations.attributes.position }
  getTextureCoordAttribute() { return this.locations.attributes.textureCoord }
  getNormalAttribute() { return this.locations.attributes.normal }
  getProjectionMatrixUniform() { return this.getUniformLocation('projectionMatrix') }
  getViewMatrixUniform() { return this.getUniformLocation('viewMatrix') }
  getModelMatrixUniform() { return this.getUniformLocation('modelMatrix') }
  getSamplerUniform() { return this.getUniformLocation('pictures') }

  setNormalMatrix(matrix) {
    this.gl.uniformMatrix4fv(this.locations.uniforms.normalMatrix, this.gl.FALSE, matrix)
  }

  setClipPlane0(plane) {
    this.getProgram().bind()
    if (plane === null || plane.enabled === 0 || plane.enabled === false) {
      this.gl.uniform1i(this.locations.uniforms.clipPlane0.enabled, 0)
    } else {
      this.gl.uniform1i(this.locations.uniforms.clipPlane0.enabled, 1)
      let finalPlane
      if (typeof plane.plane !== 'undefined') {
        finalPlane = plane.plane
      } else {
        finalPlane = plane
      }
      this.gl.uniform4fv(this.locations.uniforms.clipPlane0.plane, finalPlane)
    }
  }

  setMaterial(material) {
    this.getProgram().bind()
    if (typeof material.diffuseColor !== 'undefined') {
      this.gl.uniform3fv(this.locations.uniforms.material.diffuseColor, material.diffuseColor)
    }
    if (typeof material.diffuseMapEnabled !== 'undefined') {
      let diffuseMapEnabled = material.diffuseMapEnabled
      if (typeof material.diffuseMapEnabled === 'boolean') {
        diffuseMapEnabled = material.diffuseMapEnabled ? 1 : 0
      }
      this.gl.uniform1i(this.locations.uniforms.material.diffuseMapEnabled, diffuseMapEnabled)

      if (typeof material.normalExist === 'undefined') {
        material.normalExist = 1
      } else if (typeof material.normalExist === 'boolean') {
        material.normalExist = material.normalExist ? 1 : 0
      }
      this.gl.uniform1i(this.locations.uniforms.material.normalExist, material.normalExist)
    }
  }

  setDirectionLight(light) {
    this.getProgram().bind()
    if (light === null || light.enabled === 0 || light.enabled === false) {
      this.gl.uniform1i(this.locations.uniforms.directionLight.enabled, 0)
    } else {
      this.gl.uniform1i(this.locations.uniforms.directionLight.enabled, 1)
      this.gl.uniform3fv(this.locations.uniforms.directionLight.direction, light.direction)
      this.gl.uniform3fv(this.locations.uniforms.directionLight.color, light.color)
      this.gl.uniform1f(this.locations.uniforms.directionLight.intensity, light.intensity)
    }
  }

  getThingRequirement() {
    return {
      needColor: false,
      needNormal: true,
      needTexture: true
    }
  }
}
