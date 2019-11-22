<template>
	<view class="flex" >
		
		<view class="flex flex-direction" style="width: 100%;" v-if="!readonly">
			<textarea v-if="areashow" style="  width:100%;text-align: right;padding:0px !important;"  :maxlength="40" auto-height :style="{'border-bottom': config.viewadd?'#c8c8c8 1px solid;':''}" class="uni-input flex-sub" :disabled="readonly"  :value="defaultValue" placeholder-style="color:#6260c7"
			 :placeholder="placeholder" @blur="valueChange" :focus="setfocus" />
			
			<view v-if="!areashow" style=" width:100%;text-align: right;padding:0px;" @tap="showHideTextarea" :style="{'color': (defaultValue=='')?'#6260c7':''}" >
				{{defaultValue==""?placeholder:defaultValue}}
			</view>
		</view>
		 
		<text v-if="readonly" class="flex-sub" :style="{'border-bottom': config.viewadd?'#c8c8c8 1px solid;':''}" style="text-align: right;padding:0px;">{{defaultValue}}</text>
		
	</view>
</template>


<script>
	export default {
		name: 'DUInput',
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
		data() {
			return {
				areashow:false,
				setfocus:false,
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
			showHideTextarea(e){
				this.areashow = !this.areashow;
				setTimeout(()=>{
					this.setfocus = true;
				},10)
			},
			valueChange: function(e) {
				this.areashow = !this.areashow;
				this.setfocus = false;
				if (this.config){
					console.log(e.target.value);
					this.$emit('fieldChange',{field:this.config.field,value:e.target.value});
				}
			}
		}
	}
</script>

<style>

</style>
