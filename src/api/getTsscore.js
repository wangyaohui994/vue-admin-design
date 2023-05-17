import request from '../request.js'
//表的增删改查
//新增
export function addTsscore(data){
	return request({
		url: '/tsscore/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdTsscore(data){
	return request({
		url: '/tsscore/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateTsscore(data){
	return request({
		url: '/tsscore/update',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据teacherId获取course
export function queryByIdTsscore(data){
	return request({
		url: '/tsscore/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}
