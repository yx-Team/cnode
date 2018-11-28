<template>
	<view class="i-cell" hover-class="i-cell--hover" @click="handle">
		<view class="i-cell__left">
			<view class="i-cell__icon" :class="icon" :style="{color:iconColor}"></view>
			<view class="i-cell__text"><slot></slot></view>
		</view>
		<view class="i-cell__right">
			<view class="i-cell__value">{{value}}</view>
			<view class="i-cell__arrow iconfont" v-if="arrow">&#xe604;</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'i-cell',
		props:{
			icon:String,
			iconColor:{
				type:String,
				default:'#333'
			},
			value:String,
			arrow:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			handle(){
				this.$emit('click')
			}
		}
	}
</script>
