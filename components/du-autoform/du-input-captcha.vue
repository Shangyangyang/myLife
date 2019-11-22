<template>
	<view class="flex align-end" >


		<input :type="config.inputtype?config.inputtype:'text'"
		 :maxlength="config.maxlength?config.maxlength:60" class="uni-input flex-sub margin-right-sm" :disabled="readonly"
		  style="border-bottom:#c8c8c8 1px solid;text-align: right;padding:0px;"
		 :value="defaultValue" placeholder-style="color:#6260c7" :placeholder="placeholder" @blur="valueChange"  />
		
		<image :src="captchaURL" @tap="editCaptcha" style="width:180upx;height:72upx;"></image>
	</view>
</template>


<script>
	export default {
		name: 'DUInputCaptcha',
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
		data(){
			return {
				captchaURL:this.$helper.SERVER_API.SYS_CAPTCHA + '?d=' + Math.random()
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
			},
			editCaptcha() {
				this.captchaURL = this.$helper.SERVER_API.SYS_CAPTCHA + '?d=' + Math.random();
			},
		}
	}
</script>

<style>

</style>
