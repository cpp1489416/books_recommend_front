import Camera from './common/Camera'
import SkyboxTechnique from './techniques/SkyboxTechnique'
import TextureTechnique from './techniques/TextureTechnique'
import JustColorSubTechnique from './techniques/JustColorSubTechnique'
import ObjMesh from './things/ObjMesh'
import Anchor from './things/Anchor'
import { vec3, mat4 } from 'gl-matrix'
import MatrixTransform from './transforms/MatrixTransform'
import Cube from './things/Cube'
import BasicCamera from './cameras/BasicCamera'

export default class {
  constructor(gl) {
    this.gl = gl
    this.skyboxTechnique = new SkyboxTechnique(gl)
    this.textureTechnique = new TextureTechnique(gl)
    this.supportTechnique = new JustColorSubTechnique(gl)
    this.initGl()
  }

  addComponent(component) {
    if (component instanceof Camera) {
      this.camera = component
      this.skyboxTechnique.addComponent(component)
      this.textureTechnique.addComponent(component)
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
    this.gl.viewport(0, 0, 60, 60)
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT)
    this.anchor.transform.matrix = mat4.create()
    mat4.mul(this.anchor.transform.matrix, this.anchor.transform.matrix, this.camera.getSkyboxViewMatrix())
    mat4.translate(this.anchor.transform.matrix, this.anchor.transform.matrix, [-0.5, -0.5, -0.5])
    mat4.scale(this.anchor.transform.matrix, this.anchor.transform.matrix, [4, 4, 4])
    this.supportTechnique.drawThings()
  }

  initGl() {
    // enviroment
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.depthFunc(this.gl.LESS)

    this.anchor = new Anchor(this.gl)
    this.anchor.transform = new MatrixTransform()
    this.supportTechnique.camera = new BasicCamera()
    this.supportTechnique.camera.ortho(-5, 5, -5, 5, 0.001, 100)
    this.supportTechnique.camera.lookAway([0, 0, -4])
    this.supportTechnique.addComponent(this.anchor)
  }
}
