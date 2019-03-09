<template>
  <div class="app-container">
    <el-container>
      <el-aside style="width: 1000px;">
        <canvas ref="tree" width="1000" height="500"/>
      </el-aside>
      <el-main>
        <el-button @click="repaint">repaint</el-button>
        <el-switch
          v-model="rotating"
          active-text="rotating"
          inactive-text="static"/>
        <el-input v-model="walkDistance"/>
        <el-button @click="walk">walk</el-button>
        <el-input v-model="flyDistance"/>
        <el-button @click="fly">fly</el-button>
        <el-input v-model="strafeDistance"/>
        <el-button @click="strafe">strafe</el-button>
        <el-input v-model="pitchDistance"/>
        <el-button @click="pitch">pitch</el-button>
        <el-input v-model="yallDistance"/>
        <el-button @click="yall">yall</el-button>
        <el-input v-model="rollDistance"/>
        <el-button @click="roll">roll</el-button>
        <el-button @click="reflect">reflect</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Camera from '../../utils/gl/common/Camera'
import Cube from '../../utils/gl/things/Cube'
import { vec3, mat4 } from 'gl-matrix'
import Anchor from '../../utils/gl/things/Anchor'
import ObjMesh from '../../utils/gl/things/ObjMesh'
import Quad from '../../utils/gl/things/Quad'
import Scene from '../../utils/gl/Scene'
import MatrixTransform from '../../utils/gl/transforms/MatrixTransform'
import PlaneReflectedCamera from '../../utils/gl/cameras/PlaneReflectedCamera'
import BasicCamera from '../../utils/gl/cameras/BasicCamera'

export default {
  data() {
    return {
      canvas: null,
      scene: null,
      camera: null,
      reflectedCamera: null,
      cube: null,
      anchor: null,
      gl: null,
      quad: null,
      now: 1,
      walkDistance: 1,
      flyDistance: 1,
      strafeDistance: 0.1,
      pitchDistance: 0.1,
      yallDistance: 0.1,
      rollDistance: 0.1,
      rotating: false
    }
  },
  watch: {
    filterText(val) {
    }
  },
  mounted() {
    var canvas = this.$refs.tree
    this.canvas = canvas
    this.repaint()
  },

  methods: {
    repaint: function() {
      // 获取canvas元素
      // 获取绘制二维上下文
      var gl = this.canvas.getContext('webgl2')
      this.gl = gl
      if (!gl) {
        return
      }
      this.initGl()
      this.paintGl()
    },

    initGl: async function() {
      this.camera = new BasicCamera()
      this.camera.lookAt([80, 80, -80], [0, 30, 0], [0, 1, 0])
      this.camera.perspective(3.14 / 2 / 2, 0.1, 10000)
      this.camera.ortho(-5, 5, -5, 5, 0.001, 100)
      this.camera.setAspect(2)
      this.camera.transformType = BasicCamera.TransformType.LandObject
      this.reflectedCamera = new PlaneReflectedCamera(this.camera)

      this.cube = new Cube(this.gl)
      this.anchor = new Anchor(this.gl)
      this.anchor.transform.scale = vec3.fromValues(2, 2, 2)

      this.mesh = new ObjMesh(this.gl, '/static/models/tails/Tails.obj')
      this.mesh.transform = new MatrixTransform()
      this.quad = new Quad(this.gl)

      this.scene = new Scene(this.gl)
      this.scene.resize(this.canvas.width, this.canvas.height)
      this.scene.addComponent(this.reflectedCamera)
      this.scene.addComponent(this.mesh)
      setInterval(this.timePass, 100)

      var m = mat4.create()
      mat4.lookAt(m, [0, 0, 0], [0, 0, -1], [0, 1, 0])
      // console.log(m)

      mat4.perspective(m, 3.14 / 2 / 2, 1, 0.1, 100)
      // console.log('persp: ' + m)
      mat4.ortho(m, -1, 1, -1, 1, 0.1, 100)
      // console.log('ortho: ' + m)
    },

    paintGl: function() {
      this.scene.draw()
    },

    timePass: function() {
      if (this.mesh !== null) {
        this.now += 0.2
        this.mesh.transform.matrix = mat4.create()
        var matrix = this.mesh.transform.matrix
        if (this.rotating) {
          mat4.rotate(matrix, matrix, this.now, [0, 1, 0])
        }
        mat4.scale(matrix, matrix, [3, 3, 3])
        this.mesh.transform.rotation = vec3.fromValues(this.now, this.now, this.now)
      }
      this.paintGl()
    },
    walk() {
      this.camera.walk(Number(this.walkDistance))
    },
    fly() {
      this.camera.fly(Number(this.flyDistance))
    },
    strafe() {
      this.camera.strafe(Number(this.strafeDistance))
    },
    pitch() {
      this.camera.pitch(Number(this.pitchDistance))
    },
    yall() {
      this.camera.yall(Number(this.yallDistance))
    },
    roll() {
      this.camera.roll(Number(this.rollDistance))
    },
    reflect() {
      if (this.reflectedCamera.plane == null) {
        this.reflectedCamera.changePlane([1, 0, 0, 10])
      } else {
        this.reflectedCamera.changePlane(null)
      }
    }
  }
}
</script>

