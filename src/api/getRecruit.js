import request from '../request.js'
//招募表的增删改查
//新增
export function add(data){
	return request({
		url: '/recruit/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdRecruit(data){
	return request({
		url: '/recruit/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateRecruit(data){
	return request({
		url: '/recruit/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByIdRecruit(data){
	return request({
		url: '/recruit/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByTidRecruit(data){
	return request({
		url: '/recruit/querybyrtid',//请求接口
		method: 'post',//请求方式
		data
	})
}
