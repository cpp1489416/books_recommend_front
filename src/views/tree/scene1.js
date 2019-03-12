
export default {
  camera: {
    position: [80, 30, -80],
    up: [0, 1, 0],
    target: [0, 30, 0]
  },
  models: {
    mesh1: {
      type: 'obj_mesh',
      url: '/static/models/tails/Tails.obj',
      transform: {
        position: [20, 0, 0],
        scaling: [3, 3, 3]
      }
    }
  }
}
