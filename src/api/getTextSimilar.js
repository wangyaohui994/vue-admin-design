import request from '../request.js'
//表的增删改查
//新增
export function textCompare(data){
	return request({
		url: '/text/compare',//请求接口
		method: 'post',//请求方式
		data
	})
}