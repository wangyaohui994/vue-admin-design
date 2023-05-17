import axios from 'axios'
import {
	Message
} from 'element-ui'
import {
	getToken
} from './utils/cookie'
const URL = "http://localhost:8080"
// 创建axios实例
const service = axios.create({
	baseURL: URL, // api 的 base_url
	timeout: 120000, // 请求超时时间
	withCredentials: true,
	crossDomain: true
})

// request拦截器设置
service.interceptors.request.use(
	config => {
		// if (getToken()) {
		//   config.headers['Authorization'] = 'Bearer ' + getToken() // 请求头设置自带 token
		// }
		// config.headers['Content-Type'] = 'application/json' // 请求的数据格式为 json
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
)

// response 拦截器设置
// service.interceptors.response.use(
//   response => {
//     const data = response.data
//     const code = data.code
//     const message = data.msg
//     if (code === 0) {
//       return data.data
//     } else {
//       Message({
//         type: 'error',
//         message
//       })
//       return Promise.reject('error')
//     }
//   },
//   error => {
//     const code = error.response.data.status
//     if (!code) {
//       Message({
//         type: 'error',
//         message: '接口请求失败'
//       })
//     }
//     return Promise.reject(error)
//   }
// )
service.interceptors.response.use(
	response => {
		// console.log(response)
		if (response.data) { //服务器返回了数据
			if (response.data.code == 200) {
				//服务器返回了正确的数据
				console.log(response.data);
				return response.data;
			} else if (response.data.code == -2) {
				//登录失效, 跳转到登录页面
				// Router.push({name : "login",query: {message: "登录失效"}});

				return false;
			} else {
				Message({
					message: response.data.message,
					type: "error"
				})
			}
		}
		return -1;
	},
	error => {
		console.log("错误")
		return Promise.reject(error)
	}
)


export default service
