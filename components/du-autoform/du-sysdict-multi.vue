<!-- 无障碍改造 改造内容 组件-->

<template>
	<view>
		<neil-modal ref="neilModal" @confirm="confirmMultiSelect" @close="modelClose" title="请选择">
			<scroll-view class="multi-select-content" scroll-y v-if="model_show">
				<view class="uni-list">
					<checkbox-group>
						<label @tap="checkBoxTap(item)" class="uni-list-cell multi-select-cell-pd" style="background-color: #F4F5F6;"
						 v-for="item in item_list" :key="item.value">
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

		<view :class="readonly?'du-navigate-readonly':'du-navigate-right'" @tap="doTap">
			<view :style="readonly?'':'padding: 0px 8px;'" style="text-align: right;line-height: 20px;" :class="[defaultValue.length>0?'du-selected':'du-normol']">
				<rich-text :nodes="value"></rich-text>
			</view>
		</view>

	</view>
</template>


<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	var utils = require("@/common/utils.js");

	export default {
		components: {
			neilModal,
		},
		name: 'DUSysdictMulti',
		computed: {
			value: function() {
				// console.log("value: function()_this.item_list", this.field + this.item_list);
				// console.log("value: function()_this.defaultValue", this.field + this.defaultValue);
				let iconstr = "<span class='icon-check'/>";

				if (this.defaultValue != undefined && this.defaultValue.length > 0) {
					let str = iconstr;
					let first = true;
					for (var i = 0, lenI = this.item_list.length; i < lenI; ++i) {
						let value = this.item_list[i].value;
						if (this.defaultValue.includes(value)) {
							if (!first) {
								str += '<br>';
								str += iconstr;
							}
							first = false;
							let name = this.item_list[i].name;
							if (!this.readonly && name.length > 13) {
								str += name.substr(0, 12) + '...';
							} else {
								str += name;
							}
						}
					}
					return str;
				} else {
					return '请选择';
				}
			}
		},
		watch: {
			config: {
				handler: function(val) {
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
							if (res.data.result == true) {
								let dict = res.data.data;
								let itemDict = [];
								if (dict!=undefined){
									for (let type of dict.list) {
										let item ={
											value:type.value,
											name:type.label
										}
										if(this.defaultValue.includes(item.value)){
											item.checked = true;
										}else{
											item.checked = false;
										}

										itemDict.push(item);
									}
								}
								// console.log("无障碍改造内容申请", itemDict);
								this.item_list = itemDict;
							}
						}
					});
				},
				immediate: true
			}
		},
		props: {
			defaultValue: {
				type: Array
			},
			config: {
				type: Object
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				model_show: false,
				item_list: [],
				global_checked_first_item: false,
				no_items: ['无', '未参加', '未享受', '未得到', '无需求', '不需要'],
			}
		},
		methods: {
			showNameTip(tip) {

			},
			doTap() {
				if (this.readonly) {
					return;
				}
				this.model_show = true;
				this.$refs.neilModal.showModal();
			},
			modelClose() {
				setTimeout(() => {
					this.model_show = false;
				}, 10)
			},
			confirmMultiSelect() {

				console.log('confirmMultiSelect');
				let data = this.item_list;
				let tmp = [];
				for (var i = 0, lenI = data.length; i < lenI; ++i) {
					const item = data[i];
					if (item.checked) {
						tmp.push(item.value);
					}
				}

				this.$emit('fieldChange', {
					field: this.config.field,
					value: tmp
				});
			},

			checkBoxTap(item) {
				if (item.disable) {
					return;
				}
				item.checked = !item.checked;

				if (item.checked) {
					if (this.config.hasOwnProperty('maxchecked')) {
						let maxchecked = this.config['maxchecked'];
						let checkedcount = 0;
						for (var i = 0, lenI = this.item_list.length; i < lenI; ++i) {
							const xitem = this.item_list[i];
							if (xitem.checked) {
								checkedcount++;
							}
						}
						if (checkedcount > maxchecked) {
							uni.showModal({
								title: '提示',
								content: '按数量从多到少，最多选择' + maxchecked + '条',
								showCancel: false
							});
							setTimeout(() => {
								item.checked = false;
							}, 10);
							return;
						}
					}
				}
			}
		}
	}
</script>

<style>
	.multi-select-content {
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
		background-size: 100% 100%;
		display: inline-block;
		width: 12px;
		height: 12px;
		line-height: 12px;
		margin: 0px;
	}


	.du-selected {
		color: #000000;
	}

	.du-normol {
		color: #6260c7;
	}

	.uni-list-cell-readonly {
		padding-right: 0upx;
	}

	.du-radio-select-picker {
		text-align: right;
		align-self: stretch;
		width: 100%
	}

	.du-radio-select-right {
		width: 330upx;
		line-height: 80upx;
		margin-right: 30upx;
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

	.du-navigate-right {
		width: 100%;
	}

	.du-navigate-readonly {
		width: 100%;
		padding-right: 0upx;
	}

	.du-navigate-right:after {
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
