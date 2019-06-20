import request from '@/utils/request'

export function getQueryInfoList(data) {
  return request({
    url: '/sys/product/queryInfoList',
    method: 'post',
    data
  })
}
export function getQueryProductChildType(data) {
  return request({
    url: '/sys/product/queryProductChildType',
    method: 'post',
    data
  })
}
export function getCity(data) {
  return request({
    url: '/sys/city/query',
    method: 'post',
    data
  })
}
export function productsegment(data) {
  return request({
    url: '/sys/productsegment/query',
    method: 'post',
    data
  })
}
export function queryTheSingleSegment(data) {
  return request({
    url: '/sys/productSale/queryTheSingleSegment',
    method: 'post',
    data
  })
}
export function queryPslDrpPolicy(data) {
  return request({
    url: '/sys/product/drpPolicyPsl/queryPslDrpPolicy',
    method: 'post',
    data
  })
}
export function updatePslDrpPolicyStatus(data) {
  return request({
    url: '/sys/product/drpPolicyPsl/updatePslDrpPolicyStatus',
    method: 'post',
    data
  })
}
export function savePslDrpPolicy(data) {
  return request({
    url: '/sys/product/drpPolicyPsl/savePslDrpPolicy',
    method: 'post',
    data
  })
}

export function batchSavePslDrpPolicy(data) {
  return request({
    url: '/sys/product/drpPolicyPsl/batchSavePslDrpPolicy',
    method: 'post',
    data
  })
}
