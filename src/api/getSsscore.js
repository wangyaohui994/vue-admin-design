import request from '../request.js'
//表的增删改查
//新增
export function addSsscore(data){
	return request({
		url: '/ssscore/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdSsscore(data){
	return request({
		url: '/ssscore/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateSsscore(data){
	return request({
		url: '/ssscore/update',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据teacherId获取course
export function queryByIdSsscore(data){
	return request({
		url: '/ssscore/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}
