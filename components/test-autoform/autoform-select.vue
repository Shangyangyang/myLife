<template>
	<view class="cu-form-group margin-top">
		<view class="title">{{ config.name }}</view>
		<picker @change="valueChange" :value="index" :range-key="'name'" :range="list" v-if="list.length > 0">
			<view class="picker">{{ list[index].name }}</view>
		</picker>
	</view>
</template>

<script>
export default {
	name: 'autoformSelect',
	props: {
		config: {
			type: Object
		},
		defaultValue: {
			type: String,
			default: ''
		}
	},
	watch: {
		config: {
			handler: function(val) {
				uni.request({
					url: this.$serviceApi.SERVICE_API.SYS_DICT_LIST,
					data: {
						label: this.config.type.label,
						page: 1,
						size: 0
					},
					success: res => {
						if (res.data.code == 200 && res.data.status == 1) {
							this.list = [];
							this.list.push(...res.data.data.list)
							
							// 计算默认值
							this.index = this.list.indexOf(this.list.find(item => item.value == this.defaultValue))
							
							// 推送一回数据
							this.$emit('valueChange', {
								field: this.config.field,
								value: this.list[this.index].value
							})
						}
					}
				});
			},
			immediate: true
		}
	},
	onLoad() {},
	data() {
		return {
			list: [],
			index: 0
		};
	},
	methods: {
		valueChange(e) {
			this.index = e.target.value
			
			this.$emit('valueChange', {
				field: this.config.field,
				value: this.list[this.index].value
			})
			
		}
	}
};
</script>

<style></style>
