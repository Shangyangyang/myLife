<template>
	<view class="cu-form-group margin-top" v-show="config.showFlag == false ? false : true" 
		:style="styleStr">
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
		},
		styleStr(){
			return this.config.validFlag && this.validFlag ? 'border: #fff 0px solid;' : 'border: #ff0000 1px solid;'
		}
	},
	data() {
		return {
			validFlag: true
		};
	},
	methods: {
		valueChange(e) {
			// 自定义验证
			if(this.config.valid){
				
				Object.keys(this.config.valid).forEach(key => {
					switch (key){
						case 'allowEmpty':
							this.validFlag = this.config.validFlag = (!this.config.valid[key] && e.target.value)
							break;
						default:
							break;
					}
					
				})
			}			
			this.$emit('valueChange', {
				field: this.config.field,
				value: e.target.value
			});
		}
	}
};
</script>

<style></style>
