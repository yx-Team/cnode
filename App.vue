<script>
	export default {
		onLaunch: function () {
			this.$store.dispatch('checkLogin')
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	// @import "common/uni.css";
	@import "common/ui.less";
	
	@import "static/css/app.css";
	
	/*每个页面公共css */
	page {
		background-color:#F4F5F6;
		font-size:28upx;
		line-height: 1.8;
	}
</style>
