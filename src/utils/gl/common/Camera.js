
export default class Camera {
  constructor() {
    this.eventListeners = []
  }

  addEventListener(e) {
    this.eventListeners.push(e)
  }

  notifyProjectionMatrixChanged() {
    for (var i in this.eventListeners) {
      if (this.eventListeners[i].onProjectionMatrixChanged) {
        this.eventListeners[i].onProjectionMatrixChanged()
      }
    }
  }

  notifyViewMatrixChanged() {
    for (var i in this.eventListeners) {
      if (this.eventListeners[i].onViewMatrixChanged) {
        this.eventListeners[i].onViewMatrixChanged()
      }
    }
  }
}
