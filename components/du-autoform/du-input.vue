<template>
	<view class="flex" >


		<input :style="{'border-bottom': config.viewadd?'#c8c8c8 1px solid;':''}" 
			:type="config.inputtype?config.inputtype:'text'"
			:maxlength="config.maxlength?config.maxlength:60" class="uni-input flex-sub" 
			:disabled="readonly" style="text-align: right;padding:0px;"
			:value="defaultValue" placeholder-style="color:#6260c7" :placeholder="placeholder"
			@blur="valueChange" v-if="!readonly" />

		<text v-if="readonly" class="flex-sub text-gray" :style="{'border-bottom': config.viewadd?'#c8c8c8 1px solid;':''}" style="text-align: right;padding:0px;">{{defaultValue}}</text>
		<text v-if="config.viewadd" style="margin-left: 5px;">{{config.viewadd}}</text>
	</view>
</template>


<script>
	export default {
		name: 'DUInput',
		computed: {
			placeholder() {
				//console.log(this.config);

				if (this.readonly) {
					return '';
				} else if (this.config.placeholder) {
					return this.config.placeholder;
				} else {
					return '请输入' + this.config.name;
				}
			}
		},
		props: {
			config: {
				type: Object
			},
			defaultValue: {
				type: String,
				default: ''
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			valueChange: function(e) {
				if (this.config) {
					//console.log(e.target.value);
					this.$emit('fieldChange', {
						field: this.config.field,
						value: e.target.value
					});
				}
			}
		}
	}
</script>

<style>

</style>
