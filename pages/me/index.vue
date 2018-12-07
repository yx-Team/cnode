<template>
	<view class="page-me">
		<view class="page-me__header">
			<view class="page-me__header--top">
				<!-- 头像 -->
				<view class="page-me-avatar">
					<view class="page-me-avatar__thumb">
						<block v-if="isLogin === true">
						<view class="page-me-avatar__thumbcon">
							<image :src="userInfo.avatar_url" mode=""></image>
						</view>
						</block>
						<block v-if="isLogin === false">
						<view class="page-me-avatar__thumbcon"  @click="goLogin">
							<view class="page-me-avatar__button">
								去登录
							</view>
						</view>
						</block>
						
					</view>
					<view class="page-me-avatar__username" v-if="isLogin === true">
						{{userInfo.loginname}}
					</view>
				</view>
			</view>
			<view class="page-me__header--bottom page-me-tools">
				<view class="page-me-tools__item">
					<view class="page-me-tools__icon iconfont">&#xee92;</view>
					<view class="page-me-tools__text">最近发布</view>
				</view>
				<view class="page-me-tools__item">
					<view class="page-me-tools__icon iconfont">&#xee92;</view>
					<view class="page-me-tools__text">我的收藏</view>
				</view>
				<view class="page-me-tools__item">
					<view class="page-me-tools__icon iconfont">&#xe744;</view>
					<view class="page-me-tools__text">最近回复</view>
				</view>
			</view>
		</view>
		<i-cell-group>
			<i-cell icon="iconfont icon-appstore" icon-color="#ffae36"  @click="theme">主题</i-cell>
			<i-cell icon="iconfont icon-exclamationcircle" icon-color="#51beeb">关于Cnode</i-cell>
		</i-cell-group>
		<view class="i-whitespace"></view>
		<i-cell-group>
			<i-cell icon="iconfont icon-edit" icon-color="#ee7272"  @click="theme">关于作者</i-cell>
			<i-cell icon="iconfont icon-sharealt" icon-color="#616e77">清理缓存</i-cell>
		</i-cell-group>
		<view class="logout" @click="logout" v-if="isLogin === true">
			退出登录
		</view>
	</view>
</template>

<script>
import iCellGroup from '@/components/i-cell-group';
import iCell from '@/components/i-cell';
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    components: {
        iCell,
        iCellGroup
    },
    data() {
        return {
            
        };
    },
    onLoad() {
        this.checkLogin()
		console.log('--------------------')
		console.log(this.$store.state)
		uni.getStorage({
			'key':'accessToken',
			success(res) {
				console.log(res.data)
			}
		})
		console.log(this.$store.state.isLogin)
    },
	computed: {
		...mapState(['isLogin','userInfo'])
	},
    methods: {
		...mapActions([
			'logout'
		]),
		goLogin(){
			uni.navigateTo({
				url:'/pages/login/index'
			})
		},
		checkLogin() {
			var self = this;
			uni.getStorage({
				key:'accessToken',
				success(res) {
					self.$store.dispatch('getUserInfo',{accessToken:res.data})
				},
				fail() {
					console.log('获取token失败')
				}
			})
				
		}
			
    }
};
</script>

<style lang="less">
.page-me {
    &__header {
        height: 400upx;
        background-color: #457bbe;
        &--top {
            height: 264upx;
        }
        &--bottom {
            height: 136upx;
        }
    }
    &-tools {
        display: flex;
        flex-direction: row;
        &__item {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .iconfont {
                font-size: 30upx;
            }
            &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 20upx;
                width: 1px;
                height: 90upx;
                background: rgba(255, 255, 255, 0.2);
            }
        }
        &__text {
            font-size: 24upx;
            padding-top: 18upx;
        }
    }
    &-avatar {
        padding-top: 10upx;
        &__thumb {
            width: 148upx;
            height: 148upx;
            border: 10upx solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            border-radius: 100%;
            margin: 0 auto;
            &con {
                position: relative;
                width: 148upx;
                height: 148upx;
                background-color: #ffffff;
            }
            image {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        &__button {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            text-align: center;
            line-height: 148upx;
            font-size: 30upx;
            color: #0086b3;
        }
        &__username {
            padding-top: 20upx;
            font-size: 32upx;
            text-align: center;
            color: #fff;
        }
    }
	.logout{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 710upx;
		height: 84upx;
		margin: 40upx auto 0;
		background-color: #de3232;
		border-radius: 5upx;
		font-size: 32upx;
		color: #f4f3f3;
	}
}
</style>
