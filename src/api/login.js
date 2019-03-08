import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfo(ignoreConfirm) {
  return request({
    url: '/user/info',
    method: 'get',
    ignoreConfirm: ignoreConfirm
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
