<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block><block slot="content">伙食费</block>
		</cu-custom>
		<view class="padding bg-white" style="align-content: center;">
			<view class="flex flex-wrap">
				<button class="bg-blue round lg shadow" @tap="toAdd">加一笔</button>
				<!-- <button class="bg-blue round lg shadow">统计</button> -->
			</view>
		</view>
		<br/>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">茄子蛋炒饭</text>
					<text class="text-grey" style="padding-left: 20px;">约 9 元</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">午餐</view>
					<view class="cu-tag round bg-olive light">自制</view>
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
			}
		},
		methods: {
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			toAdd(){
				uni.navigateTo({
				    url: 'mealsCostAdd'
				});
			},
		},
		onPullDownRefresh(){
			console.log('123');
		},
	}
</script>

<style>

</style>
