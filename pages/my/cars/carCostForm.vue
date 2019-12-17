<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">填写消费表单</block>
		</cu-custom>
		<autoform-common ref="autoform" />
		<view class="padding flex flex-wrap justify-between align-center bg-white" style="margin-top: 10px; align-content: center;">
			<button class="cu-btn" @tap="add">保存</button>
		</view>
	</view>
</template>

<script>
import autoformCommon from '@/components/test-autoform/autoform-common.vue';
import conf from './carCostFormConfig.js';
import Cookies from 'js-cookie'

let Base64 = require('js-base64').Base64;
export default {
	components: {
		autoformCommon
	},
	data() {
		return {
			keys: [],

			form: {
				money: 100,
				type: 1,
				inputDate: new Date().format('yyyy-MM-dd')
			},
			obj: {},

			menuBorder: false,
			menuArrow: false,
			menuCard: false
		};
	},
	onLoad(option) {},
	onReady() {
		this.init();
	},
	methods: {
		init() {
			this.$refs.autoform.initData(conf, this.form);
		},
		add(e) {
			let flag = this.$refs.autoform.checkValid();
			if (flag) {
				// 执行保存
				this.loadModal = true;
				uni.request({
					url: this.$serviceApi.SERVICE_API.COST_CAR_SAVE,
					method: 'POST',
					data: this.form,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						// Cookie: uni.getStorageSync('cookieKey')
						Cookie: Cookies.get('JSESSIONID')
					},
					success: res => {
						
						if(res.data.status != 1){
							uni.showToast({
								icon: 'none',
								title: '保存失败，请检查网络'
							})
							console.error(res.data);
							return false
						} else {
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							})
							
							setTimeout(function(){
								uni.navigateTo({
									url:'./carCostList'
								})
							}, 1000)
						}
						
						this.loadModal = false;
						uni.stopPullDownRefresh();
					}
				});
			} else {
				console.error(conf.checkMsg);
			}
		}
	}
};
</script>

<style></style>
