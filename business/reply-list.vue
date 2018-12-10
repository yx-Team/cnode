<template>
	<view class="reply">
		<view class="reply__title">全部评论（{{count}}）</view>
		<view class="reply-list">
			<view class="reply-list__item" v-if="list" v-for="(item,index) in list" :key="index">
				<view class="reply-list__thumb">
					<image :src="item.author.avatar_url"></image>
				</view>
				<view class="reply-list__info">
					<view class="loginname">{{item.author.loginname}} <text class="is-author" v-if="item.is_author">{{item.is_author}}</text></view>
					<view class="floor">第{{index+1}}楼 {{item.create_at}}</view>
					<view class="content"><!-- {{item.content}} --><wxParse v-if="item.content" :content="item.content" @preview="preview" @navigate="navigate" /></view>
					<view class="tools">
						<view class="like" :class="{'is-active':item.is_uped}" @click="like(item,index)"><view class="iconfont icon-like" ></view><text v-if="item.ups.length">{{item.ups.length}}</text></view>
						<view class="comment"><view class="iconfont icon-liuyan-o"></view></view>
					</view>
				</view>
			</view>
			<i-abnor v-if="list && !list.length" thumb="../../static/images/abnor.png" thumbStyle="width:238upx;height:188upx" text="暂无评论"></i-abnor>
		</view>
	</view>
</template>
<script>
	import {replyUps} from '@/common/interface.js';
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import iAbnor from '@/components/i-abnor.vue'
	export default {
		name:'reply-list',
		props:{
			count:{
				type:Number,
				default:0
			},
			listData:{
				type:Array,
				default:function(){
					return [];
				}
			}
		},
		data(){
			return{
				list:[]
			}
		},
		watch:{
			listData(val){
				this.list=this.listData
			}
		},
		mounted() {
			
		},
		components:{
			wxParse,
			iAbnor
		},
		methods:{
			like(item,index){
				var self = this;
				replyUps(item.id).then(res=>{
					if(res.data.action==='down' && res.data.success){
						self.list[index].is_uped=false
						self.list[index].ups.pop()
					}
					if(res.data.action==='up' && res.data.success){
						self.list[index].is_uped=true
						self.list[index].ups.push('1')
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.reply{
		&__title{
			position: relative;
			display: flex;
			align-items: center;
			height: 80upx;
			padding-left: 30upx;
			&:after{
				content: '';
				position: absolute;
				left: 30upx;
				right: 0;
				bottom: 0;
				height: 1px;
				background-color: #e8e8e8;
			}
		}
		&-list{
			&__item{
				display: flex;
				padding-left: 30upx;
				padding-top: 30upx;
			}
			&__thumb{
				width: 70upx;
				height: 70upx;
				margin-right: 25upx;
				background-color: #000000;
				border: solid 1px #c8c8c8;
				overflow: hidden;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			&__info{
				position: relative;
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				padding-right: 30rpx;
				padding-bottom: 30upx;
				&:after{
					content: '';
					position: absolute;
					left:0;
					right: 0;
					bottom: 0;
					height: 1px;
					background-color: #e8e8e8;
				}
				.loginname{
					font-size: 28upx;
					color: #373737;
				}
				.is-author{
					display: inline-block;
					padding: 0upx 10upx;
					background-color: #86cdff;
					border-radius: 8upx;
					font-size: 18upx;
					color: #ffffff;
				}
				.floor{
					font-size: 24upx;
					color: #9e9e9e;
				}
				.content{
					font-size: 28upx;
					box-sizing: border-box;
					overflow: hidden;
					color: #373737;
				}
				.tools{
					display: flex;
					align-items:center;
					justify-content: flex-end;
					.like{
						width: 120upx;
						.iconfont{
							padding-right: 10upx;
						}
						&.is-active{
							.iconfont{
								color:rgb(69, 123, 190);
							}
							text{
								color:rgb(69, 123, 190);
							}
						}
					}
					.like,.comment{
						display: flex;
						align-items:center;
					}
					.iconfont{
						color: #9e9e9e;
					}
					text{
						font-size: 24upx;
						
						color: #9e9e9e;
					}
				}
			}
		}
		
	}
</style>