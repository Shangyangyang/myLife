<template>
	<view>
		<view v-for="(item, index) in config.configList" :key="index">
			<autoform-input v-if="item.type.code == 'input'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-input>
			<autoform-select v-if="item.type.code == 'select'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-select>
			<autoform-select-date v-if="item.type.code == 'selectDate'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-select-date>
		</view>
		<view style="text-align: center; margin: 20px 0px;">-- End --</view>
	</view>
</template>

<script>
	import autoformInput from "@/components/test-autoform/autoform-input.vue"
	import autoformSelect from "@/components/test-autoform/autoform-select.vue"
	import autoformSelectDate from "@/components/test-autoform/autoform-select-date.vue"

	export default {
		name: 'autoformCommon',
		components: {
			autoformInput,
			autoformSelect,
			autoformSelectDate,
		},
		data() {
			return {
				config: {},
				form: {},
			}
		},
		onLoad(option) {},
		methods: {
			initData(config, form) {

				this.config = config
				this.form = form

				this.config.configList.forEach(item => {
					item.value = form[item.field] ? form[item.field].toString() : ''
				})
			},
			valueChange(data) {
				if (data.value == this.form[data.field]) return
				this.form[data.field] = data.value

				// 在这里做逻辑处理
				this.config.configList.filter(obj => obj.showBy).forEach(obj => {
					let arr = obj.showBy.split("&&")
					arr.forEach(by => {
						let subArr = by.split('=')
						if (data.field == subArr[0]) obj.showFlag = data.value == subArr[1]
						// 转换必填非必填，这里写死了，后期有时间再改成配置型的。20191217
						if(obj.valid.allowEmpty != undefined && obj.valid.allowEmpty != null){
							obj.valid.allowEmpty = !obj.showFlag
						}
					})
				})
				
				// 这里是验证的逻辑处理
				// this.config.configList.filter(obj => obj.valid.showBy).forEach(obj => {
				// 	let arr = obj.valid.showBy.split("&&")
				// 	arr.forEach(by => {
				// 		let subArr = by.split('=')
				// 		if (data.field == subArr[0]) obj.showFlag = data.value == subArr[1]
				// 	})
				// })
				
				
			},
			// 验证
			checkValid() {
				this.config.checkFlag = true
				this.config.checkMsg = ''
				this.config.configList.forEach(item => {
					// 自定义验证
					if (item.valid) {
						Object.keys(item.valid).forEach(key => {
							console.log(key);
							console.log(item.valid[key]);
							switch (key) {
								case 'allowEmpty':
									if ((item.valid[key] != undefined ||
										item.valid[key] != null) &&
										item.valid[key] != true) {
										
										if (!this.form[item.field]) {
											
											let str = `${item.name} 不能为空`
											if(!this.config.checkMsg) {
												this.config.checkMsg = str
												uni.showToast({
													icon: 'none',
													title: str
												})
											}
											this.config.checkFlag = item.validFlag = false
											
										} else {
											item.validFlag = true
										}
									}
									
									break;
								default:
									break;
							}

							if (!this.config.checkFlag) return false
						})
					}
				})
				console.log(`this.config.checkFlag: ${this.config.checkFlag}`);
				return this.config.checkFlag
			}
		},
	}
</script>

<style>
</style>
