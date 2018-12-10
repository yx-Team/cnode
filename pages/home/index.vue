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

		<article-list :data="currentData.list"></article-list>

		<load-more :loading-type="loadingType" :content-text="loadingText"></load-more>
    </view>
</template>
<script>
import { formateTime } from '@/lib/dayjs.js';
import {topics} from '@/common/interface.js';
import iCellGroup from '@/components/i-cell-group.vue';
import iCell from '@/components/i-cell.vue';
import articleList from '@/business/article-list.vue';

import loadMore from '@/components/uni-load-more.vue';
export default {
    components: {
        iCellGroup,
        iCell,
				articleList,
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
                list: [{
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
								}]
            },
						isFirst:true,
            scrollTop: 0
        };
    },
    onLoad: function() {
        var self = this;
				
        // uni.clearStorage()
        self.loadData(0, 1);
				
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
						topics({
							limit: 5,
							page: dpage,
							tab: id,
							mdrender: false
            }).then(res=>{
							console.log(res);
							if (res.statusCode >= 200 && res.statusCode < 300) {
								let resData = res.data.data
								if (!resData.length) {
										self.loadingType = 2;
										return;
								}
								let getData = [];
								getData = resData.map(item => {
										// 转换日期
										item.create_at = formateTime(item.create_at);
										item.label = self.getLabel(item.tab);
										return item;
								});

								if (self.tabBars[index].id === self.currentData.id) {
									if(self.isFirst){
										self.isFirst=false
										self.currentData.list = getData;
										self.page++;
										console.log('xxxx');
									}else{
										self.currentData.list = self.currentData.list.concat(getData);
										self.page++;
										console.log('yyyy');
									}
										
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
										
										console.log('zzz');
								}
								setTimeout(function(){
									uni.hideLoading();
								},1000)
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
				background: #fff;
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
