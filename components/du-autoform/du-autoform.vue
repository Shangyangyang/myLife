
<script>

	var graceChecker = require("../../common/graceChecker.js");

	let field_show_status = {};//缓存字段是否显示
	let update_field = '';
	
	export default {
		name: 'duAutoForm',
		computed: {
			readonlyComputed() {
				return function(item) {
					if (this.readonly || item.readonly) {
						return true;
					}
					if (item.editableby != undefined) {
						let out_result = this.computShowby(item.editableby);
						return !out_result;
					}
					if (item.disableby != undefined) {
						let out_result = this.computShowby(item.disableby);
						return out_result;
					}
					return false;
				}
			}
		},
		data() {
			
			return {
				readonly: false,

				errorfield: '',
				lists: [],
				formData: {},
				item_config_data:{},

				can_trigger_collapse: false,
			}
		},
		methods: {
			
			
			getUpdateField(){
				return update_field;
			},
			setUpdateField(field){
				update_field = field;
			},
			getAllFieldShowStatus(){
				return field_show_status;
			},
			getFieldShowStatus(field){
				return field_show_status[field];
			},
			setFieldShowStatus(field,status){
				field_show_status[field]=status;
			},
			
			
			willUploadFiles(refid) {
				let result = [];
				let refs = this.$refs['refDUImages'];
				for (let ref of refs) {
					let images = ref.willUploadFiles();
					result = result.concat(images);
				}
				return result;
			},

			showNameTip(tip) {
				if (tip) {
					uni.showToast({
						title: tip,
						icon: "none"
					})
				}
			},

			showConfirm(tip, field, value, todo) {

				uni.showModal({
					content: tip,
					confirmText: "确定",
					cancelText: "取消",
					success: (res) => {
						if (res.confirm) {

							if (todo && todo != undefined) {
								if (todo.op == 'force-set') {
									this.formData[todo.field] = todo.value;
								}
							}

							this.setUpdateField(field);
							this.formData[field] = value;
							if (this.getUpdateField() == this.errorfield) {
								this.errorfield = '';
							}

						} else {

							let tmpvalue = this.formData[field];
							//.log(tmpvalue);
							this.formData[field] = value;
							setTimeout(() => {
								//console.log(tmpvalue);
								this.formData[field] = tmpvalue;
							}, 10);

						}
					}
				});

			},
			release() {
				field_show_status = {}; //缓存字段是否显示
				update_field = '';
			},
			showByComputed(config) {
				let field = config.field||config.id;
				let showby = config.showby;
				let showrelation = config.showrelation;
				
				if (field == 'last_field_flag'){
					console.log('refresh item visible over');
					this.setUpdateField('nothing');
					return false;
				}
				
				if (showby == undefined || field == undefined) {
					return true;
				}
				
				let ufield = this.getUpdateField();
				if (ufield == 'nothing'){
					return this.getFieldShowStatus(field); 
				}
				if (ufield != ''){
					if (showrelation && !showrelation.includes(ufield)){
						return this.getFieldShowStatus(field);
					}
				}
				let out_result = this.computShowby(showby);
				this.setFieldShowStatus(field, out_result);
				return out_result;
			},
			initShowBy(config){
				
				let field = config.field||config.id;
				let showby = config.showby;
				let showrelation = config.showrelation;
				
				if (this.readonly) {
					if (this.formData.hasOwnProperty(field) && (this.formData[field] == "" || this.formData[field] == false)) {
						return false;
					} else if (showby == undefined && showrelation != undefined) {
						let show = false;
						for (let key of showrelation) {
							let nothing = (this.formData[key] == "" || this.formData[key] == false);
							if (!nothing) {
								show = true;
								break;
							}
						}
						return show;
					}
				}
				
				if (showby == undefined || field == undefined) {
					return true;
				}

				let out_result = this.computShowby(showby);
				return out_result;
				
			},
			
			initData(input_data, init_formData, readonly = false) {

				console.log('init');
				this.readonly = readonly;
				this.formData = init_formData;
				this.lists = input_data;
				this.setUpdateField('nothing');
				//console.log(this.formData);

				for (var i = 0, lenI = this.lists.length; i < lenI; ++i) {
					const view = this.lists[i];
					view.open = true;
					let viewvisible = this.initShowBy(view);
					this.setFieldShowStatus(view.id,viewvisible);
					
					for (var j = 0, lenJ = view.pages.length; j < lenJ; ++j) {
						const item = view.pages[j];
						let field = item.field;
						if (field) {
							item.cardindex = i;
							this.item_config_data[field] = item;
							this.setFieldShowStatus(field, this.initShowBy(item));
						}
					}
					
				}


			},
			getPostdate(basefields = []) {

				this.can_trigger_collapse = true;

				this.errorfield = '';
				let postdata = {};
				for (var i = 0, lenI = basefields.length; i < lenI; ++i) {
					let key = basefields[i];
					postdata[key] = this.formData[key];
				}
				
				let all_field = this.getAllFieldShowStatus();
				
				console.log(all_field);
				for (let key in all_field) {
					
					let config = this.item_config_data[key];
					if (config==undefined || key.indexOf("dont_post")==0){
						continue;
					}
					
					
					let show = all_field[key];
					if (show) {

						let value = this.formData[key];
						if (Array.isArray(value)) {
							let array = value;
							for (var i = 0; i < array.length; i++) {
								if (array[i] == "" || array[i] == " " || array[i] == null || typeof(array[i]) == "undefined") {
									array.splice(i, 1);
									i = i - 1;
								}
							}
							value = array.join(',');
						}
						//console.log(key);
						//console.log("config==",config);
						let errMsg = null;

						if (config.notsubmit) {
							continue;
						}

						let pluskey = config.plusfield;
						if (pluskey) {
							let xvalue = this.formData[pluskey];
							if (xvalue !== undefined && xvalue !== '') {
								postdata[pluskey] = xvalue;
							}
						}

						if (value == undefined || value === '') {
							
							let relation_ok = false;

							if (config.notrequired) {
								continue;
							}

							let required_relation = config.required_relation;
							let input_str = (!config.type) ? '填写' : '选择';
							let relation_str = '';
							let relation_str_end = '';
							if (required_relation) {
								let re_value = this.formData[required_relation];
								if (re_value) {
									relation_ok = true;
								} else {
									let re_config = this.item_config_data[required_relation];
									relation_str = '或' + re_config.name;
									relation_str_end = '其中一个';
								}
							}


							if (!relation_ok) {

								if (config.nodataTips) {
									errMsg = config.nodataTips;
								} else {
									let name = config.name;
									let index = name.indexOf("</span>");
									if (index > 0) {
										name = name.substr(index + 7);
									}

									errMsg = name + relation_str + "必须" + input_str + relation_str_end;
								}


							}


						} else {

							if (key.indexOf("_") != -1) {
								let vs = key.split("_");
								let wu_index = config.list.length - 1;
								if (config.list[wu_index].value == value || config.list[wu_index].value + ',' == value) {
									postdata[vs[0]] = value;
								} else {
									postdata[vs[1]] = value;
								}
								continue;
							}


							let validate = config.validate;
							if (validate) {
								//console.log(validate);
								let checkRes = graceChecker.check(value, [validate]);
								if (!checkRes) {
									errMsg = graceChecker.error;
								}
							}
						}

						if (errMsg != null) {

							this.showTip(errMsg);

							this.errorfield = key;
							return null;
						}

						postdata[key] = value;

					}
				}

				console.log(postdata);
				return postdata;

			},
			showTip(errMsg) {
				uni.showModal({
					title: '提示',
					content: errMsg,
					showCancel: false
				})
			},
			triggerCollapse(e, only) {

				if (!this.can_trigger_collapse) {
					return;
				}

				//return;
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						if (only) {
							this.lists[i].open = true;
						} else {
							this.lists[i].open = !this.lists[e].open;
						}

					} else if (only) {
						this.lists[i].open = false;
					}
				}
			},
			doFieldChange(data) {

				if (this.formData[data.field] == data.value) {
					console.log('not change');
					return;
				}

				//处理控件之间的关系
				let field = data.field;
				let config = this.item_config_data[field];
				let relations = config ? config.relations : null;
				if (relations) {
					for (var i = 0; i < relations.length; ++i) {
						let relation = relations[i];

						let where = relation.where;
						let thens = relation.then;

						let okwhere = this.computShowby(where, data.value);
						let stop = false;

						if (okwhere) {

							let array = [];
							if (Array.isArray(thens)) {
								array = [...thens];
							} else {
								array.push(thens);
							}

							for (var j = 0; j < array.length; j++) {
								let then = array[j];

								if (then.op == 'tip&stop') {
									this.showTip(then.tip);
									stop = true;
								} else if (then.op == 'config-add') {

									let xconfig = this.item_config_data[then.field];
									xconfig[then.value] = true;
									//console.log(xconfig);
								} else if (then.op == 'config-remove') {
									let xconfig = this.item_config_data[then.field];
									delete xconfig[then.value];
									//console.log(xconfig);
								} else if (then.op == 'tip&goon') {
									this.showTip(then.tip);
								} else if (then.op == 'confirm') {
									this.showConfirm(then.tip, data.field, data.value, then.todo);
									return;
									//console.log('return zhihou');
								} else if (then.op == 'base-set') {
									let its = data.value.split("_");

									let vl = then.field + '_' + (Number(its[1]) + then.value);

									this.formData[then.field] = vl.toUpperCase();

								} else if (then.op == 'force-set') {
									if (this.formData[then.field] != then.value) {

										if (then.comprelations == 'true') {
											let xdata = {};
											xdata.field = then.field;
											xdata.value = then.value;

											this.doFieldChange(xdata);
										} else {
											this.formData[then.field] = then.value;
										}
									}

								} else if (then.op == 'force-add') {

									let tmp = this.formData[then.field];

									if (then.forceremove) {
										if (tmp.includes(then.forceremove)) {
											tmp.splice(0, 1); //这个0一定是第一个元素
										}
									}

									if (!tmp.includes(then.value)) {
										tmp.push(then.value);
									}
									this.formData[then.field] = tmp;
								} else if (then.op == 'force-remove') {

									let tmp = this.formData[then.field];
									let r_index = -1;
									for (let ix = 0; ix < tmp.length; ix++) {
										if (tmp[ix] == then.value) {
											r_index = ix;
											break;
										}
									}

									if (r_index != -1) {
										tmp.splice(r_index, 1);
									}

									this.formData[then.field] = tmp;
								}
							}


						}

						if (stop) {
							//uni.for
							//uni.$forceUpdate();
							let tmpvalue = this.formData[data.field];
							this.formData[data.field] = data.value;
							setTimeout(() => {
								this.formData[data.field] = tmpvalue;
							}, 10);

							return;
						}
					}
				}


				console.log(data.field + ':' + data.value);

				this.setUpdateField(data.field);
				this.formData[data.field] = data.value;

				if (this.getUpdateField() == this.errorfield) {
					this.errorfield = '';
				}

				//console.log(this.initFormData);
				//console.log(this.formData);

			},

			computList(items) {
				let tmp = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if (item.showby) {
						let result = this.computShowby(item.showby);
						if (result) {
							tmp.push(item);
						}
					} else {
						tmp.push(item);
					}

					if (item.disableby) {
						let result = this.computShowby(item.disableby);
						if (result) {
							item.disable = true;
						} else {
							item.disable = false;
						}
					}

				}
				return tmp;
			},
			computShowby(showby, thisvalue = '') {
				if (showby==undefined){
					return true;
				}
				if (showby == 'true') {
					return true;
				}

				//console.log('showby:'+showby);

				let out_result = true;
				let outshows = showby.split("&&");
				for (let k = 0; k < outshows.length; k++) {
					let strk = outshows[k];
					//console.log(strk);
					let shows = strk.split("||");

					let final_result = false;
					for (let j = 0; j < shows.length; j++) {
						let str = shows[j];
						//console.log(str);
						let result = true;
						let arr = str.split(",");
						for (let i = 0; i < arr.length / 3; i++) {
							//console.log(arr[i*3+1]);

							//console.log(arr[i*3]+arr[i*3+1]+arr[i*3+2]);


							let fieldvalue;
							if (arr[i * 3] == 'this') {
								fieldvalue = thisvalue;
							} else {
								fieldvalue = this.formData[arr[i * 3]];
							}
							//console.log(arr[i*3]+'='+fieldvalue);

							if (arr[i * 3 + 1] == 'show') {

								result = result && getFieldShowStatus(arr[i * 3]);
							} else if (arr[i * 3 + 1] == '=') {

								if (typeof fieldvalue == 'boolean') {
									if (fieldvalue) {
										fieldvalue = 'true';
									} else {
										fieldvalue = 'false';
									}
								}

								result = result && fieldvalue == arr[i * 3 + 2];
							} else if (arr[i * 3 + 1] == '>') {
								result = result && fieldvalue > arr[i * 3 + 2];
							} else if (arr[i * 3 + 1] == '<') {
								result = result && fieldvalue < arr[i * 3 + 2];
							} else if (arr[i * 3 + 1] == '<>') {
								result = result && fieldvalue != arr[i * 3 + 2];
							} else if (arr[i * 3 + 1] == 'in') {

								let inarr = arr[i * 3 + 2].split("|");

								result = result && inarr.includes(fieldvalue);
							} else if (arr[i * 3 + 1] == 'include') {
								//console.log(arr);
								if (fieldvalue) {
									result = result && fieldvalue.includes(arr[i * 3 + 2]);
								} else {
									result = false;
								}
							} else if (arr[i * 3 + 1] == 'notinclude') {
								if (fieldvalue) {
									result = result && !fieldvalue.includes(arr[i * 3 + 2]);
								} else {
									result = false;
								}
								//console.log(arr);
							} else if (arr[i * 3 + 1] == 'empty') {
								if (arr[i * 3 + 2] == 'true') {
									result = result && (fieldvalue == false);
								} else {
									result = result && (fieldvalue != false);
								}

								//console.log(arr);
							}

							//console.log(result);


						}
						final_result = final_result || result;
					}
					out_result = out_result && final_result;
				}

				//console.log(out_result);

				return out_result;
			},

		}
	}
</script>

<style>
	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list-cell::after {
		left: 0upx;
	}

	.uni-collapse .uni-list-cell::after {
		left: 0upx;
	}

	.errorlabel {
		color: #FF3333 !important;
		font-weight: bold;
	}

	.uni-list:before {
		height: 0;
	}

	.subtitle {
		font-size: xx-small !important;
		color: #aaaaaa !important;
	}


	.uni-list-cell-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.du-content-left {
		color: #888888;
		width: 50%;
		margin-left: 0upx;
	}

	.du-content-right {
		flex: 1;
		color: #000000;
	}

	.du-list-cell {}
</style>
