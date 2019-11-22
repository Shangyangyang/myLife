<template>
	<view class="cu-form-group margin-top">
		<view class="title">{{ config.name }}</view>
		<picker mode="date" :value="date" @change="valueChange">
			<view class="uni-input">{{ date }}</view>
		</picker>
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
	data() {
		return {
			date: null,
		};
	},
	watch: {
		defaultV: {
			handler: function(val) {
				this.date = this.defaultValue
			},
			immediate: true
		}
	},
	methods: {
		valueChange(e) {
			
			this.date = e.target.value
			
			this.$emit('valueChange', {
				field: this.config.field,
				value: e.target.value
			});
		}
	}
};
</script>

<style></style>
