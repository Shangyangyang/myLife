<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">添一条</block>
		</cu-custom>
		<form @submit="formSubmit" @reset="formReset">
			<view class="cu-form-group margin-top">
				<view class="title">类别</view>
				<picker @change="PickerChangeType" :value="index" :range="type">
					<view class="type">{{ index > -1 ? type[index] : '是一天的哪顿饭？' }}</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">来源</view>
				<picker @change="PickerChangeSource" :value="index" :range="source">
					<view class="source">{{ index > -1 ? source[index] : '食物从哪来？' }}</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="对食物的简介" name="name" />
			</view>
			<view class="cu-form-group">
				<view class="title">金额</view>
				<input placeholder="花费了多少钱" name="money" />
			</view>
			<br/>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
		<br />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				type: ['早餐', '午餐', '晚餐'],
				source: ['自制', '快餐', '外卖'],
				menuBorder: false,
				menuArrow: false,
				menuCard: false,

				form: {
					type: '',
					source: '',
					name: '',
					money: 0,

				}
			};
		},
		methods: {
			PickerChangeType(e) {
				this.form.type = e.detail.value
			},
			PickerChangeSource(e) {
				this.form.source = e.detail.value
			},
			formSubmit: function(e) {
				var formdata = e.detail.value
				
				this.form.name = formdata.name
				this.form.money = formdata.money
				
				console.log(this.form);
				
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(this.form),
					showCancel: false
				});
			},
            formReset: function(e) {
                console.log('清空数据')
            }
		},
		onLoad() {
			this.index = 1
		}
	};
</script>

<style></style>
