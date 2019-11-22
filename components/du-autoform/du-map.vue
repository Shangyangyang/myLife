<template>
	

	<view  class="flex align-center" :class="readonly?'du-navigate-right':''" @tap="openLocation"  >
		<input v-if="!readonly" :maxlength="config.maxlength?config.maxlength:60" class="uni-input flex-sub" :disabled="(defaultValue=='')" style="text-align: right;padding:0px;" :value="defaultValue" placeholder-style="color:#6260c7"
		 :placeholder="placeholder" @blur="valueChange" />
		<image v-if="!readonly" @tap="chooseLocation" :src="'/static/map/'+((defaultValue=='')?'clocal1.png':'clocal2.png')" style="width:20px;height:20px;margin-left: 5px;"></image>
		<view v-if="readonly" style="padding:0px;padding-right: 10px;text-align: right;flex:1;"  :class="(defaultValue=='')?'du-normol':'du-selected'">{{defaultValue==''?'请选择':defaultValue}}</view>
	</view>

	
</template>


<script>
	export default {
		name: 'DUSelect',
		computed:{
			placeholder(){
				//console.log(this.config);
				if (this.readonly){
					return '';
				}else if (this.config.placeholder){
					return this.config.placeholder;
				}else{
					return '点击右侧图标选择地址';
				}
			}
		},
		props: {
			defaultValue: {
				type:String,
				default: ''
			},
			lat: {
				type:String,
				default: ''
			},
			lng: {
				type:String,
				default: ''
			},
			config:{
				type: Object
			},
			readonly:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			chooseLocation: function(e) {
				
				
				uni.chooseLocation({
					success: (res)=>{
						console.log(res);
						let field = this.config.field;
						let fieldx = this.config.fieldx;
						let fieldy = this.config.fieldy;
						this.$emit('fieldChange',{field:field,value:res.address});
						this.$emit('fieldChange',{field:fieldx,value:res.longitude});
						this.$emit('fieldChange',{field:fieldy,value:res.latitude});
					}
				})
			},
			valueChange: function(e) {
				if (this.config){
					console.log(e.target.value);
					this.$emit('fieldChange',{field:this.config.field,value:e.target.value});
				}
			},
			openLocation: function(e) {
				if (!this.readonly){
					return;
				}
				console.log(this.lat);
				console.log(this.lng);
				uni.openLocation({
					latitude: Number(this.lat),  
					longitude: Number(this.lng),
					name:'地址',
					address: this.defaultValue=='点击查看'?'调查表当前经纬度':this.defaultValue,
					scale: 15
				});
			}
			
		}
	}
</script>

<style>
.du-input {
	height: 50upx;
	padding: 15upx 25upx;
	line-height:50upx;
	font-size:28upx;
	flex: 1;
}
.du-selected {
	color:#000000 ;
}
.du-normol {
	color:#6260c7 ;
}
.du-overflow {
	overflow:hidden; white-space:nowrap; text-overflow:ellipsis;
}	
.du-radio-select-picker {
	text-align: right;
	align-self: stretch;
	width:100%
}

.du-radio-select-right {
	width: 400upx;
	line-height: 80upx;
	margin-right: 10upx;
	align-items: stretch;
	justify-content: flex-end;
	display: flex;
	color:#6260c7;
}
.du-radio-select-text-top {
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
	margin-top: 0upx;
	margin-bottom: 2upx;
}
.du-radio-select-text-bottom {
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
}
.du-navigate-right{
	width:100%;
	flex: 1;
}
.du-navigate-readonly{
	width:100%;
	padding-right: 0upx;
}
.du-navigate-right:after{
	font-family: uniicons;
	content: '\e583';
	position: absolute;
	right: 10upx;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
</style>
