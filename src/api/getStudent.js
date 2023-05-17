import request from '../request.js'
//学生表的增删改查
//新增
export function add(data){
	return request({
		url: '/student/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteById(data){
	return request({
		url: '/student/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function update(data){
	return request({
		url: '/student/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryById(data){
	return request({
		url: '/student/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}
//根据课程id 进行三表联查，
export function querybycourseid(data){
	return request({
		url: '/student/querybycourseid',//请求接口
		method: 'post',//请求方式
		data
	})
}

//条件查询
export function querybycondition(data){
	return request({
		url: '/student/querybycondition',//请求接口
		method: 'post',//请求方式
		data
	})
}

//学生评分界面，获取到除自己外的所有小组成员
export function queryinscore(data){
	return request({
		url: '/student/queryinscore',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryteam(data){
	return request({
		url: '/student/queryteam',//请求接口
		method: 'post',//请求方式
		data
	})
}
