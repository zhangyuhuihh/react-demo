import request from '@/assets/utils/request'

// /test/zyhDemo/getAll
export function getAll() {
  return request({
    url: '/zyhDemo/getAll'
  })
}

// 新增
export function addOne(data) {
  return request({
    url: '/zyhDemo/addOne',
    method: 'post',
    data
  })
}

// 删除
export function deleteOne(data) {
  return request({
    url: '/zyhDemo/deleteOne',
    method: 'delete',
    data
  })
}

export function editOne(data) {
  return request({
    url: '/zyhDemo/editOne',
    method: 'post',
    data
  })
}