import Vue from 'vue';
import store from '../store/index.js'
const cnode = 'https://cnodejs.org';

export default function(config){
	let {url,data,method} = config
	data = data?data:{};
	method = method?method:'GET';
	let accesstoken = store.state.accessToken ? store.state.accessToken : 'noToken'
	let params = {
		accesstoken: accesstoken
	}
	if(method==='POST'){
		data = Object.assign(params,data)
	}
	console.log(data);
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method,
			data,
			success(res) {
				resolve(res)
			},
			fail(res) {
				console.log(res);
				reject(res);
				uni.showToast({
					title: '服务器出错了~~~'
				})
			}
			
		})
	})
}

