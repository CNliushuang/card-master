<template>
	<transition name="modal-fade" @after-leave="afterLeave">
		<div class="modal" v-show="show">
			<div class="bg-cover"></div>
			<transition name="container-fade">
				<div class="container" v-show="show">
					<div class="article">
						<div class="header">
							<span class="title">{{ title }}</span>
							<span class="close" title="关闭" @click="close"></span>
						</div>
						<div class="body" :style="{'padding-bottom':isFooter?'0':'20px'}">
							<slot :close="hide"></slot>
						</div>
						<div class="footer" v-if="isFooter">
							<slot name="footer" :close="hide">
								<el-button @click.native="close">取消</el-button>
								<el-button @click.native="submit" type="primary">确定</el-button>
							</slot>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
/**
 * ​显示消息提示框
 * @options title        String      选填    默认: 提示
 * @options isFooter     Boolean     选填    是否显示footer 默认显示 
 * 
 * modal组件提供了3个自定义事件
 * destroy 销毁事件  必传 @destroy="XXXXXXX" 此事件当动画效果结束后销毁父组件
 * close   关闭事件  必传 @close="XXXXXXX"   此事件当modal组件点击关闭时 父组件有需要执行的方法时 才需调用
 * submit  销毁事件  必传 @submit="XXXXXXX"  此事件当modal组件点击提交时 父组件有需要执行的方法时 才需调用 父组件执行时 会得到一个close方法 用来关闭modal组件
 * 
 * modal组件提供了自定义footer按钮
 * <template slot="footer" slot-scope="props">XXXXXXXXXXX</template>
 * 当父组件在绑定按钮事件时 可以从props得到一个close方法 用来关闭modal组件
 */


	export default {
		components: {
		},
		props: {
			title: {
				type: String,
				default: '提示',
			},
			isFooter: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			afterLeave(){
				this.$emit('destroy');
			},
			close(){
				this.hide();
				this.$emit('close');
			},
			submit(){
				this.$emit('submit', () => {
					this.hide();
				});
			},
			hide(){
				this.show = false
			}
		},
		data(){
			return {
				show: false,
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
	.modal{
		position: fixed;
	  left: 0;
	  top: 0;
	  bottom: 0;
	  right: 0;
	  z-index: 999;
	  &.modal-fade-leave-active, &.modal-fade-enter-active {
			transition: opacity .5s 
		}
		&.modal-fade-enter, &.modal-fade-leave-to{
			opacity: 0;
		}
		&.modal-fade-leave &.modal-fade-enter-to {
			opacity: 1;
		}
	  .bg-cover{
	  	background-color: #383838;
	  	opacity: 0.25;
	  	position: absolute;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
	  	height: 100%;
	  }
	  .container{
	  	display: flex;
	  	justify-content: center;
      align-items: center;
	  	position: absolute;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
	  	height: 100%;
	  	&.container-fade-leave-active, &.container-fade-enter-active {
				transition: transform .5s 
			}
			&.container-fade-enter, &.container-fade-leave-to{
				transform: translateY(-100%);
			}
			&.container-fade-leave &.container-fade-enter-to {
				transform: translateY(0);
			}
			.article{
				border-radius: 10px;
				background-color: #fff;
				border: 1px solid @BORDER_COLOR;
				box-shadow: 0 0 24px rgba(0, 0, 0, 0.18);
				min-width: 300px;
				.header{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 50px;
					line-height: 50px;
					border-bottom: 1px solid @BORDER_COLOR;
					padding: 0 30px;
					.title{
						font-size: 16px;
					}
					.close{
						display: inline-block;
						width: 16px;
						height: 16px;
						cursor: pointer;
						background-image: url(~@/modules/widget/common/images/close.svg);
			    	background-repeat: no-repeat;
			    	background-position: center;
			    	&:hover{
			    		background-image: url(~@/modules/widget/common/images/close-active.svg);
			    	}
					}
				}
				.body{
					padding: 20px 30px 0 30px;
				}
				.footer{
					padding: 30px;
					display: flex;
		  			justify-content: center;
		  			& /deep/ .button{
		  				margin-left: 20px;
		  				&:first-child{
		  					margin-left: 0;
		  				}
		  			}
				}
			}
	  }
	}
</style>