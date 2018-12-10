<template>
	<view class="page-detail">
		<!-- fixed -->
		<view class="fixed-tools">
			<view class="fixed-tools__reply">
				<view class="iconfont icon-edit"></view>
				写评论
			</view>
			<view class="r-icon iconfont icon-liuyan-o" @click="goReply">
				<text class="badge" v-if="detail.reply_count">{{detail.reply_count}}</text>
			</view>
			<view class="r-icon iconfont icon-staro" v-if="!detail.is_collect" @click="collect"></view>
			<view class="r-icon iconfont icon-star  is-active" v-if="detail.is_collect" @click="de_collect"></view>
			<!-- #ifndef H5 -->
			<view class="r-icon iconfont icon-sharealt" @click="share"></view>
			<!-- #endif -->
			
		</view>
		<!-- container -->
		<view class="page-detail__container">
			<view id="page-detail__container">
				<view class="page-detail__hd">
					<view class="page-detail__title">
						{{detail.title}}
					</view>
					<view class="page-detail__hfooter">
						<view class="left">
							<view class="author" v-if="detail.author">{{detail.author.loginname}} </view>
							<view class="time">{{detail.create_at}}</view>
						</view>
						<view class="see">
							<view class="iconfont icon-eye"></view>{{detail.visit_count}}
						</view>
					</view>
				</view>
				<view class="page-detail__content">
					<wxParse v-if="detail.content" :content="detail.content" @preview="preview" @navigate="navigate" />
				</view>
			</view>
			<view class="i-whitespace"></view>
			<!-- 评论 -->
			<reply-list :list-data="detail.replies" :count="detail.reply_count"></reply-list>
			
		</view>
	</view>
</template>

<script>
	import {topic,collect,deCollect} from '@/common/interface.js';
	import {formateTime} from '@/lib/dayjs.js'
	import marked from '@/components/marked'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import iAbnor from '@/components/i-abnor.vue'
	import replyList from '@/business/reply-list.vue'
	export default {
		components:{
			wxParse,
			iAbnor,
			replyList
		},
		data() {
			return {
				detail:{},
				topic_id:''
			};
		},
		onLoad(e) {
			let id = e.id;
			this.topic_id=e.id
			let self = this;
			uni.showLoading({
				title:'加载中'
			})
			topic(id,{mdrender:false,accesstoken:this.$store.state.accessToken}).then(res=>{
				self.detail=res.data.data;
				self.detail.content=marked(self.detail.content);
				self.detail.create_at=formateTime(self.detail.create_at)
				self.detail.replies.map(item=>{
					item.content=marked(item.content);
					item.is_author=self.detail.author.loginname===item.author.loginname?'作者':false;
					item.create_at=formateTime(item.create_at)
					return item;
				})
				self.$nextTick(function(){
					uni.hideLoading()
				})
				
			})
		},
		methods:{
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			},
			// 跳到评论列表
			goReply(){
				let view = uni.createSelectorQuery().select("#page-detail__container");
				view.boundingClientRect(data => {
				  let height=data.height;
				  uni.pageScrollTo({
				  	scrollTop:height,
					duration:100
				  })
				}).exec();
			},
			// 收藏
			collect(){
				var self = this;
				if(this.$store.state.accessToken){
					collect({topic_id:this.topic_id}).then(res=>{
						if(res.data.success){
							uni.showToast({
								title:'收藏成功',
								icon:'none'
							})
							self.detail.is_collect=true
						}else{
							self.detail.is_collect=true
						}
						
					})
				}else{
					uni.showModal({
						title: '提示',
						content:'收藏失败，您还没有登录',
						confirmText:'去登录',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url:'/pages/login/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
							
						}
					})
				}
			},
			// 取消
			de_collect(){
				var self = this;
				deCollect({topic_id:this.topic_id}).then(res=>{
					if(res.data.success){
						uni.showToast({
							title:'取消收藏成功',
							icon:'none'
						})
						self.detail.is_collect=false
					}
					
				})
			},
			// 分享
			share(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href:'http://192.168.2.139:8080/#/pages/detail/detail?id='+this.topic_id,
					title: "uni-app分享",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				
			}
		}
	}
</script>

<style lang="less">
@import '../../components/mpvue-wxparse/src/wxParse.css';
.page-detail{
	background: #fff;
	&__hd{
		position: relative;
		padding-bottom: 40upx;
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
	&__title{
		font-size: 36upx;
		color: #373737;
		padding: 20upx 30upx;
	}
	&__hfooter{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 30upx;
		.left{
			display:flex;
			align-items: center;
		}
		.author{
			font-size: 26upx;
			color: #457bbe;
			padding-right: 20upx;
		}
		.time{
			font-size: 24upx;
			color: #9e9e9e;
		}
		.see{
			display: flex;
			align-items: center;
			font-size: 22upx;
			color: #c5c5c5;
			.iconfont{
				margin-right: 10upx;
			}
		}
	}
	&__content{
		padding: 20upx 30upx;
		box-sizing: border-box;
		.wxParse{
			overflow: hidden;
		}
	}
}

.fixed-tools{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9;
	display: flex;
	align-items: center;
	height: 100upx;
	background-color: #fff;
	box-shadow: 0 0 10upx rgba(0,0,0,0.2);
	&__reply{
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		margin: 0 30upx;
		height: 68upx;
		border-radius: 34upx;
		background-color: #ffffff;
		border: solid 1px #cbcbcb;
	}
	.r-icon {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 68upx;
		height: 68upx;
		border-radius: 50%;
		margin-right: 30upx;
		background-color: #f8f8f8;
		border: solid 1px #d0d0d0;
		.badge{
			position: absolute;
			right: 0;
			top: -12upx;
			display: block;
			padding: 0 10upx;
			height: 24upx;
			background-color: #e32e20;
			font-size: 20upx;
			line-height: 1.5;
			color: #ffffff;
			border-radius: 24upx;
			transform: translateX(50%);
		}
	}
	.is-active{
		color:rgb(69, 123, 190);
	}
	&~.page-detail__container{
		padding-bottom: 120upx;
	}
}
</style>
