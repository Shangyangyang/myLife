<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block><block slot="content">汽车花费详情</block>
		</cu-custom>
		<view class="padding bg-white" style="align-content: center;">
			<view v-for="(key, index) in keys" :key="key" style="font-size: 20px; margin: 5px;" v-show="obj[key]">
				{{key}}&nbsp;:&emsp;{{obj[key]}}
			</view>
		</view>
	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64
	export default {
		data() {
			return {
				keys: [],
				
				obj: {},
				
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
			}
		},
		onLoad(option) {
			this.obj = JSON.parse(Base64.decode(decodeURIComponent(option.obj)))
			this.init()
		},
		methods: {
			init(){
				this.keys = Object.keys(this.obj)
			},
		},
	}
</script>

<style>

</style>
