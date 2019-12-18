<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">百公里油耗</block>
		</cu-custom>
		<view class="padding bg-white" style="align-content: center;">
			<text style="font-weight: bold;">合计时间段：</text>
			<text>{{ youhao.startTime }}&nbsp;至&nbsp;{{ youhao.endTime }}</text>
			<br />
			<text style="font-weight: bold;">汽油总升数：</text>
			<text>{{ youhao.shengTotal }}&nbsp;升</text>
			<br />
			<text style="font-weight: bold;">总里程数&emsp;：</text>
			<text>{{ youhao.lichengTotal }}&nbsp;公里</text>
			<br />
			<text style="font-weight: bold;">总油费&emsp;&emsp;：</text>
			<text>{{ youhao.money }}&nbsp;元</text>
			<br />
			<text style="font-weight: bold;">平均油价&emsp;：</text>
			<text>{{ youhao.averageYoujia }}&nbsp;元</text>
			<br />
			<text style="font-weight: bold;">百公里油耗：</text>
			<text style="color: red;">{{ youhao.baigongliyouhao }}&nbsp;</text>
			&nbsp;升
			<br />
		</view>
		<view class="padding bg-white" style="align-content: center;"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas></view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
import uCharts from '../../../components/ucharts/u-charts.js';
let Base64 = require('js-base64').Base64;
let _self
export default {
	data() {
		return {
			form: {},
			youhao: {},

			loadModal: false, // 弹窗加载控制

			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: ''
		};
	},
	onLoad(option) {
		this.init();
	},
	methods: {
		init() {
			this.fetchData();
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		async fetchData() {
			this.loadModal = true;

			uni.request({
				url: this.$serviceApi.SERVICE_API.COST_CAR_GETOILWEAR,
				method: 'POST',
				data: this.form,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.statusCode == 200) {
						this.youhao = res.data.data;
						this.youhao.endTime = this.youhao.endTime ? this.youhao.endTime.substr(0, 10) : this.youhao.endTime;
						this.youhao.startTime = this.youhao.startTime ? this.youhao.startTime.substr(0, 10) : this.youhao.startTime;
					} else {
						console.error('获取数据失败');
					}
					this.loadModal = false;
				}
			});
		},
		getServerData() {
			uni.request({
				url: this.$serviceApi.SERVICE_API.COST_CAR_GETJSONSTR,
				data: {},
				success: function(res) {
					console.log(res.data.data.data);
					//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
					_self.serverData = res.data.data.data;
					let Column = { categories: [], series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Column.categories = res.data.data.data.Column.categories;
					Column.series = res.data.data.data.Column.series;
					_self.showColumn('canvasColumn', Column);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: { show: true },
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		},
		touchColumn(e) {
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		}
	}
};
</script>

<style>
page {
	background: #f2f2f2;
	width: 750upx;
	overflow-x: hidden;
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}
.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
