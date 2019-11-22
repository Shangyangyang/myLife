<template>
	<view>

		<view class="flex justify-between " style="color: #888888;padding: 10px;">
			<view  >
				{{config.name}}
			</view>
			<view v-if="!readonly || imgList.length>0">
				{{imgList.length}}/{{maxNum}}
			</view>
			<view v-if="readonly && imgList.length==0">
				未上传
			</view>
		</view>	
					
		<view class="padding-left-sm padding-right-sm">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="item.fileRealPath">
				 <image :src="item.fileRealPath" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" v-if="!readonly">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage2" v-if="imgList.length< maxNum && !readonly">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'DUImages',
		props:{
			relationId:{
				type:String,
			},
			field:{
				type: String
			},
			config:{
				type:Object
			},
			readonly:{
				type:Boolean,
				default: false
			}
		},
		computed:{
			...mapState(['login_user_data']),
		},
		onReady() {
			this.maxNum = this.config.maxNum==undefined?1:this.config.maxNum;
		},
		watch:{
			config: {
				handler:function (val) {
					console.log('watch config');
					let relationId = this.relationId;
					if (relationId!=undefined && relationId!==''){
						
						
						uni.request({
							url: this.$helper.SERVER_API.ATTACHMENT_CALLBACK,
							method:'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded' ,
								"Cookie": uni.getStorageSync('cookieKey')
							},
							data: {
								relationId :relationId,
								style:this.config.styleId
							},
							success: (res) => {
								console.log(res);
								let data = res.data.data;
								if (data!=undefined){
									for (let item of data) {
										
										let path = this.$helper.SERVER_API.ATTACHMENT_GETFILE +"?id="+item.id+"&rnd="+Math.random();
										
										
										let img = {
											isNewRecord:false,
											fileRealPath:path,
											id:item.id
										}
										this.imgList.push(img);
									}
								}
							}
						});

					}
				},
				immediate: true
			}
		},
		data() {
			return {
				imgList: [],
				maxNum:1,
			}
		},
		methods: {
			willUploadFiles(){
				let urls =[];
				for (let img of this.imgList) {
					if (img.isNewRecord == true){
						urls.push({
							path:img.fileRealPath,
							style:this.config.styleId,
						});
					}
				}
				return urls;
			},
			ChooseImage2() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						let path = res.tempFilePaths[0];
						let img = {
							isNewRecord:true,
							fileRealPath:path,
							id:''
						}
						this.imgList.push(img);
					}
				});
			},
			ViewImage(e) {
				
				let urls = this.imgList.map(item => (
					item.fileRealPath
				))
				
				uni.previewImage({
					urls: urls,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '确认',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							let index = e.currentTarget.dataset.index;
							let item = this.imgList[index];
							if (item.isNewRecord === false ){
								uni.showLoading({
									title:"正在删除..."
								})
								uni.request({
									url: this.$helper.SERVER_API.ATTACHMENT_DELETE,
									method:'POST',
									data: {
										id :item.id
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded' ,
										"Cookie": uni.getStorageSync('cookieKey')
									},
									success: (res) => {
										uni.hideLoading();
										console.log(res);
										this.imgList.splice(index, 1);
									},
									fail:(res)=>{
										uni.hideLoading();
										uni.showToast({
											title:'删除失败，请重试',
										});
										console.log(res);
									}
								});
								
								
							}else{
								this.imgList.splice(index, 1);
							}
						}
					}
				})
			},
		}
	}
</script>

<style>
</style>
