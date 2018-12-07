import fetch from './fetch.js'

const cnode = 'https://cnodejs.org';
// 主题首页
export function topics(data){
	
	return fetch({
		url:cnode+'/api/v1/topics',
		method:'GET',
		data
	})
}
// 主题详情
export function topic(id,data){
	return fetch({
		url:cnode+'/api/v1/topic/'+id,
		method:'GET',
		data
	})
}
// 验证 accessToken 的正确性
export function accesstoken(data){
	return fetch({
		url:cnode+'/api/v1/accesstoken',
		method:'POST',
		data
	})
}
