import request from '@/assets/utils/request'

export function getCapitalAssertsLocalsForPage(params, data) {
  return request({
    url: '/capitalAssertsLocal/getCapitalAssertsLocalsForPage',
    method: 'post',
    params,
    data
  })
}

// 新增
export function insertCapitalAssertsLocal(data) {
  return request({
    url: '/capitalAssertsLocal/insertCapitalAssertsLocal',
    method: 'post',
    data,
  })
}

// 编辑
export function updateCapitalAssertsLocalById(data) {
  return request({
    url: '/capitalAssertsLocal/updateCapitalAssertsLocalById',
    method: 'post',
    data,
  })
}

// 删除
export function deleteCapitalAssertsLocalBatch(data) {
  return request({
    url: '/capitalAssertsLocal/deleteCapitalAssertsLocalBatch',
    method: 'delete',
    data,
  })
}

// POST /pm/web/capitalAssertsLocal/insertCapitalAssertsLocal
// POST /pm/web/capitalAssertsLocal/updateCapitalAssertsLocalById
// DELETE /pm/web/capitalAssertsLocal/deleteCapitalAssertsLocalBatch