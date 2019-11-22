<template>
	

	<view  :class="readonly?'du-navigate-readonly':'du-navigate-right'"  >
		<picker class="du-radio-select-picker" :disabled="readonly" @change="bindPickerChange"  :value="value" :range="complist" range-key="name" >
			<view :style="readonly?'':'padding-right: 10px;'" style="padding:0px;"  :class="(defaultValue=='')?'du-normol':'du-selected'">{{valuestr}}</view>
		</picker>
	</view>

	
</template>


<script>
	export default {
		name: 'DUSelect',
		computed:{
			valuestr:function () {
				//console.log(this.field+'valuestr');
				for (var i = 0, lenI = this.complist.length; i < lenI; ++i) {
					let item =  this.complist[i];
					if (item.value == this.defaultValue){
						
						let name = item.name;
						if(!this.readonly &&  name.length>14){
							return name.substr(0,13)+'...';
						}else{
							return name;
						}

					}
				}
				
				return "请选择";
			},
			value: function () {
				if (this.defaultValue==''){
					if (this.field=='g14'){
						return 0;
					}else{
						return -1;
					}
					
				}else{
					
					for (var i = 0, lenI = this.complist.length; i < lenI; ++i) {
						let item =  this.complist[i];
						if (item.value == this.defaultValue){
							return i;
						}
					}
					
					return -1;
				}
			},
			complist:function(){
				return this.list;
				// let result = new Array();
				// for (var i = 0; i < this.list.length; i++) {
				// 	let item = this.list[i];
				// 	let showby = item.showby;
				// 	if (showby){
				// 		
				// 		console.log(this.$parent);
				// 		
				// 	}else{
				// 		result.push(item);
				// 	}
				// }
				// return result;
			}
		},
		props: {
			defaultValue: {
				type:String,
				default: ''
			},
			list:{
				type:Array
			},
			field:{
				type: String
			},readonly:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			bindPickerChange: function(e) {
				let index = e.target.value;
				let vl ='';
				if (index>=0){
					vl = this.complist[index].value
				}
				
				this.$emit('fieldChange',{field:this.field,value:vl});
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
