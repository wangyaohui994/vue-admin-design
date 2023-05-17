import request from '../request.js'


export function userLogin(data){
	return request({
		url: '/teacher',//请求接口
		method: 'post',//请求方式
		data
	})
}
//获取teacher
export function get(data){
	return request({
		url: '/teacher/id',//请求接口
		method: 'get',//请求方式
		data
	})
}

export function updateTeacher(data){
	return request({
		url: '/teacher/update',//请求接口
		method: 'post',//请求方式
		data
	})
}