import request from '@/utils/request'
export function getGrop(query) {
  return request({
    url: '/sys/product/drpPolicyGroup/query',
    method: 'get'
  })
}
export function rename(data) {
  return request({
    url: '/sys/product/drpPolicyGroup/rename',
    method: 'post',
    data
  })
}
export function changeGroupReq(data) {
  return request({
    url: '/sys/product/drpPolicyGroup/changeGroup',
    method: 'post',
    data
  })
}
export function deleteGropu(groupId) {
  return request({
    url: `/sys/product/drpPolicyGroup/delete/${groupId}`,
    method: 'delete'
  })
}
export function createGropu(data) {
  return request({
    url: `/sys/product/drpPolicyGroup/create`,
    method: 'put',
    data
  })
}
