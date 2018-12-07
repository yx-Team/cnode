<template>
	<view class="page-detail">
		<view>
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
				<!-- {{detail.content}} -->
				<wxParse v-if="detail.content" :content="detail.content" @preview="preview" @navigate="navigate" />
			</view>
			<view class="i-whitespace"></view>
			<view class="reply">
				<view class="reply__title">全部评论（{{detail.reply_count}}）</view>
				<view class="reply-list">
					<view class="reply-list__item" v-if="detail.replies" v-for="(item,index) in  detail.replies" :key="index">
						<view class="reply-list__thumb">
							<image :src="item.author.avatar_url"></image>
						</view>
						<view class="reply-list__info">
							<view class="loginname">{{item.author.loginname}} <text class="is-author" v-if="item.is_author">{{item.is_author}}</text></view>
							<view class="floor">第{{index+1}}楼 {{item.create_at}}</view>
							<view class="content"><!-- {{item.content}} --><wxParse v-if="item.content" :content="item.content" @preview="preview" @navigate="navigate" /></view>
							<view class="tools">
								<view class="like"><view class="iconfont icon-like"></view><text v-if="item.ups.length">{{item.ups.length}}</text></view>
								<view class="comment"><view class="iconfont icon-liuyan-o"></view></view>
							</view>
						</view>
					</view>
					<i-abnor v-if="detail.replies && !detail.replies.length" thumb="../../static/images/abnor.png" thumbStyle="width:238upx;height:188upx" text="暂无评论"></i-abnor>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {topic} from '@/common/interface.js';
	import {formateTime} from '@/lib/dayjs.js'
	import marked from '@/components/marked'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import iAbnor from '@/components/i-abnor.vue'
	export default {
		components:{
			wxParse,
			iAbnor
		},
		data() {
			return {
// 				author:{},
// 				author_id:'',
// 				content:'',
// 				create_at:'',
// 				id:'',
// 				is_collect:false,
// 				last_reply_at:'',
// 				replies:{},
// 				reply_count:0,
// 				tab:'',
// 				title:"",
// 				top:'',
// 				visit_count:0
				detail:{}
			};
		},
		onLoad(e) {
			let id = e.id;
			let self = this;
			uni.showLoading({
				title:'加载中'
			})
			topic(id,{mdrender:false}).then(res=>{
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
// 			uni.request({
// 				url:interfaces.topic+'/'+id,
// 				data:{
// 					mdrender:false,
// 					accesstoken:self.$store.state.accessToken
// 				},
// 				success(res) {
// 					self.detail=res.data.data;
// 					self.detail.content=marked(self.detail.content);
// 					self.detail.create_at=formateTime(self.detail.create_at)
// 					self.detail.replies.map(item=>{
// 						item.content=marked(item.content);
// 						item.is_author=self.detail.author.loginname===item.author.loginname?'作者':false;
// 						item.create_at=formateTime(item.create_at)
// 						return item;
// 					})
// 					uni.hideLoading()
// 					console.log(res);
// 				}
// 			})
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
					padding-right: 70upx;
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
