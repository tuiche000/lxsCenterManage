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
// 行程分销政策
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
// 结束
// 产品分销价格 产品列表 自由行-自由行套餐-跟团游相关
export function queryProductDrpPolicy(query) {
  return request({
    url: `/sys/product/drpPolicyProduct/queryProductDrpPolicy/${query}`,
    method: 'get'
  })
}
export function updateProductDrpPolicyStatus(data) {
  return request({
    url: '/sys/product/drpPolicyProduct/updateProductDrpPolicyStatus',
    method: 'post',
    data
  })
}
export function saveProductDrpPolicy(data) {
  return request({
    url: '/sys/product/drpPolicyProduct/saveProductDrpPolicy',
    method: 'post',
    data
  })
}
export function batchSaveProductDrpPolicy(data) {
  return request({
    url: '/sys/product/drpPolicyProduct/batchSaveProductDrpPolicy',
    method: 'post',
    data
  })
}

