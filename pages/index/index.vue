<template>
	<view>
		<basics v-if="PageCur == 'basics'"></basics>
		<components v-if="PageCur == 'component'"></components>
		<my v-if="PageCur == 'my'"></my>
		<plugin v-if="PageCur == 'plugin'"></plugin>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/basics' + [PageCur == 'basics' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'basics' ? 'text-green' : 'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/component' + [PageCur == 'component' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'component' ? 'text-green' : 'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/my' + [PageCur == 'my' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'my' ? 'text-green' : 'text-gray'">我的</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/plugin' + [PageCur == 'plugin' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'plugin' ? 'text-green' : 'text-gray'">扩展</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'basics'
		};
	},
	methods: {
		NavChange: function(e) {
			// this.$store.commit('saveUser', {
			// 	name: 'admin',
			// 	value: '123321'
			// });
			if(e.currentTarget.dataset.cur == 'my'){
				// 验证登录
				if(JSON.stringify(this.$store.getters.getUser) == '{}'){
					// 没有登录
					uni.showToast({
						title:'请先登录'
					})
					setTimeout(function(){
						uni.navigateTo({
							url:'./login/login'
						})
					}, 1000)
					return false
				}
			}
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
