import request from '../request.js'


//根据课程id获取该课程中所有student_id
export function get(data){
	return request({
		url: '/courseStudent/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function addCS(data){
	return request({
		url: '/courseStudent/add',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function deleteByidCS(data){
	return request({
		url: '/courseStudent/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}