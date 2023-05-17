import request from '../request.js'
//小组表的增删改查
//新增
export function addTeam(data){
	return request({
		url: '/team/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdTeam(data){
	return request({
		url: '/team/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateTeam(data){
	return request({
		url: '/team/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByIdTeam(data){
	return request({
		url: '/team/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByCourseIdTeam(data){
	return request({
		url: '/team/querybycourseid',//请求接口
		method: 'post',//请求方式
		data
	})
}