import Vue from 'vue'
import Vuex from 'vuex'
import {accesstoken} from '@/common/interface.js'
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
		getUserInfo({commit,state},payload) {
			let {accessToken,callback} = payload
			
			accesstoken({'accesstoken': accessToken}).then(res=>{
				if(res.statusCode===200 && res.data.success){
					commit('SET_USER_INFO',res.data)
					commit('SET_ACCESS_TOKEN',accessToken)
					commit('SET_LOGIN',true)
					uni.setStorage({
						key:'accessToken',
						data:accessToken,
						success() {
							if(callback){
								callback()
							}
						}
					})
					
				}else{
					uni.showToast({
						title:res.data.error_msg,
						icon:'none'
					})
				}
			})
		},
		checkLogin({commit,dispatch}){
			uni.getStorage({
				key:'accessToken',
				success(res) {
					console.log(res);
					dispatch('getUserInfo',{accessToken:res.data})
				},
				fail() {
					console.log('获取token失败')
				}
			})
		},
		// 注销
		logout({commit}){
			console.log('注销')
			commit('SET_USER_INFO',{})
			commit('SET_ACCESS_TOKEN','')
			commit('SET_LOGIN',false)
			uni.clearStorage()
		}
	}
})

export default store
