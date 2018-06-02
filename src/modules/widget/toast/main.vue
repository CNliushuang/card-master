<template>
	<transition name="toast-fade" @after-enter="afterEnter" @after-leave="afterLeave">
		<div :class="{ 
			'toast': true,
			'line': mode == 'line',
			'info': type == 'info',
    	'warn': type == 'warn',
    	'success': type == 'success',
    	'error': type == 'error',
		 }" v-if="show">
    	<slot>
    		<div class="icon"></div>
    		<div class="content">{{ content }}</div>
    	</slot>
	  </div>
	</transition>
</template>

<script>

	export default {
		methods: {
			afterEnter(){
				if(this.duration > 0){
					setTimeout(() => {
			    	this.close();
			    }, this.duration);
				}
			},
			afterLeave(){
				this.$el &&
				this.$el.parentNode &&
				this.$el.parentNode.removeChild(this.$el);
				this.$destroy();
			},
			close(){
				this.show = false;
			},
		},
		data(){
			return {
				type: 'info',
				content: '',
				duration: 1500,

				show: false,

				mode: null,
			}
		},
		mounted() {
		  this.$nextTick(() => {
		    this.show = true;
		  });
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/config/config.less";

  .toast{
  	display: flex;
    align-items: center;
  	min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%, 30px);
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    z-index: 999;
    &.line{
    	left: 0;
    	transform: translate(0, 0);
    	min-width: auto;
    	width: 100%;
    	border-radius: 0;
    	padding: 15px 0;
    	justify-content: center;
    	&.toast-fade-enter, &.toast-fade-leave-to{
				transform: translate(0, -100%);
			}
			&.toast-fade-leave &.toast-fade-enter-to {
				transform: translate(0, 0);
			}
    }
    &.toast-fade-leave-active, &.toast-fade-enter-active {
			transition: transform .5s;
		}
		&.toast-fade-enter, &.toast-fade-leave-to{
			transform: translate(-50%, -100%);
		}
		&.toast-fade-leave &.toast-fade-enter-to {
			transform: translate(-50%, 30px);
		}
		&.info{
			border: 1px solid #bce8f1;
			background-color: #d9edf7;
			color: @COMMON_BLUE;
			.icon{
  			background-image: url(~@/modules/widget/images/info_fill.svg);
  		}
  	}
  	&.warn{
  		border: 1px solid #faebcc;
			background-color: #fcf8e3;
			color: #eb9e05;
  		.icon{
  			background-image: url(~@/modules/widget/images/warn_fill.svg);
  		}
  	}
  	&.success{
  		border: 1px solid #d6e9c6;
			background-color: #dff0d8;
			color: #67c23a;
  		.icon{
  			background-image: url(~@/modules/widget/images/round_check_fill.svg);
  		}
  	}
  	&.error{
  		border: 1px solid #ebccd1;
			background-color: #f2dede;
			color: #fa5555;
  		.icon{
  			background-image: url(~@/modules/widget/images/round_close_fill.svg);
  		}
  	}
    .icon{
    	width: 18px;
    	height: 18px;
    	background-repeat: no-repeat;
    	background-size: 100%;
    }
    .content{
    	font-size: 14px;
    	margin-left: 10px;
    }
	}
</style>