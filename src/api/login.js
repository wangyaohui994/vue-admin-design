import request from '../request.js'

//教师登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

//学生登录
export function loginStudent(data) {
  return request({
    url: '/loginStudent',
    method: 'post',
    data
  })
}
export function getUserInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}
