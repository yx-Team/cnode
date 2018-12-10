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
// 主题收藏
export function collect (data){
	return fetch({
		url:cnode+'/api/v1//topic_collect/collect',
		method:'POST',
		data
	})
}
// 主题取消收藏
export function deCollect (data){
	return fetch({
		url:cnode+'/api/v1/topic_collect/de_collect',
		method:'POST',
		data
	})
}
// 评论点赞
// /reply/:reply_id/ups
export function replyUps (reply_id,data={}){
	return fetch({
		url:cnode+'/api/v1/reply/'+reply_id+'/ups',
		method:'POST',
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
