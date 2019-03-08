const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  ignoreAjaxMessageBox: state => state.user.ignoreAjaxMessageBox,
}
export default getters
