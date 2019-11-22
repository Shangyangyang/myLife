<template>
	<view class="flex justify-end" >
		
		<uni-number-box :value="defaultValue" @change="valueChange" :max="config.max||100" v-if="!readonly"/>
		<text v-if="readonly" class="flex-sub" :style="{'border-bottom': config.viewadd?'#c8c8c8 1px solid;':''}" style="text-align: right;padding:0px;">{{defaultValue}}</text>
	
	</view>
</template>


<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	
	export default {
		name: 'DUNumberInput',
		components: {
			uniNumberBox
		},
		computed:{
			placeholder(){
				//console.log(this.config);
				
				if (this.readonly){
					return '';
				}else if (this.config.placeholder){
					return this.config.placeholder;
				}else{
					return '请输入'+this.config.name;
				}
			}
		},
		props: {
			config:{
				type: Object
			},defaultValue:{
				type: String,
				default: ''
			},readonly:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			valueChange: function(value) {
				if (this.config){
					this.$emit('fieldChange',{field:this.config.field,value:value});
				}
			}
		}
	}
</script>

<style>

</style>
