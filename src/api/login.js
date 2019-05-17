import ajax from '@/utils/ajax'

export function login(username, password) {
  return ajax({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfo(ignoreConfirm) {
  return ajax({
    url: '/user/info',
    method: 'get',
    ignoreConfirm: ignoreConfirm
  })
}

export function logout() {
  return ajax({
    url: '/logout',
    method: 'get'
  })
}
