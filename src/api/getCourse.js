import request from '../request.js'
//课程表的增删改查
//新增
export function add(data){
	return request({
		url: '/course/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteById(data){
	return request({
		url: '/course/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function update(data){
	return request({
		url: '/course/update',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据teacherId获取course
export function queryById(data){
	return request({
		url: '/course/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}


//根据学生id获取course
export function querybystudentid(data){
	return request({
		url: '/course/querybystudentid',//请求接口
		method: 'post',//请求方式
		data
	})
}