<template>
	<div class="live_breadcrumb">
		<div v-for="(items,index) in bread_crumb" class="items">
			<span class="name">{{items.name}}</span>
			<span v-if="index < bread_crumb.length-1 && bread_crumb.length > 1" class="icon el-icon-arrow-right"></span>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
    computed: {
      ...mapGetters({
        bread_crumb: 'homeStore/home/bread_crumb',
      })
    },
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.live_breadcrumb{
  		font-size: 14px;
    	line-height: 1;
    	height: 40px;
    	line-height: 40px;
    	padding-left: 20px;
    	box-sizing: border-box;
  		.items{
  			float: left;
  			.name{
  				font-weight: 700;
			    transition: color .2s cubic-bezier(.645,.045,.355,1);
			    color: #303133;
			    &:hover{
			    	color: #409eff;
    				cursor: pointer;
			    }
  			}
  			.icon{
  				color: #c0c4cc;
  				margin: 0 6px;
  			}
  			&:last-child{
  				.name{
					font-weight: 400;
					color: #606266;
					cursor: text;
  				}
  			}
  		}
  	}

</style>
