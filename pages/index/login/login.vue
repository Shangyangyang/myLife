<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="'../index'">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<autoform-common ref="autoform" />
		<view class="padding flex flex-wrap justify-between align-center bg-white" style="margin-top: 10px; align-content: center;">
			<button class="cu-btn" @tap="login">登录</button>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
import conf from './login_config.js';
import autoformCommon from '@/components/test-autoform/autoform-common.vue';
import Cookies from 'js-cookie'

let Base64 = require('js-base64').Base64;

export default {
	components: {
		autoformCommon
	},
	data() {
		return {
			form: {
				userName: 'admin',
				password: 'a_123456',
			},
			
			loadModal: false,
		};
	},
	methods: {
		init() {
			this.$refs.autoform.initData(conf, this.form);
		},
		async login(){
			this.loadModal = true;
			uni.request({
				url: this.$serviceApi.SERVICE_API.SYS_LOGIN,
				method: 'POST',
				data: this.form,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.statusCode == 200) {
						
						if(res.data.data && res.data.data2){
							this.$store.commit('saveUser', res.data.data)
							uni.setStorageSync('cookieKey', res.data.data2)
							Cookies.set('JSESSIONID', res.data.data2)
							
							uni.navigateTo({
								url: '../index'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '登录失败，用户名或密码错误'
							})
						}
					} else {
						console.error('获取数据失败');
					}
					this.loadModal = false;
					uni.stopPullDownRefresh()
				},
				
			});
			setTimeout(() => {
				this.loadModal = false;
			}, 2000)
		},
	},
	onLoad() {},
	onReady() {
		this.init()
	},
};
</script>
