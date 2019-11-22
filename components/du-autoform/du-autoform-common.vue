<template>
	<view>
		<view class=" uni-common-pb" style="padding: 0px 5px 60rpx;">
			<view v-for="(list,index) in lists" :key="index">
				<view v-show="list.showby?showByComputed(list):true">
					<view class="padding-sm" style="width:96%;magin:0 auto;">
						<text class="text-xl text-black text-bold">{{list.name}}</text>
					</view>
					<view class="uni-list uni-collapse shadow" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" style="padding-left: 0px;" v-for="(item,key) in list.pages" :key="key">
							<view style="width: 100%;" v-show="showByComputed(item)">
								<view :style="item.style" v-if="item.type=='hr'">
								</view>
								<view style="line-height: 30px;background-color: #eaeff5;flex: 1;padding-left: 10px;color: #666666;" v-else-if="item.type=='title'">
									{{item.name}}
								</view>
								<view class="bg-gray padding-sm" v-else-if="item.type=='text'">
									{{item.text}}
								</view>
								<view v-else-if="item.type=='images'">
									<du-images :readonly="readonlyComputed(item)" :relationId="formData[item.relationIdField]" :config="item" ref="refDUImages" />
								</view>
								<view v-else-if="item.type=='captcha_images'">
									<image :src="formData.captchaURL" @tap="editCaptcha" style="width:200rpx;height:80rpx;margin-top:10rpx;"></image>
								</view>
								<view style="padding: 10px 10px;" class="uni-list-cell-navigate du-list-cell-navigate" :style="item.rowstyle"
								 v-else>
									<view class="uni-list-cell-content">
										<view class="du-content-left" :style="item.style" :class="errorfield==item.field?'errorlabel':''">
											<view class="flex">
												<text class="text-red" v-if="!item.readonly && !item.notrequired">*</text>
												<rich-text :nodes="item.name" @tap="showNameTip(item.nametip)"></rich-text>
											</view>
											<view class="subtitle" v-if="item.subname">
												{{item.subname}}
											</view>
										</view>
										<view class="du-content-right">
											<du-modelselect :readonly="readonlyComputed(item)" :defaultValue="formData[item.field]" @fieldChange="doFieldChange"
											 :config="item" v-if="item.type=='select'" />
											<du-date :readonly="readonlyComputed(item)" :defaultValue="formData[item.field]" @fieldChange="doFieldChange"
											 :config="item" :startDate="formData[item.startref]||''" :endDate="formData[item.endref]||''" v-else-if="item.type=='date'" />
											<du-radio :readonly="readonlyComputed(item)" :defaultValue="formData[item.field]" @fieldChange="doFieldChange"
											 :config="item" v-else-if="item.type=='radio'" />
											<du-sysdict :readonly="readonlyComputed(item)" @fieldChange="doFieldChange" :defaultValue="formData[item.field]"
											 :config="item" v-else-if="item.type=='sysdict'" />
											<du-number-input :readonly="readonlyComputed(item)" @fieldChange="doFieldChange" :defaultValue="formData[item.field]"
											 :config="item" v-else-if="item.type=='numberinput'" />
											<du-input-captcha :readonly="readonlyComputed(item)" @fieldChange="doFieldChange" :defaultValue="formData[item.field]"
											 :config="item" v-else-if="item.type=='input-captcha'" />
											<du-input :readonly="readonlyComputed(item)" @fieldChange="doFieldChange" :defaultValue="formData[item.field]"
											 :config="item" v-else />
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<block v-show="showByComputed({field:'last_field_flag'})"></block>
		</view>
	</view>
</template>

<script>
	import duAutoForm from '@/components/du-autoform/du-autoform.vue'

	import duInputCaptcha from '@/components/du-autoform/du-input-captcha.vue'
	import duInput from '@/components/du-autoform/du-input.vue'
	import duRadio from '@/components/du-autoform/du-radio.vue'
	import duDate from '@/components/du-autoform/du-date.vue'
	import duImages from '@/components/du-autoform/du-images.vue'
	import duModelselect from '@/components/du-autoform/du-modelselect.vue'
	import duSysdict from '@/components/du-autoform/du-sysdict.vue'
	import duNumberInput from '@/components/du-autoform/du-number-input.vue'

	export default {
		name: 'duAutoFormCommon',
		extends: duAutoForm,
		components: {
			duInput,
			duRadio,
			duModelselect,
			duDate,
			duImages,
			duSysdict,
			duNumberInput,
			duInputCaptcha
		},
		data() {
			return {

			}
		},
		computed: {
			captchaUrl: function() {
				return this.captchaImg;
			},
		},
		methods: {

			editCaptcha() {
				this.formData.captchaURL = this.$helper.SERVER_API.SYS_CAPTCHA + '?d=' + Math.random();
			},
		}

	}
</script>
<style>
	.shadow {
		background: #fff;
		border-radius: 16px;
		box-shadow: 1px 1px 5px 0px #aaa;
		margin: 0 auto;
		padding: 20rpx;
		width: 94%;
	}
</style>
