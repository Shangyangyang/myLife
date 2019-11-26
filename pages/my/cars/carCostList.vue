<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">汽车花费</block>
		</cu-custom>
		<view class="padding bg-white" style="align-content: center;">
			<view class="flex flex-wrap">
				<button class="bg-blue round lg shadow" @tap="toAdd">加一笔</button>
				<!-- <button class="bg-blue round lg shadow">统计</button> -->
			</view>
		</view>
		<br />
		<view class="cu-list menu" :class="[menuBorder ? 'sm-border' : '', menuCard ? 'card-menu margin-top' : '']" style="margin-bottom: 10px;">
			<view
				class="cu-item"
				v-for="(car, index) in carList"
				:key="index"
				@tap="toView(car)"
				:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
				@touchstart="ListTouchStart"
				@touchmove="ListTouchMove"
				@touchend="ListTouchEnd"
				:data-target="'move-box-' + index"
			>
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">{{ car.money }}</text>
					<text class="text-grey" style="padding-left: 20px;">{{ car.reason }}</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">{{ car.typeName }}</view>
				</view>
				<view class="move">
					<view class="bg-grey" @tap.stop="toEdit(car)">修改</view>
					<view class="bg-red" @tap.stop="toDel(car)">删除</view>
				</view>
			</view>
			<view style="color: #aaa; font-size: 16px; text-align: center; padding-top: 8px;">我已经到底了</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
	data() {
		return {
			carList: [],

			CustomBar: this.CustomBar,
			form: {
				size: 20,
				page: 1,
				isLastPage: false
			},

			modalName: '',

			menuBorder: false,
			menuCard: false,
			loadModal: false, // 弹窗加载控制

			listTouchStart: 0,
			listTouchDirection: null
		};
	},
	onLoad() {
		this.init();
	},
	onReady() {
		console.log('carCostList: onReady');
		let user = this.$store.getters.getUser
		console.log(user);
	},
	methods: {
		init() {
			this.fetchData();
		},
		MenuBorder(e) {
			this.menuBorder = e.detail.value;
		},
		MenuArrow(e) {
			this.menuArrow = e.detail.value;
		},
		MenuCard(e) {
			this.menuCard = e.detail.value;
		},
		fetchData(isRefresh) {
			this.loadModal = true;
			
			uni.request({
				url: this.$serviceApi.SERVICE_API.COST_CAR_LIST,
				method: 'POST',
				data: this.form,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.statusCode == 200) {
						
						if(isRefresh) this.carList = []
						this.carList.push(...res.data.data.list);
						this.form.page = res.data.data.pageNum;
						this.form.isLastPage = res.data.data.isLastPage;
					} else {
						console.error('获取数据失败');
					}
					this.loadModal = false;
					uni.stopPullDownRefresh()
				}
			});
		},
		toAdd() {
			uni.navigateTo({
				url: 'carCostForm?isAdd=true'
			})
		},
		toEdit(car) {},
		toDel(car) {
			if(!car.id) return false
			
			let that = this
			
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				success: function(res) {
					if (res.confirm) {
						that.loadModal = true;
						uni.request({
							url: that.$serviceApi.SERVICE_API.COST_CAR_DELETE,
							method: 'POST',
							data: {
								id: car.id,
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: async res => {
								uni.showToast({
									title: '删除成功',
									icon: 'success',
									duration: 2000
								});
								that.loadModal = false;
								that.fetchData(true)
							},
						
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		toView(car) {
			let carV = {
				金额: car.money,
				类型: car.typeName,
				里程: car.licheng,
				油价: car.youjia,
				备注: car.reason,
				日期: car.inputDate
			};

			uni.navigateTo({
				url: 'carCostView?obj=' + encodeURIComponent(Base64.encode(JSON.stringify(carV)))
			});
		},
		ListTouchStart(e) {this.listTouchStart = e.touches[0].pageX;},
		ListTouchMove(e) {this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';},
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target;
			} else {
				this.modalName = null;
			}
			this.listTouchDirection = null;
		}
	},
	onPullDownRefresh() {
		this.fetchData(true)
		uni.stopPullDownRefresh()
	},
	onReachBottom() {
		if (this.form.isLastPage) {
			uni.showToast({
				title: '已经全部加载',
				duration: 2000
			});
		} else {
			this.form.page++;
			this.fetchData();
		}
	}
};
</script>

<style></style>
