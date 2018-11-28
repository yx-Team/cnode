<template>
    <view class="uni-tab-bar">
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
                :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
        </scroll-view>
        <view class="swiper-box">
			
		</view>
    </view>
</template>
<script>
    import mediaList from '@/components/tab-nvue/mediaList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
    export default {
        components: {
            mediaList,
			uniLoadMore
        },
        data() {
            return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
               
                tabBars: [{
                    name: '全部',
                    id: 'all'
                }, {
                    name: '精华',
                    id: 'good'
                }, {
                    name: '分享',
                    id: 'share'
                }, {
                    name: '问答',
                    id: 'ask'
                }, {
                    name: '招聘',
                    id: 'job'
                }, {
                    name: '测试',
                    id: 'dev'
                }]
            }
        },
        onLoad: function() {
            this.newsitems = this.randomfn()
        },
        methods: {
            goDetail(e) {
                uni.navigateTo({
                    url: '/pages/template/tabbar/detail/detail?data=' + e.title
                })
            },
            close(index1, index2) {
                uni.showModal({
                    content: '是否删除本条信息？',
                    success: (res) => {
                        if (res.confirm) {
                            this.newsitems[index1].data.splice(index2, 1);
                        }
                    }
                })
            },
            loadMore(e) {
				this.newsitems[e].loadingType = 1;
            	setTimeout(() => {
            		this.addData(e);
            	}, 1200);
            },
            addData(e) {
            	if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
            		return;
            	}
            	for (let i = 1; i <= 10; i++) {
            		this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
            	}
				this.newsitems[e].loadingType = 1;
            },
            async changeTab(e) {
                let index = e.target.current;
                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    width += result.width;
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
                    uni.createSelectorQuery().select("#" + id).fields({
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);
                    }).exec();
                })
            },
            async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
                        tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = e.target.dataset.current
                }
            },
            randomfn() {
                let ary = [];
                for (let i = 0, length = this.tabBars.length; i < length; i++) {
                    let aryItem = {
						loadingType : 0,
                        data: []
                    };
                    for (let j = 1; j <= 10; j++) {
                        aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
                    }
                    ary.push(aryItem);
                }
                return ary;
            }
        }
    }
</script>

<style>

</style>