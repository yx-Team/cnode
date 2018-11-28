<template>
	<view class="page-login">
		<view class="page-login__logo">
			<image src="../../static/images/logo.png" mode=""></image>
		</view>
		<view class="page-login__form">
			<view class="page-login__input">
				<input type="text" @input="bindKeyInput" placeholder="请输入Access Token" focus />
			</view>
			<button class="page-login__btn" @click="login">登录</button>
		</view>
		<view class="page-login__footer">
			<text>CNode 社区为国内最专业的 Node.js 开源技术社区</text>
			<text>致力于 Node.js 的技术研究</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:''
			};
		},
		onLoad() {
			
			uni.getStorage({
				key:'accessToken',
				success(res) {
					uni.navigateBack({
						delta: 1
					});
				}
			})
		},
		methods:{
			login(){
				if(this.inputValue.trim()){
					this.$store.dispatch('getUserInfo',this.inputValue)
				}else{
					uni.showToast({
						title:'access token不能为空',
						icon:'none'
					})
				}
			},
			bindKeyInput: function (e) {
				this.inputValue = e.target.value
			}
		}
	}
</script>

<style lang="less">
	.page-login{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: #457bbe;
		padding-top: 282upx;
		&__logo{
			width: 252upx;
			height: 58upx;
			margin: 0 auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		&__form{
			padding-top: 60upx;
		}
		&__input{
			width: 500upx;
			height: 76upx;
			line-height: 76upx;
			border-radius:76upx;
			text-align: center;
			background-color: #ffffff;
			margin: 0 auto;
			input{
				height: 76upx;
				line-height: 76upx;
				font-size: 34upx;
			}
		}
		&__btn{
			width: 500upx;
			height: 76upx;
			margin-top: 36upx;
			line-height: 76upx;
			border-radius:76upx;
			color: #fff;
			font-size: 34upx;
			background-color: #15539f;
		}
		&__footer{
			position: absolute;
			left: 30upx;
			bottom: 30upx;
			right: 30upx;
			font-size: 24upx;
			color: rgba(255,255,255,0.8);
			text{
				display: block;
				text-align: center;
			}
		}
	}
</style>
