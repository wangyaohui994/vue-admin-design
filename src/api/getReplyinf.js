import request from '../request.js'
//replyinf表的增删改查
//新增
export function add(data){
	return request({
		url: '/replyinf/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteById(data){
	return request({
		url: '/replyinf/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function update(data){
	return request({
		url: '/replyinf/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryById(data){
	return request({
		url: '/replyinf/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}
