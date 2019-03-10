import Camera from './common/Camera'
import SkyboxTechnique from './techniques/SkyboxTechnique'
import TextureTechnique from './techniques/TextureTechnique'
import JustColorSubTechnique from './techniques/JustColorSubTechnique'
import ObjMesh from './things/ObjMesh'
import Anchor from './things/Anchor'
import { vec3, mat4 } from 'gl-matrix'
import MatrixTransform from './transforms/MatrixTransform'
import Quad from './things/Quad'
import BasicCamera from './cameras/BasicCamera'
import FramebufferTexture from './common/FramebufferTexture'
import RttTechnique from './techniques/RttTechnique'
import PlaneReflectedCamera from './cameras/PlaneReflectedCamera'

export default class {
  constructor(gl) {
    this.gl = gl
    this.skyboxTechnique = new SkyboxTechnique(gl)
    this.textureTechnique = new TextureTechnique(gl)
    this.supportTechnique = new JustColorSubTechnique(gl)
    this.rttTechnique = new RttTechnique(gl)
    this.mirrorEnabled = false
    this.quad = new Quad(this.gl)
    this.quad.transform.position = [-0, 1, 50]
    this.quad.transform.rotation = [0, 0, 0]
    this.quad.transform.scale = [-50, 35, 0]
    this.rttTechnique.addThing(this.quad)
    this.initGl()
  }

  addComponent(component) {
    if (component instanceof Camera) {
      this.camera = component
      this.skyboxTechnique.addComponent(component)
      this.textureTechnique.addComponent(component)
      this.rttTechnique.addComponent(component)
      this.setMirrorEnabled(this.mirrorEnabled)
      if (this.mirrorEnabled) {
        console.log(this.camera)
        this.mirrorCamera = new PlaneReflectedCamera(this.camera).changePlane([0, 0, -1, 50])
        this.rttTechnique.setRttCamera(this.mirrorCamera)
      }
    } else if (component instanceof ObjMesh) {
      this.textureTechnique.addComponent(component)
    }
    return this
  }

  setSize(width, height) {
    this.width = width
    this.height = height
    this.setMirrorEnabled(this.mirrorEnabled)
    return this
  }

  setMirrorEnabled(enabled) {
    this.mirrorEnabled = enabled
    if (enabled) {
      this.rtt = new FramebufferTexture(this.gl).setSize(this.width, this.height).build()
      this.quad.texture = this.rtt.getTexture()
      this.rtt.bindFramebuffer()
    }
    return this
  }

  drawInFramebuffer() {
    this.gl.viewport(0, 0, this.width, this.height)
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT)
    this.skyboxTechnique.drawThings()
    this.textureTechnique.drawThings()
  }

  drawSupports() {
    this.gl.viewport(0, 0, 60, 60)
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT)
    this.supportTechnique.drawThings()
  }

  draw() {
    this.anchor.transform.matrix = mat4.create()
    mat4.mul(this.anchor.transform.matrix, this.anchor.transform.matrix, this.camera.getSkyboxViewMatrix())
    mat4.translate(this.anchor.transform.matrix, this.anchor.transform.matrix, [-0.5, -0.5, -0.5])
    mat4.scale(this.anchor.transform.matrix, this.anchor.transform.matrix, [4, 4, 4])

    if (this.mirrorEnabled) {
      this.rtt.bindFramebuffer()
      this.skyboxTechnique.setCamera(this.mirrorCamera)
      this.textureTechnique.setCamera(this.mirrorCamera)
      this.drawInFramebuffer()
      this.rtt.unbindFramebuffer()
      this.skyboxTechnique.setCamera(this.camera)
      this.textureTechnique.setCamera(this.camera)
    }

    this.drawInFramebuffer()

    if (this.mirrorEnabled) {
      this.rttTechnique.drawThings()
    }

    this.drawSupports()
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
