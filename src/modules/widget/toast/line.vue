<template>
	<div class="line">
		<div class="line-content">
			<div>{{ content }}</div>
			<div class="refresh" @click="refreshWindow" v-title="'刷新页面'"></div>
			<div class="view-url" @click="urlShow = !urlShow" v-if="url">查看详情</div>
		</div>
		<div class="line-url" v-if="urlShow && url">{{ url }}</div>
	</div>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: null,
			},
			url: {
				type: String,
				default: null,
			},
		},
		methods: {
			refreshWindow(){
				window.location.reload();
			}
		},
		data(){
			return {
				urlShow: false,
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/config/config.less";

  .line{
  	width: 100%;
  	.line-content{
  		display: flex;
    	justify-content: center;
    	width: 100%;
    	font-size: 14px;
    	.refresh{
	    	width: 18px;
	    	height: 18px;
	    	background-image: url(~@/modules/widget/images/refresh.svg);
	    	background-repeat: no-repeat;
	    	background-size: 100%;
	    	cursor: pointer;
	    	margin-left: 10px;
	    }
    	.view-url{
	    	cursor: pointer;
	    	margin-left: 10px;
	    }
  	}
  	.line-url{
    	width: 100%;
    	text-align: center;
    	margin-top: 15px;
    }
  }
</style>