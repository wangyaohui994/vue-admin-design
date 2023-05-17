import request from '../request.js'
import service from '../request.js'
import {
	getToken
} from '@/utils/cookie'
import axios from 'axios'
import base from '@/utils/base64'

//文件表的增删改查
//新增
export function add(data) {
	return request({
		url: '/file/add', //请求接口
		method: 'post', //请求方式
		data
	})
}
export function deleteById(data) {
	return request({
		url: '/file/deleteById', //请求接口
		method: 'post', //请求方式
		data
	})
}
export function update(data) {
	return request({
		url: '/file/update', //请求接口
		method: 'post', //请求方式
		data
	})
}

export function queryById(data) {
	return request({
		url: '/file/querybyid', //请求接口
		method: 'post', //请求方式
		data
	})
}

export function upload(data) {
	return request({
		url: '/file/upload', //请求接口
		method: 'post', //请求方式
		data
	})
}

export function downloadFile(data) {
	return request({
		url: '/file/downloadFile', //请求接口
		method: 'post', //请求方式
		data
	})
}

//文件下载请求
export function download(data) {
	return service.post(
		'/file/downloadFile', data, {
			headers: {
				'Content-Type': 'application/json',
			},

			//这边响应类型要使用arraybuffer，否则显示是白屏没有内容
			responseType: 'blob',
		})
}

//文件下载
export function exportLogData(data, scoperow) {
	axios({
		method: 'post',
		url: "http://localhost:8080" + '/file/downloadFile',
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


//文件展示
export function showData(data, scoperow) {
	axios({
		method: 'post',
		url: "http://localhost:8080" + '/file/downloadFile',
		responseType: 'arraybuffer',
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
				type: 'application/pdf'
			}, )
			console.log(blob)
			const link = document.createElement('a');
			link.download = scoperow.fileName;
			link.style.display = 'none';
			link.href = URL.createObjectURL(blob); 
			console.log(data)
			
			//要预览文件的访问地址
			var urll = 'http://127.0.0.1:8080/SystemData/' + data.courseId + '/' + data.fileName; 
			var Base64 = new base();
			
			window.open('http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(urll)));
			
		}
	}).catch(error => {
		console.log(error)
	})
}
