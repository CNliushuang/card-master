<template>
	<div 
	:class="{
		'checkbox': true,
		'disabled':disabled,
		'active': internal ? internalCheck : isCheck,
	}" 
	@click="check"></div>
</template>

<script>
	export default {
		props: {
			isCheck:{
				type: Boolean,
				default: false,
			},
			disabled:{
				type: Boolean,
				default: false,
			},
			internal:{
				type: Boolean,
				default: false,
			}
		},
		methods: {
			check(){
				if(this.internal){
					this.internalCheck = !this.internalCheck;
				}
				this.$emit('check');
			}
		},
		data(){
			return {
				internalCheck: false
			}
		},
		created(){
			if(this.internal){
				this.internalCheck = this.isCheck;
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	@import "~@/config/config.less";
	.checkbox{
		display: inline-block;
	    width: 18px;
	    height: 18px;
	    vertical-align: middle;
	    background-repeat: no-repeat;
	    background-size: 100%;
	    background-image: url(~@/modules/widget/common/images/square.svg);
	    margin-top: -2px;
	    &.active{
	    	background-image: url(~@/modules/widget/common/images/square-active.svg);
	    }
	    &.disabled{
	    	background-image: url(~@/modules/widget/common/images/square-disabled.svg);
	    }
	}
</style>

