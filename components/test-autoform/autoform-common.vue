<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<autoform-input v-if="item.type.code == 'input'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-input>
			<autoform-select v-if="item.type.code == 'select'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-select>
			<autoform-select-date v-if="item.type.code == 'selectDate'" :config="item" :defaultValue="item.value" @valueChange="valueChange"></autoform-select-date>
		</view>
	</view>
</template>

<script>
	import autoformInput from "@/components/test-autoform/autoform-input.vue"
	import autoformSelect from "@/components/test-autoform/autoform-select.vue"
	import autoformSelectDate from "@/components/test-autoform/autoform-select-date.vue"
	
	export default {
		name: 'autoformCommon',
		components:{
			autoformInput,
			autoformSelect,
			autoformSelectDate,
		},
		data(){
			return {
				list: [],
				form: {},
			}
		},
		onLoad(option){
		},
		methods: {
			initData(configList, form) {
				
				this.list = configList
				this.form = form
				
				this.list.forEach(item => {
					item.value = form[item.field] ? form[item.field].toString() : ''
				})
			},
			valueChange(data){
				if(data.value == this.form[data.field]) return
				this.form[data.field] = data.value
				
				// 在这里做逻辑处理
				this.list.filter(obj => obj.showBy).forEach(obj => {
					let arr = obj.showBy.split("&&")
					arr.forEach(by => {
						let subArr = by.split('=')
						if(data.field == subArr[0]) obj.showFlag = data.value == subArr[1]
					})
				})
			}
		},
	}
</script>

<style>
</style>
