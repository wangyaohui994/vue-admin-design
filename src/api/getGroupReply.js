import request from '../request.js'
//表的增删改查
//新增
export function addGroupReply(data){
	return request({
		url: '/groupreply/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdGroupReply(data){
	return request({
		url: '/groupreply/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function deleteBytIdGroupReply(data){
	return request({
		url: '/groupreply/deleteBytId',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function updateGroupReply(data){
	return request({
		url: '/groupreply/update',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据teacherId获取course
export function queryByIdGroupReply(data){
	return request({
		url: '/groupreply/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}
