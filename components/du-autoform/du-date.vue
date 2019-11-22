<template>
	<view  :class="readonly?'du-navigate-readonly':'du-navigate-right'"  >
		<picker :disabled="readonly" 
			class="du-radio-select-picker" 
			@change="bindPickerChange"  
			mode="date" 
			:start="startDate"
			:end ="endDate"
			:fields="config.granularity||'day'"  
			:value="value" >
			
			<view  :style="readonly?'':'padding-right: 10px;'" style="padding:0px;"  :class="defaultValue==''?'du-normol':'du-selected'">{{value}}</view>
		
		</picker>
	</view>
</template>


<script>
	export default {
		name: 'DUDate',
		computed:{
			value: function () {
				if (this.defaultValue!=''){
					return this.defaultValue.substr(0,10);
				}else{
					return '请选择';
				}
			}
		},
		props: {
			defaultValue: {
				type:String,
				default: ''
			},startDate: {
				type:String,
				default: ''
			},endDate: {
				type:String,
				default: ''
			},config:{
				type: Object
			},readonly:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			bindPickerChange: function(e) {
				
				let vl = e.target.value;
				if (this.config.addtime){
					var date=new Date();
					var h=date.getHours(); //获取小时   
					var m=date.getMinutes(); //获取分钟   
					var s=date.getSeconds(); //获取秒   
					vl+=' '+h+':'+m+':'+s;
				}
				
				this.$emit('fieldChange',{field:this.config.field,value:vl});
			}
		}
	}
</script>

<style>
.du-selected {
	color:#000000 ;
}
.du-normol {
	color:#6260c7 ;
}

.uni-list-cell-readonly{
	padding-right: 0upx;
}
.du-navigate-right{
	width: 100%;
	flex: 1;
}
.du-radio-select-picker {
	text-align: right;
	align-self: stretch;
	width:100%
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
