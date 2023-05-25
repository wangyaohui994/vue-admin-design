import request from '../request.js'
//课程表的增删改查
//新增
export function addApplication(data){
	return request({
		url: '/application/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteByIdApplication(data){
	return request({
		url: '/application/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function deleteByrIdApplication(data){
	return request({
		url: '/application/deleteByrId',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function updateApplication(data){
	return request({
		url: '/application/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByIdApplication(data){
	return request({
		url: '/application/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}


//通过招募信息id获取招募数据
export function queryByRidApplication(data){
	return request({
		url: '/application/querybyrid',//请求接口
		method: 'post',//请求方式
		data
	})
}
//通过招募信息id获取招募数据和学生数据
export function queryByRSidApplication(data){
	return request({
		url: '/application/querybyrsid',//请求接口
		method: 'post',//请求方式
		data
	})
}
