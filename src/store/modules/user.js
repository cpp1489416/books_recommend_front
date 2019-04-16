import { login, logout, getUserInfo } from '@/api/login'
import ajax from '@/utils/ajax'
import store from '../index'

const user = {
  state: {
    username: '',
    avatar: '/static/logo.png',
    roles: [],
    info: {},
    ignoreAjaxMessageBox: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, info) => {
      state.info = info
    },
    SET_IGNORE_AJAX_MESSAGE_BOX: (state, v) => {
      state.ignoreAjaxMessageBox = v
    }
  },

  actions: {
    // 登录
    Login: function({ commit }, user) {
      const username = user.username.trim()
      return new Promise((resolve, reject) => {
        ajax({
          url: '/login',
          method: 'post',
          data: {
            username,
            password: user.password
          }
        }).then(response => {
          if (response.code === '0') {
            commit('SET_USERNAME', username)
            // the following code should be corrected, this is not good, why 'this' means store?
            this.dispatch('GetUserInfo').then(function() {
              resolve(response)
            })
          } else {
            commit('SET_USERNAME', '')
            resolve(response)
          }
        }).catch(error => {
          commit('SET_USERNAME', '')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/user',
          method: 'get',
          ignoreConfirm: true
        }).then(response => {
          const info = response.info
          commit('SET_USERNAME', info.username)
          commit('SET_USER_INFO', info)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
        }).catch(() => {
        })
        commit('SET_USERNAME', '')
        commit('SET_USER_INFO', null)
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERNAME', '')
        commit('SET_USER_INFO', null)
        resolve()
      })
    }
  }
}

export default user
