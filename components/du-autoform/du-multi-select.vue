<template>
	<view>
	
		<neil-modal ref="neilModal" @confirm="confirmMultiSelect" @close="modelClose" title="请选择" >
			<scroll-view class="multi-select-content" scroll-y  v-if="model_show">
				<view class="uni-list">
					<checkbox-group >
						<label @tap="checkBoxTap(item)" class="uni-list-cell multi-select-cell-pd" style="background-color: #F4F5F6;" v-for="item in item_list" :key="item.value">
							<view>
								<checkbox style="transform:scale(0.8);text-align: left;" :value="item.name" :checked="item.checked" :disabled="item.disable" />
							</view>
							<view style="flex: 1;">{{item.name}}</view>
							<rich-text :nodes="item.nameadd" @tap.stop="showNameTip(item.nameaddtip)"></rich-text>
						</label>
					</checkbox-group>
				</view>
			</scroll-view>
		</neil-modal>
		
		<view :class="readonly?'du-navigate-readonly':'du-navigate-right'"  @tap="doTap"> 
			<view :style="readonly?'':'padding: 0px 8px;'"  style="text-align: right;line-height: 20px;" :class="[defaultValue.length>0?'du-selected':'du-normol']"   >
				<rich-text :nodes="value"></rich-text>
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
		name: 'DUMultiSelect',
		computed:{
			value: function () {
				
				//console.log('value for :'+this.field);
				let iconstr = "<span class='icon-check'/>";
				
				if (this.defaultValue.length>0){
					
					let str = iconstr;
					let first = true;
					let items = this.config.list;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						
						let value = items[i].value;
						if (this.defaultValue.includes(value)){
							if (!first){
								str += '<br>';
								str += iconstr;
							}
							first = false;
							let name = items[i].name;
							if(!this.readonly &&  name.length>9){
								str += name.substr(0,8)+'...';
							}else{
								str += name;
							}
						}
						
						if(!this.readonly &&  str.length>23){
							//str = str.substr(0,22)+'...';
							//break;
						}
					}
					
					return str;
				}else{
					return '请选择';
				}
				
				
			}
		},
		props: {
			defaultValue:{
				type: Array
			},config:{
				type: Object
			},readonly:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return {
				model_show:false,
				item_list:[],
				global_checked_first_item:false,
				no_items:['无','未参加','未享受','未得到','无需求','不需要'],
			}
		},
		methods: {
			showNameTip(tip){
				
			},
			doTap(){
				if (this.readonly) {
					return;
				}
				let items = this.config.list;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if (this.defaultValue.includes(item.value)){
						this.$set(item,'checked',true);
					}else{
						this.$set(item,'checked',false);
					}
				}
								
				this.item_list = items;
				let wu_index = this.item_list.length-1;
				
				if( this.no_items.includes(this.item_list[wu_index].name) && this.item_list[wu_index].checked ){
					this.global_checked_first_item = true;
				}else{
					this.global_checked_first_item = false;
				}
				
				this.model_show = true;
				this.$refs.neilModal.showModal();
				
				//this.doMultiSelect({field:this.config.field,list:items});
				//this.$emit('multiSelect',{field:this.field,list:items});
			},
			modelClose(){
				setTimeout(() => {
					this.model_show = false;
				}, 10)
			},
			confirmMultiSelect(){
				
				console.log('confirmMultiSelect');
				let data = this.item_list;
				let tmp = [];
				for (var i = 0, lenI = data.length; i < lenI; ++i) {
					const item = data[i];
					if (item.checked){
						tmp.push(item.value);
					}
				}
				
				this.$emit('fieldChange',{field:this.config.field,value:tmp});
			},
			
			contineCheckboxChange(tmp_checked_first_item){
				
				let wu_index = this.item_list.length -1;
				
				if (!this.no_items.includes(this.item_list[wu_index].name)){
					return;
				}
				
				
				//
				if (tmp_checked_first_item == true){//无被选中
					//console.log('无被选中');
					if (this.global_checked_first_item==false){//无从之前没选中到被选中，把所有其他项变成不选中
						//console.log('无从之前没选中到被选中，把所有其他项变成不选中');
						for (var i = 0, lenI = this.item_list.length; i < lenI-1; ++i) {
							const item = this.item_list[i];
							item.checked=false;
						}
					}else{//无之前已经被选中，列表发生变化说明选中了其他项，去掉无选项
						//console.log('无之前已经被选中，列表发生变化说明选中了其他项，去掉无选项');
						this.item_list[wu_index].checked = false;
						tmp_checked_first_item = false;
					}
				}else{
					// let otherchecked = false;
					// for (var i = 0, lenI = this.item_list.length; i < lenI-1; ++i) {
					// 	const item = this.item_list[i];
					// 	if (item.checked){
					// 		otherchecked= true;
					// 		break;
					// 	}
					// }
					// 
					//无没有被选中，判断 otherchecked 是否有值，如果没有强制 选中无
					//console.log('无没有被选中，判断 values 是否有值，如果没有强制 选中无');
					// console.log(otherchecked);
					// if (!otherchecked) {
					// 	setTimeout(()=> {
					// 		this.item_list[wu_index].checked = true;
					// 	 }, 10);
					// 	tmp_checked_first_item = true;
					// }
					
				}
				
				this.global_checked_first_item = tmp_checked_first_item;
				
				//console.log(this.item_list);
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
			checkBoxTap(item){
				if(item.disable){
					return;
				}
				item.checked = !item.checked;
				
				if (item.checked){
					if (this.config.hasOwnProperty('maxchecked')){
						let maxchecked = this.config['maxchecked'];
						let checkedcount = 0;
						for (var i = 0, lenI = this.item_list.length; i < lenI; ++i){
							const xitem = this.item_list[i];
							if (xitem.checked){
								checkedcount++;
							}
						}
						if (checkedcount>maxchecked){
							uni.showModal({
								title:'提示',
								content:'按数量从多到少，最多选择'+maxchecked+'条',
								showCancel:false
							});
							setTimeout(()=> {
								item.checked = false;
							}, 10);
							return;
						}
					}
				}
				
				
				let tmp_checked_first_item = this.global_checked_first_item;
				
				if (this.no_items.includes(item.name)){
					if (item.checked){
						tmp_checked_first_item=true;
					}else{
						tmp_checked_first_item=false;
					}
				}
				
				let confirmtip ='';
				
				if (tmp_checked_first_item == true && this.global_checked_first_item == false){//无被选中首先查看所有将要被取消的数据里有没有提示数据
					//无从之前没选中到被选中
					for (var i = 0, lenI = this.item_list.length; i < lenI-1; ++i) {
						const xitem = this.item_list[i];
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

					
					uni.showModal({
						content: confirmtip,
						confirmText: "确定",
						cancelText: "取消",
						success:(res)=>{
							if(res.confirm){
								this.contineCheckboxChange(tmp_checked_first_item);
							}else{
								setTimeout(()=> {
									item.checked = !item.checked;
								}, 10);
							}
						}
					});
				}else{
					this.contineCheckboxChange(tmp_checked_first_item);
				}
				
			}
		}
	}
</script>

<style>
	
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
.icon-check {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAQAAAC1QeVaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADeSURBVHjadNC/K8RxHMfxx+frK6cYdMlFGWxGfbP7B5Qs3EhkYlAuZTURJcYrshhkMvgLZDH4A3QDg5/j1d3VNwyX+/peea/PXq/er2dIplRNSOUvVrMSkgd1W17+gFTLuCMDIambcZ9LFS07VXIXaXjtqjy259K7ZoQ4h8rKuICoKzVqHzeqCm34jWkQHBjzYcOXqA1btt3awZJFVDz+7oFJvXaNmMOVs2wssTVDZq3jzWb2QISgacE1qHjqqBArKHrWMO/Ep/NOrKQ/05dK0SeAYYcGwz/ie9Ss/gwAaRc2woaGj78AAAAASUVORK5CYII=);
	background-size:100% 100%;
	display: inline-block;
	width:12px;
	height:12px;
	line-height: 12px;
	margin:0px;
}

	
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
</style>
