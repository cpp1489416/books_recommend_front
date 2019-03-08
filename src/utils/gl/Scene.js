import Camera from './common/Camera'
import SkyboxTechnique from './techniques/SkyboxTechnique'
import TextureTechnique from './techniques/TextureTechnique'
import BasicTechnique from './techniques/BasicTechnique'
import ObjMesh from './things/ObjMesh'

export default class {
  constructor(gl) {
    this.gl = gl
    this.skyboxTechnique = new SkyboxTechnique(gl)
    this.textureTechnique = new TextureTechnique(gl)
    this.basicTechnique = new BasicTechnique(gl)
    this.initGl()
  }

  addComponent(component) {
    if (component instanceof Camera) {
      this.camera = component
      this.skyboxTechnique.addComponent(component)
      this.textureTechnique.addComponent(component)
      this.basicTechnique.addComponent(component)
    } else if (component instanceof ObjMesh) {
      this.textureTechnique.addComponent(component)
    }
  }

  resize(width, height) {
    this.width = width
    this.height = height
  }

  draw() {
    this.gl.viewport(0, 0, this.width, this.height)
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT)
    this.skyboxTechnique.drawThings()
    this.textureTechnique.drawThings()
  }

  initGl() {
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.depthFunc(this.gl.LESS)
  }
}
