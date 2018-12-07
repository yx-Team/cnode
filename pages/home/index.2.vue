<template>
    <view class="page-home">
		<!-- tab -->
		<!-- #ifdef H5 -->
		<scroll-view class="page-home-vscroll fixed-top" scroll-x scroll-with-animation :scroll-into-view="toView">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<scroll-view class="page-home-vscroll" scroll-x scroll-with-animation :scroll-into-view="toView">
		<!-- #endif -->
		
			<view class="page-home-vscroll__item" 
				:class="{'is-active':tabIndex===index}" 
				v-for="(item,index) in tabBars" 
				:key="index"
				:id="item.id"
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
			<view class="article-list__item" hover-class="is-hover" v-for="(item,index) in currentData.list" :key="index" @click="toDetail(item.id)">
				<view class="article-list__userinfo">
					<view class="article-list__userinfo--left">
						<view class="article-list__avatar"><image :src="item.author.avatar_url" ></image></view>
						<view class="article-list__username">{{item.author.loginname}}</view>
					</view>
					<view class="article-list__time">{{item.create_at}}</view>
				</view>
				<view class="article-list__title i-ellipsis-2">{{item.title}}</view>
				<view class="article-list__desc i-ellipsis-2">{{item.content}}</view>
				<view class="article-list__footer">
					<view class="article-list__label" :class="item.tab">{{item.label}}</view>
					<view class="article-list__fnum"><view class="iconfont icon-eye"></view>{{item.visit_count}}</view>
					<view class="article-list__fnum"><view class="iconfont icon-pinglun"></view>{{item.reply_count}}</view>
				</view>
			</view>
		</view>
		<load-more :loading-type="loadingType" :content-text="loadingText"></load-more>
    </view>
</template>
<script>
import { formateTime } from '@/lib/dayjs.js';
import { interfaces } from '@/common/api.js';
import {ntopics} from '@/common/interface.js';
import iCellGroup from '@/components/i-cell-group.vue';
import iCell from '@/components/i-cell.vue';
import loadMore from '@/components/uni-load-more.vue';
export default {
    components: {
        iCellGroup,
        iCell,
        loadMore
    },
    data() {
        return {
            loadingType: 0,
            loadingText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            },
            tabIndex: 0,
            page: 1,
            toView: 'all',
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
            list: [
                {
                    id: 'all',
                    top: 0,
                    page: 1,
                    data: []
                },
                {
                    id: 'good',
                    top: 0,
                    page: 1,
                    data: []
                },
                {
                    id: 'share',
                    top: 0,
                    page: 1,
                    data: []
                },
                {
                    id: 'ask',
                    top: 0,
                    page: 1,
                    data: []
                },
                {
                    id: 'job',
                    top: 0,
                    page: 1,
                    data: []
                },
                {
                    id: 'dev',
                    top: 0,
                    page: 1,
                    data: []
                }
            ],
            currentData: {
                id: 'all',
                list: []
            },
            scrollTop: 0
        };
    },
    onLoad: function() {
        var self = this;
        // uni.clearStorage()
        self.loadData(0, 1);
				ntopics({limit: 5,page: 1,tab: 'all',mdrender: false}).then(res=>{
					console.log(res);
				}).catch(error=>{
					console.log(res);
				})
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
        this.list[this.tabIndex].top = e.scrollTop;
    },
    onReachBottom() {
        // 上拉加载
        // 分页数

        // 请求数据
        this.loadData(this.tabIndex, this.page);
    },
    methods: {
        tabHandle(index) {
            uni.showLoading({
                title: '加载中'
            });
            let self = this;
            self.tabIndex = index;

            // tabbars移动算法
            var length = self.tabBars.length;
            var toView = self.tabBars[index].id;
            switch (index) {
                case 0:
                case 1:
                case 2:
                    toView = self.tabBars[0].id;
                    break;
                case length - 1:
                case length - 2:
                case length - 3:
                    break;
                default:
                    toView = self.tabBars[length - 2].id;
            }
            self.toView = toView;
            
            self.loadData(index);
        },
        getLabel(tab) {
            let label = '';
            this.tabBars.forEach(item => {
                if (item.id === tab) {
                    label = item.name;
                }
            });
            return label;
        },
        loadData(index, page = 1) {
            let self = this;
            let id = self.tabBars[index].id;
            let dpage = page || 1;
            let list = self.list[index];
            self.loadingType = 1;
            uni.request({
                url: interfaces.topics,
                data: {
                    limit: 5,
                    page: dpage,
                    tab: id,
                    mdrender: false
                },
                success(res) {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        if (!res.data.data.length) {
                            self.loadingType = 2;
                            return;
                        }
                        let getData = [];
                        getData = res.data.data.map(item => {
                            // 转换日期
                            item.create_at = formateTime(item.create_at);
                            item.label = self.getLabel(item.tab);
                            return item;
                        });

                        if (self.tabBars[index].id === self.currentData.id) {
                            self.currentData.list = self.currentData.list.concat(getData);
                            self.page++;
                        } else {
														
														self.currentData.list=[];
														self.$nextTick(function(){
															self.currentData.list = getData;
															self.page = 2;
															self.currentData.id = self.tabBars[index].id;
															uni.pageScrollTo({
																	scrollTop: 0,
																	duration: 0
															});
														})
                            
                            
                        }
												setTimeout(function(){
													uni.hideLoading();
												},1000)
                    }
                },
                fail(res) {
                    console.log(res);
                },
                complete() {
                    
                }
            });
        },
        toDetail(id) {
            uni.navigateTo({
                url: '/pages/detail/detail?id=' + id
            });
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
        &.fixed-top {
            top: 44px;
        }
        &__item {
					  position: relative;
            display: inline-block;
						height: 100%;
            width: 120upx;
            text-align: center;
            line-height: 100upx;
            margin-right: 20upx;
            color: #fff;
            outline: none;
        }
        &__text {
            
            display: inline-block;
						height: 100%;
        }
        .is-active {
					
						.page-home-vscroll__text{
							font-weight: bold;
						}
            .page-home-vscroll__text:after {
                position: absolute;
                left: 50%;
                bottom: 0;
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

.article-list {
    background: #fff;
    &__item {
        position: relative;
        padding: 20upx 30upx 30upx 30upx;
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
