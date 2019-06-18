import request from '@/utils/request'

export function authQuery() {
  return request({
    url: '/sys/auth/module/query',
    method: 'post'
  })
}

// export function authVcode(data) {
//   return request({
//     url: 'http://192.168.2.245/sys/auth/vcode.jpg',
//     method: 'get',
//     data
//   })
// }
