<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">填写消费表单</block>
		</cu-custom>
		<autoform-common ref="autoform" />
		<view class="padding flex flex-wrap justify-between align-center bg-white" 
			style="margin-top: 10px; align-content: center;">
			<button class="cu-btn" @tap="add">保存</button>
		</view>
	</view>
</template>

<script>
import autoformCommon from '@/components/test-autoform/autoform-common.vue';

let Base64 = require('js-base64').Base64;
export default {
	components: {
		autoformCommon
	},
	data() {
		return {
			keys: [],
			
			config: {
				configList: [
					{
						name: '金额',
						field: 'money',
						type: {
							code: 'input',
							type: 'number',
							maxL: 5,
						},
						valid: {
							allowEmpty: false,
						},
						validFlag: true,
					},
					{
						name: '类型',
						field: 'type',
						type: {
							code: 'select',
							label: 'car_type',
						},
						value: '1',
						valid: {
							allowEmpty: false,
						},
						validFlag: true,
					},
					{
						name: '里程',
						field: 'licheng',
						type: {
							code: 'input',
							type: 'number',
							maxL: 8,
						},
						showBy: 'type=1',
						showFlag: true,
						valid: {
							allowEmpty: false,
						},
						validFlag: true,
					},
					{
						name: '油价',
						field: 'youjia',
						type: {
							code: 'input',
							type: 'number',
							maxL: 5,
						},
						showBy: 'type=1',
						showFlag: true,
						valid: {
							allowEmpty: false,
						},
						validFlag: true,
					},
					{
						name: '备注',
						field: 'reason',
						type: {
							code: 'input',
							maxL: 100,
						},
						validFlag: true,
					},
					{
						name: '消费日期',
						field: 'inputDate',
						type: {
							code: 'selectDate',
						},
						valid: {
							allowEmpty: false,
						},
						validFlag: true,
					},
				],
				checkFlag: false,
				checkMsg: '',
			},
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
		this.init()
	},
	methods: {
		init() {
			this.$refs.autoform.initData(this.config, this.form);
		},
		add(e) {
			let flag = this.$refs.autoform.checkValid()
			if(flag){
				// 执行保存
				console.log(this.form);
			} else {
				console.error(this.config.checkMsg);
			}
		}
	}
};
</script>

<style></style>
