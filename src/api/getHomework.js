import request from '../request.js'
//招募表的增删改查
//新增
export function add(data){
	return request({
		url: '/homework/add',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function deleteById(data){
	return request({
		url: '/homework/deleteById',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function update(data){
	return request({
		url: '/homework/update',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryById(data){
	return request({
		url: '/homework/querybyid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function queryByHId(data){
	return request({
		url: '/homework/querybyhid',//请求接口
		method: 'post',//请求方式
		data
	})
}

export function upload(data) {
	return request({
		url: '/homework/upload', //请求接口
		method: 'post', //请求方式
		data
	})
}

export function exportLogData(data, scoperow) {
	axios({
		method: 'post',
		url: "http://localhost:8080" + '/homework/downloadFile',
		responseType: 'blob',
		data,
		headers: {
			'Access-Control-Allow-origin': '*',
			'Content-Type': 'application/json; charset=UTF-8',
			'Token': JSON.stringify(getToken())
		}
	}).then((res) => {
		if (res && res.status === 200) {
			const content = res.data
			console.log(res.data)
			// console.log(JSON.parse(res.datas).fileName)
			let blob = new Blob([res.data], {
				type: 'application/octet-strem'
			}, )
			console.log(blob)
			const link = document.createElement('a');
			link.download = scoperow.fileName;
			link.style.display = 'none';
			link.href = URL.createObjectURL(blob);
			console.log('ee', link.href);
			document.body.appendChild(link);
			link.click();
			URL.revokeObjectURL(link.href); // 释放URL 对象
			document.body.removeChild(link);
		}
	}).catch(error => {
		console.log(error)
	})
}