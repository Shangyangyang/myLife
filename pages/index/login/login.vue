<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<autoform-common ref="autoform" />
		<view class="padding flex flex-wrap justify-between align-center bg-white" style="margin-top: 10px; align-content: center;">
			<button class="cu-btn" @tap="login">登录</button>
		</view>
	</view>
</template>

<script>
import conf from './login_config.js';
import autoformCommon from '@/components/test-autoform/autoform-common.vue';

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
		};
	},
	methods: {
		init() {
			this.$refs.autoform.initData(conf, this.form);
		},
		async login(){
			console.log(this.form);
		},
	},
	onLoad() {},
	onReady() {
		this.init()
	},
};
</script>
