<template>
	<view class="cu-form-group margin-top" v-show="config.showFlag == false ? false : true">
		<view class="title">{{ config.name }}</view>
		<input class="uni-input" 
			:value="defaultValue" :placeholder="placeholder" maxlength="5" :type="inputType" 
			@blur="valueChange" :maxlength="config.type.maxL"/>
	</view>
</template>

<script>
export default {
	name: 'autoformInput',
	props: {
		config: {
			type: Object
		},
		defaultValue: {
			type: String,
			default: ''
		}
	},
	computed: {
		placeholder() {
			return `请输入${this.config.placeholder ? this.config.placeholder : this.config.name}`;
		},
		inputType() {
			return this.config.type.type ? this.config.type.type : 'text';
		}
	},
	data() {
		return {};
	},
	methods: {
		valueChange(e) {
			this.$emit('valueChange', {
				field: this.config.field,
				value: e.target.value
			});
		}
	}
};
</script>

<style></style>
