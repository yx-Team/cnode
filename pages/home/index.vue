<template>
    <view class="page-home">
		<!-- tab -->
		<!-- #ifdef H5 -->
		<scroll-view class="page-home-vscroll fixed-top" :scroll-x="true">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<scroll-view class="page-home-vscroll" :scroll-x="true">
		<!-- #endif -->
		
			<view class="page-home-vscroll__item" 
				:class="{'is-active':tabIndex===index}" 
				v-for="(item,index) in tabBars" 
				:key="index"
				@click="tabHandle(index)"
				>
				<view class="page-home-vscroll__text">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- cell -->
       <!-- <i-cell-group>
			<i-cell :arrow="false">为您推荐</i-cell>
		</i-cell-group> -->
		<!-- list -->
		<view class="article-list">
			<!-- <view class="article-list__item" hover-class="is-hover">
				<view class="article-list__userinfo">
					<view class="article-list__userinfo--left">
						<view class="article-list__avatar"><image src="../../static/logo.png" ></image></view>
						<view class="article-list__username">Mr.xasd</view>
					</view>
					<view class="article-list__time">1小时前</view>
				</view>
				<view class="article-list__title i-ellipsis">Egg 2.0 正式发布，性能提升 30%，拥抱 Async,更加规范，更加快速</view>
				<view class="article-list__desc i-ellipsis-2">Egg 是阿里 Node.js 的核心基础框架，面向『企业级的 Web 基础框架』这个领域，提供了「微内核 + 插件机制 + 框架定制能力」，完美达成生态共建和差异化定制的平衡点。</view>
				<view class="article-list__footer">
					<view class="article-list__label good">精华</view>
					<view class="article-list__fnum"><view class="iconfont icon-eye"></view>326</view>
					<view class="article-list__fnum"><view class="iconfont icon-pinglun"></view>326</view>
				</view>
			</view> -->
			<view class="article-list__item" hover-class="is-hover" v-for="(item,index) in currentData" :key="index">
				<view class="article-list__userinfo">
					<view class="article-list__userinfo--left">
						<view class="article-list__avatar"><image :src="item.author.avatar_url" ></image></view>
						<view class="article-list__username">{{item.author.loginname}}</view>
					</view>
					<view class="article-list__time">{{item.create_at}}</view>
				</view>
				<view class="article-list__title i-ellipsis">{{item.title}}</view>
				<view class="article-list__desc i-ellipsis-2">{{item.content}}</view>
				<view class="article-list__footer">
					<view class="article-list__label" :class="item.tab">分享</view>
					<view class="article-list__fnum"><view class="iconfont icon-eye"></view>{{item.visit_count}}</view>
					<view class="article-list__fnum"><view class="iconfont icon-pinglun"></view>{{item.reply_count}}</view>
				</view>
			</view>
		</view>
		<load-more :loading-type="loadingType" :content-text="loadingText"></load-more>
    </view>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' 
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
import {interfaces} from '@/common/api.js'
import iCellGroup from '@/components/i-cell-group.vue';
import iCell from '@/components/i-cell.vue';
import loadMore from '@/components/uni-load-more.vue'
export default {
    components: {
        iCellGroup,
        iCell,
		loadMore
    },
    data() {
        return {
			loadingType:0,
            loadingText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            },
			tabIndex:0,
            tabBars: [
                {
                    name: '全部',
                    id: 'all'
                },
                {
                    name: '精华',
                    id: 'good'
                },
                {
                    name: '分享',
                    id: 'share'
                },
                {
                    name: '问答',
                    id: 'ask'
                },
                {
                    name: '招聘',
                    id: 'job'
                },
                {
                    name: '测试',
                    id: 'dev'
                }
            ],
			list:[
				{
					id:'all',
					label:'全部',
					top:0,
					data:[]
				},
				{
					id:'good',
					label:'精华',
					top:0,
					data:[]
				},
				{
					id:'share',
					label:'分享',
					top:0,
					data:[]
				},
				{
					id:'ask',
					label:'问答',
					top:0,
					data:[]
				},
				{
					id:'job',
					label:'招聘',
					top:0,
					data:[]
				},
				{
					id:'dev',
					label:'测试',
					top:0,
					data:[]
				}
			],
			currentData:[],
			scrollTop:0
			
        };
    },
    onLoad: function() {
		var self = this;
		
		self.loadData(0)
	},
	onPageScroll(e) {
		this.scrollTop=e.scrollTop
		this.list[this.tabIndex].top=e.scrollTop
	},
    methods: {
		tabHandle(index){
			let self = this;
			self.tabIndex=index
			if(self.list[index].data.length){
				self.currentData=self.list[index].data
				self.$nextTick(function(){
					uni.pageScrollTo({
						scrollTop: self.list[index].top,
						duration: 0
					});
				})
				
			}else{
				self.loadData(index)
			}
		},
		loadData(index){
			let self = this;
			let id = self.tabBars[index].id;
			uni.showLoading({
				title:'加载中'
			})
			uni.request({
				url:interfaces.topics,
				data:{
					limit:5,
					tab:id,
					mdrender:false
				},
				success(res) {
					if(res.statusCode>=200 && res.statusCode<300){
						self.list[index].data=res.data.data.map((item)=>{
							item.create_at=dayjs().to(dayjs(item.create_at))
							return item
						})
						self.currentData=self.list[index].data
						self.$nextTick(function(){
							uni.pageScrollTo({
								scrollTop: self.list[index].top,
								duration: 0
							});
						})
					}
					
				},
				complete() {
					setTimeout(function(){
						uni.hideLoading()
					},500)
				}
			})
		}
		
	}
};
</script>

