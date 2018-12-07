<template>
	<view class="i-abnor" :style="{height:height}">
		<image class="i-abnor__thumb" :src="thumb" :style="thumbStyle"></image>
		<view class="i-abnor__text" :style="textStyle">{{text}}</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			height:{
				type:String,
				default:''
			},
			thumb:{
				type:String,
				default:'今天没有新消息哟！'
			},
			thumbStyle:{
				type:String,
				default:'width:280upx;height:220upx'
			},
			text:{
				type:String,
				default:'今天没有新消息哟！'
			},
			textStyle:{
				type:String,
				default:''
			},
		}
	}
</script>

<style lang="less">
	.i-abnor{
		height: 380upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&__thumb{
			display: block;
			margin-bottom: 30upx;
		}
		&__text{
			color: #999999;
			font-size: 24upx;
		}
	}

</style>
