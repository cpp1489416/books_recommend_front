import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

Mock.mock('http://www.bai.com', 'get', function(options) {
  return {
    id: 'dd'
  }
})

Mock.mock('api/login', 'post', function(options) {
  return {
    code: '0',
    msg: '',
    info: {
      name: 'admin',
      password: 'password'
    }
  }
})

Mock.mock('api/user/info', 'get', function(options) {
  return {
    code: '0',
    msg: '',
    info: {
      'id': 1,
      'password': 'pbkdf2_sha256$120000$E4raFlMZnM10$u0l5Xnd8x6fs8tSU9mkfdPnTBhOPDugEHYz6A0bJS+Q=',
      'last_login': '2019-03-01T13:47:55.207Z',
      'is_superuser': true,
      'username': 'admin',
      'first_name': '',
      'last_name': '',
      'email': 'none',
      'is_staff': true,
      'is_active': true,
      'date_joined': '2019-02-05T08:21:49.638Z',
      'groups': [],
      'user_permissions': []
    }
  }
})

export default Mock
