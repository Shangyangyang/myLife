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
		name: 'DUModelSelect',
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
		watch:{
			config: {
				handler:function (val) {
					var items = this.config.list;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i];
						if (item.value == this.defaultValue){
							this.$set(item,'checked',true);
						}else{
							this.$set(item,'checked',false);
						}
					}
					//this.item_list = this.$parent.computList(items);
					this.item_list = items;
				},
				immediate: true
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
				//this.$emit('pickSelect',{field:this.field,list:items});
			},
			modelClose(){
				setTimeout(() => {
					this.model_show = false;
				}, 10)
			},
			confirmPickSelect(){
				console.log('confirmPickSelect');
				let data = this.item_list;
				let tmp = '';
				console.log(data);
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
				let lastcheckeditem = null;
				let confirmtip ='';
				
				for (var i = 0, lenI = this.item_list.length; i < lenI; ++i) {
					const xitem = this.item_list[i];
					if (xitem!=item && xitem.checked){
						xitem.checked = false;
						lastcheckeditem = xitem;
					}
					if (xitem.relation && xitem ==  lastcheckeditem){
						confirmtip = this.getRelationsConfirmtip(xitem.relation,'false');
						if (confirmtip != ''){
							break;
						}
					}
				}
			
				if (confirmtip == ''){
					confirmtip = this.getRelationsConfirmtip(item.relation,item.checked?'true':'false');
				}
				
				if (confirmtip!=''){
					if (confirmtip.indexOf('{canjiName}')!=-1){
						confirmtip = confirmtip.replace('{canjiName}',this.$parent.canjiName());
					}
					
					uni.showModal({
						content: confirmtip,
						confirmText: "确定",
						cancelText: "取消",
						success:(res)=>{
							if(res.confirm){
								this.$refs.pickModal.closeModal();
								this.confirmPickSelect();
							}else{
								setTimeout(()=> {
									item.checked = false;
									if (lastcheckeditem!=null){
										lastcheckeditem.checked = true;
									}
								}, 10);
							}
						}
					});
				}else{
					this.$refs.pickModal.closeModal();
					this.confirmPickSelect();
				}
				
			},
			getRelationsConfirmtip(rl,value){
				if (!rl || rl==undefined){
					return '';
				}
				let relations = [];
				if (Array.isArray(rl)){
					relations.push(...rl);
				}else{
					relations.push(rl);
				}
				console.log(relations);
				for (var i = 0; i < relations.length; i++) {
					let relation = relations[i];
					let then = relation.then;
					let okwhere = this.$parent.computShowby(relation.where,value);
					if (okwhere){
						if (then.op == 'confirm'){
							return then.tip;
						}
					}
				}
				return '';
			},
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
