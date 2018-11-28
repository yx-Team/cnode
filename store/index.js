import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false,
		accessToken: "",
		userInfo:{}
	},
	mutations: {
		SET_LOGIN(state,payload){
			state.isLogin=payload
		},
		SET_ACCESS_TOKEN(state,payload){
			state.accessToken=payload
		},
		SET_USER_INFO(state,payload){
			state.userInfo = payload
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo({commit,state},accessToken) {
			console.log(accessToken);
			uni.request({
				method: 'POST',
				url: 'https://cnodejs.org/api/v1/accesstoken',
				data: {
					'accesstoken': accessToken
				},
				success(res) {
					
					if(res.statusCode===200 && res.data.success){
						commit('SET_USER_INFO',res.data)
						commit('SET_ACCESS_TOKEN',accessToken)
						commit('SET_LOGIN',true)
						uni.setStorage({
							key:'accessToken',
							data:accessToken
						})
						uni.switchTab({
							url:'/pages/me/index'
						})
					}else{
						uni.showToast({
							title:res.data.error_msg,
							icon:'none'
						})
					}
				}
			})
		},
	}
})

export default store
