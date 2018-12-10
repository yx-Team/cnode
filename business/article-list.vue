<template>
<view class="article-list">	
	<view class="article-list__item" :class="{'is-default':item.default}" hover-class="is-hover" v-for="(item,index) in data" :key="index" @click="toDetail(item.id)">
		<view class="article-list__userinfo">
			<view class="article-list__userinfo--left">
				<view class="article-list__avatar"><image :src="item.author.avatar_url" ></image></view>
				<view class="article-list__username">{{item.author.loginname}}</view>
			</view>
			<view class="article-list__time">{{item.create_at}}</view>
		</view>
		<view class="article-list__title i-ellipsis-2"><text v-if="item.top">【置顶】</text><text v-if="item.good">【精华】</text>{{item.title}}</view>
		<view class="article-list__desc i-ellipsis-2">{{item.content}}</view>
		<view class="article-list__footer">
			<view class="article-list__label" :class="item.tab">{{item.label}}</view>
			<view class="article-list__fnum"><view class="iconfont icon-eye"></view>{{item.visit_count}}</view>
			<view class="article-list__fnum"><view class="iconfont icon-pinglun"></view>{{item.reply_count}}</view>
		</view>
	</view>
</view>	
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: function(){
				return [
					{
						id: '01',
						author_id: '01',
						tab: 'ask',
						content:'',
						title: '',
						last_reply_at: '2018-12-05T02:22:22.204Z',
						good: false,
						top: false,
						reply_count: 1,
						visit_count: 235,
						create_at: '1小时前',
						author: {
							loginname: '',
							avatar_url: ''
						},
						default:true
					},
					{
						id: '02',
						author_id: '02',
						tab: 'ask',
						content:'',
						title: '',
						last_reply_at: '2018-12-05T02:22:22.204Z',
						good: false,
						top: false,
						reply_count: 1,
						visit_count: 235,
						create_at: '2小时前',
						author: {
							loginname: '',
							avatar_url: ''
						},
						default:true
					},{
						id: '03',
						author_id: '03',
						tab: 'ask',
						content:'',
						title: '',
						last_reply_at: '2018-12-05T02:22:22.204Z',
						good: false,
						top: false,
						reply_count: 1,
						visit_count: 235,
						create_at: '3小时前',
						author: {
							loginname: '',
							avatar_url: ''
						},
						default:true
					},{
						id: '04',
						author_id: '04',
						tab: 'ask',
						content:'',
						title: '',
						last_reply_at: '2018-12-05T02:22:22.204Z',
						good: false,
						top: false,
						reply_count: 1,
						visit_count: 235,
						create_at: '4小时前',
						author: {
							loginname: '',
							avatar_url: ''
						},
						default:true
					}
				]
			}
        }
    },
	methods: {
		toDetail(id) {
				uni.navigateTo({
						url: '/pages/detail/detail?id=' + id
				});
		}
	},

};
</script>

<style lang="less">
	.article-list {
	    background: #fff;
	    &__item {
	        position: relative;
	        padding: 20upx 30upx 30upx 30upx;
			background: #fff;
			&.is-default{
				.article-list__avatar{
					background-color: #eee;
				}
				.article-list__username{
					position: relative;
					height: 40upx;
					&:after{
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 150upx;
						height: 40upx;
						background: #eee;
					}
				}
				.article-list__title{
					height: 60upx;
					position: relative;
					&:after{
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						height: 40upx;
						background: #eee;
					}
				}
				.article-list__desc{
					height: 70upx;
					position: relative;
					&:before{
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						height: 25upx;
						background: #eee;
					}
					&:after{
						content: '';
						position: absolute;
						left: 0;
						bottom: 0;
						right: 0;
						height: 25upx;
						background: #eee;
					}
				}
				.ask{
					background-color: #eee;
				}
				.article-list__fnum{
					color: #eee;
				}
				.article-list__time{
					color: #eee;
				}
			}
	        &.is-hover {
	            background: #f8f8f8;
	        }
	        &:after {
	            content: '';
	            position: absolute;
	            left: 0;
	            right: 0;
	            bottom: 0;
	            height: 1px;
	            background: #eee;
	            transform: scaleY(0.5);
	        }
	    }
	    &__userinfo {
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        height: 40upx;
	        font-size: 30upx;
	        color: #545454;
	        &--left {
	            display: flex;
	            align-items: center;
	            height: 40upx;
	        }
	    }
	    &__avatar {
	        width: 40upx;
	        height: 40upx;
	        border-radius: 50%;
	        overflow: hidden;
	        background-color: #a1e6f7;
	        margin-right: 20upx;
	        image {
	            display: block;
	            width: 100%;
	            height: 100%;
	        }
	    }
	    &__time {
	        color: #c5c5c5;
	    }
	    &__title {
	        font-size: 30upx;
	        margin-top: 25upx;
	        margin-bottom: 18upx;
	        color: #333333;
	    }
	    &__desc {
	        font-size: 24upx;
	        line-height: 36upx;
	        color: #a2a2a2;
	    }
	    &__footer {
	        position: relative;
	        display: flex;
	        height: 28upx;
	        padding-top: 20upx;
	        margin-top: 28upx;
	        &:after {
	            position: absolute;
	            left: 0;
	            top: 0;
	            content: '';
	            width: 50upx;
	            height: 1px;
	            background: #d6d9e1;
	        }
	    }
	    &__label {
	        width: 60upx;
	        height: 32upx;
	        line-height: 32upx;
	        background-color: #49caca;
	        border-radius: 8upx;
	        font-size: 18upx;
					line-height: 1.8;
	        text-align: center;
	        color: #ffffff;
	        &.good {
	            background-color: #49caca;
	        }
	        &.share {
	            background-color: #ff9900;
	        }
	        &.ask {
	            background-color: #86cdff;
	        }
	        &.job {
	            background-color: #49caca;
	        }
			&.dev {
				background-color: #1aa034;
			}
	    }
	    &__fnum {
	        display: flex;
	        height: 28upx;
	        align-items: center;
	        font-size: 22upx;
	        color: #c5c5c5;
	        padding-left: 20upx;
	        .iconfont {
	            margin-right: 8upx;
	        }
	    }
	}
</style>
