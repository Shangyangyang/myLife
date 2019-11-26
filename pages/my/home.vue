<template name="my">
	<view>
		<scroll-view scroll-y class="page">
			<image src="../../static/BasicsBg.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/my/' + item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "my",
		data() {
			return {
				elements: [
					{
						title: '伙食费',
						name: 'mealsCost',
						color: 'red',
						url: 'meals/mealsCost',
						cuIcon: 'newsfill'
					},
					{
						title: '汽车花费',
						name: 'carCost',
						color: 'cyan',
						url: 'cars/carCostList',
						cuIcon: 'newsfill'
					},
				],
			};
		},
		onShow() {
		},
		onReady() {
			console.log('my-onReady');
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
