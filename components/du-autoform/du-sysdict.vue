<template>
	<view>

	
	<neil-modal ref="pickModal" @confirm="confirmPickSelect"  @close="modelClose" :showCancel="false" title="请选择" >
		<scroll-view class="multi-select-content" scroll-y    v-if="model_show">
		<view class="uni-list">
			<radio-group >
				<label  @tap="radioBoxTap(item)" class="uni-list-cell multi-select-cell-pd" style="background-color: #F4F5F6;" v-for="item in item_list" :key="item.value">
					<view>
						<radio style="transform:scale(0.8);text-align: left;" :value="item.name" :checked="item.checked" :disabled="item.disable" />
					</view>
					<view style="flex: 1;">{{item.name}}</view>
					<rich-text :nodes="item.nameadd" @tap.stop="showNameTip(item.nameaddtip)"></rich-text>
				</label>
			</radio-group>
		</view>
		</scroll-view>
	</neil-modal>
	
	
	
	<view :class="readonly?'du-navigate-readonly':'du-navigate-right'"  @tap="doTap"> 
		<view :style="readonly?'':'padding: 0px 8px;'"  style="text-align: right;line-height: 20px;" :class="(defaultValue=='')?'du-normol':'du-selected'"  >
			<text>{{valuestr}}</text>
		</view>
	</view>
	
	
	</view>
</template>


<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';

	export default {
		components: {
			neilModal
		},
		name: 'DUSysdict',
		computed:{
			valuestr:function () {
				//console.log(this.field+'valuestr');
				for (var i = 0, lenI = this.item_list.length; i < lenI; ++i) {
					let item =  this.item_list[i];
					if (item.value == this.defaultValue){
						
						let name = item.name;
						return name;
						// if(!this.readonly &&  name.length>14){
						// 	return name.substr(0,13)+'...';
						// }else{
						// 	return name;
						// }
			
					}
				}
				
				return "请选择";
			}
		},
		watch:{
			config: {
				handler:function (val) {
					uni.request({
						url: this.$helper.SERVER_API.DICT_LIST,
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						data: {
							type:this.config.dicttype,
							page:1,
							size:0
						},
						success: (res) => {
							if (res.data.result == true){
								let dict = res.data.data;
								let itemDict = [];
								if (dict!=undefined){
									for (let type of dict.list) {
										let item ={
											value:type.value,
											name:type.label
										}
										if(type.value == this.defaultValue){
											item.checked = true;
										}else{
											item.checked = false;
										}
										itemDict.push(item);
									}
								}
								//console.log(itemDict);
								this.item_list = itemDict;
							}
						}
					});
					
				},
				immediate: true
			}
		},
		props: {
			config:{
				type: Object
			},defaultValue: {
				type:String,
				default: ''
			},readonly:{
				type:Boolean,
				default: false
			}
		},
		data() {
			return {
				model_show:false,
				item_list:[],
			}
		},
		methods: {
			showNameTip(tip){
				this.$parent.showNameTip(tip);
			},
			doTap(){
				if (this.readonly) {
					return;
				}
				this.model_show = true;
				this.$refs.pickModal.showModal();
			},
			modelClose(){
				setTimeout(() => {
					this.model_show = false;
				}, 10)
			},
			confirmPickSelect(){
				//console.log('confirmPickSelect');
				let data = this.item_list;
				let tmp = '';
				//console.log(data);
				for (var i = 0, lenI = data.length; i < lenI; ++i) {
					const item = data[i];
					if (item.checked){
						tmp = item.value;
					}
				}
				
				this.$emit('fieldChange',{field:this.config.field,value:tmp});
				//this.doFieldChange(xdata);
			},
			radioBoxTap(item){
				if(item.disable){
					return;
				}
				if (item.checked){
					return;
				}
				
				item.checked = true;
				
				for (var i = 0, lenI = this.item_list.length; i < lenI; ++i) {
					const xitem = this.item_list[i];
					if (xitem!=item && xitem.checked){
						xitem.checked = false;
					}
					
				}
				
				this.$refs.pickModal.closeModal();
				this.confirmPickSelect();
				
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
.du-radio-select-picker {
		text-align: right;
		align-self: stretch;
		width:100%
}
.du-radio-select-right {
	width: 330upx;
	line-height: 80upx;
	margin-right:30upx;
	align-items: stretch;
	justify-content: flex-end;
	display: flex;
}
.du-radio-select-readonly {
	width: 330upx;
	line-height: 80upx;
	align-items: stretch;
	justify-content: flex-end;
	display: flex;
}
.du-navigate-right{
	width: 100%;
}
.du-navigate-readonly{
	width: 100%;
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

	.multi-select-content{
		background: #F4F5F6;
		width: 100%;
		height: 200px;
	}
	
	.multi-select-cell-pd {
		padding-top: 10upx;
		padding-bottom: 20upx;
		padding-left: 20upx;
	}
</style>
