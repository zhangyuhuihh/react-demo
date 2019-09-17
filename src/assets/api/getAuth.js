import request from '../utils/request'
const apiPrefix = '/oa'

export function chooseSystem(params) {
  return request({
    url: '/common/employee/v1/chooseSystemNew',
    method: 'get',
    params,
    apiPrefix
  })
}

export function logout(data) {
  return request({
    url: '/common/employee/v1/logout',
    method: 'post',
    data,
    apiPrefix
  })
}