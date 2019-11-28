<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		prop: ['curDate'],
		watch:{
			curDate: {
				handler: function(val) {
					if(JSON.stringify(this.$store.getters.getUser) == '{}'){
						uni.showToast({
							title:'请先登录'
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/index/login/login'
							})
						}, 1000)
					}
				},
				immediate: true
			}
		},
		onShow() {
			console.log('onshow,lolololololol');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
