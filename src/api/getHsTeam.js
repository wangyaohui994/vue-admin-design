import request from '../request.js'
//课程表的增删改查
//新增
export function addHsTeam(data){
	return request({
		url: '/hsTeam/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdHsTeam(data){
	return request({
		url: '/hsTeam/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateHsTeam(data){
	return request({
		url: '/hsTeam/update',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据teacherId获取course
export function queryByIdHsTeam(data){
	return request({
		url: '/hsTeam/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}