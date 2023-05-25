import request from '../request.js'
//表的增删改查
//新增
export function addTeamStudent(data){
	return request({
		url: '/teamStudent/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdTeamStudent(data){
	return request({
		url: '/teamStudent/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function deleteBytsIdTeamStudent(data){
	return request({
		url: '/teamStudent/deleteBytsId',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function update(data){
	return request({
		url: '/teamStudent/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByteamId(data){
	return request({
		url: '/teamStudent/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryCidSid(data){
	return request({
		url: '/teamStudent/queryCidSid',//请求接口
		method: 'post',//请求方式
		data
	})
}