<style lang="less">
.page-home {
	// tab 水平滚动
	padding-top: 100upx;
    &-vscroll {
		position: fixed;
		left: 0;
		right: 0;
		top: 0px;
		z-index: 2;
        height: 100upx;
        width: 100%;
        white-space: nowrap;
        overflow: auto;
        background: rgb(69, 123, 190);
		&.fixed-top{
			top: 44px;
		}
        &__item {
            display: inline-block;
            width: 120upx;
            text-align: center;
            line-height: 100upx;
            margin-right: 20upx;
            color: #fff;
			outline: none;
        }
        &__text {
            position: relative;
            display: inline;
        }
        .is-active {
            .page-home-vscroll__text:after {
                position: absolute;
                left: 50%;
                bottom: -32upx;
                transform: translateX(-50%);
                content: '';
                height: 6upx;
                width: 60upx;
                background: #fff;
            }
        }
    }
    
	// cell
	.i-cell {
        position: relative;
        &:after {
            position: absolute;
            left: 0;
            top: 50%;
            width: 5upx;
            height: 40upx;
            margin-top: -20upx;
            background-color: #457bbe;
        }
    }
}

.article-list{
	background: #fff;
	&__item{
		position: relative;
		padding: 20upx 30upx 30upx 30upx;
		&.is-hover{
			background: #f8f8f8;
		}
		&:after{
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 1px;
			background:#eee;
			transform: scaleY(0.5);
		}
	}
	&__userinfo{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40upx;
		font-size: 30upx;
		color: #545454;
		&--left{
			display: flex;
			align-items: center;
			height: 40upx;
		}
	}
	&__avatar{
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		overflow: hidden;
		background-color: #a1e6f7;
		margin-right: 20upx;
		image{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	&__time{
		color: #c5c5c5;
	}
	&__title{
		font-size: 30upx;
		margin-top: 25upx;
		margin-bottom: 18upx;
		color: #333333;
	}
	&__desc{
		font-size: 24upx;
		line-height: 36upx;
		color: #a2a2a2;
	}
	&__footer{
		position: relative;
		display: flex;
		height: 28upx;
		padding-top: 20upx;
		margin-top: 28upx;
		&:after{
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: 50upx;
			height: 1px;
			background: #d6d9e1;
		}
	}
	&__label{
		width: 60upx;
		height: 32upx;
		line-height: 32upx;
		background-color: #49caca;
		border-radius: 8upx;
		font-size: 18upx;
		text-align: center;
		color: #ffffff;
		&.good{
			background-color: #49caca;
		}
		&.share{
			background-color: #ff9900;
		}
		&.ask{
			background-color: #86cdff;
		}
		&.job{
			background-color: #49caca;
		}
	}
	&__fnum{
		display: flex;
		height: 28upx;
		align-items: center;
		font-size: 22upx;
		color: #c5c5c5;
		padding-left: 20upx;
		.iconfont{
			margin-right: 8upx;
		}
	}
}
</style>
