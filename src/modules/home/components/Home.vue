<template>
	<div class="app_wrapper">
		<div class="header">
			<div class="logo">
				后台管理系统
			</div>
			<div class="user">
				<el-dropdown trigger="click" @command="handleCommand">
				  <span class="el-dropdown-link">
				    {{user.nickname || user.loginName}}
				    <i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="signout">退出登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="container">
			<div class="aside">
				<ul class="root">
					<nav-items v-for="items in nav" :key="items.uuid" :items="items"></nav-items>
				</ul>
			</div>
			<div class="wrapper">
				<div v-if="$route.path != '/home'" class="bread_crumb">
					<bread-crumb></bread-crumb>
				</div>
				<div class="router_container">
	    			<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
	

</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import BreadCrumb from './BreadCrumb';
	import NavItems from './NavItems'
	import {Link} from '@/config/utils'
	export default{
		components:{
			BreadCrumb,
			NavItems
		},
		computed: {
			...mapGetters({
				user: 'userStore/user/user',
				nav: 'homeStore/home/nav',
			}),
	    },
		data(){
			return {
			}
		},
		methods:{
			...mapActions({
		        setOpenKeysDirect: 'homeStore/home/setOpenKeysDirect',
		    }),
		    switchNav(){
		    },
		    handleCommand(command) {
		    	console.log(command)
		    	if(command == 'signout'){//退出登录
		    		var requestParam = {
		                plat:'web',
		            }
          			$axios.defaults.params = requestParam;//重新修改全局联网配置
					localStorage.setItem('requestParam','');
					Link('/login');
		    	}else if(command == 'kf'){
		    		
		    	}
	      	},
	      	setAllNavOpen(){
	      		console.log("set all nav open")
	      		for(var items of this.nav){
	      			if(items.children && items.children.length > 0){
	      				this.setOpenKeysDirect(items.uuid);
	      			}
	      		}
	      	}
		},
		created(){
			this.$store.dispatch('homeStore/home/initNav')
			this.setAllNavOpen();

		}

	}
</script>


<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.app_wrapper{
  		width: 100%;
  		height: 100%;
  		display: flex;
  		flex-direction: column;
  		.header{
  			height: 48px;
  			line-height: 48px;
  			width: 100%;
  			padding: 0 20px 0 0;
  			flex-shrink: 0;
			min-height: 48px;
		    background-color: hsla(0,0%,100%,.95);
		    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
		    position: relative;
		    z-index: 10;
		    box-sizing: border-box;
		    .logo{
		    	float: left;
		    	font-size: 20px;
		    	padding-left: 20px;
		    	img{
		    		height: 48px;
		    	}
		    }
		    .user{
		    	cursor: pointer;
		    	float: right;
		    	.el-icon{
		    		margin-left: 4px;
		    	}
		    }
  		}
  		.container{
  			flex-grow: 1;
			display: flex;
			flex-direction: row;
			*{
				box-sizing: border-box;
			}
			.aside{
				width: 240px;
				background: #f4f4f4;
				flex-shrink: 0;
				border-right: 1px solid #e4e4e4;
				position: relative;
				ul{
					&.root{
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						overflow: auto;
					}
					/deep/ li{
						.title{
							height: 40px;
						    line-height: 40px;
						    padding: 0 16px 0 20px;
						    cursor: pointer;
						    font-size: 14px;
						    position: relative;
						    &.active,&:hover{
						    	background: #fff;
						    }
						    .el-icon{
								position: absolute;
								right: 4px;
								top: 12px;
								font-size: 16px;
							}
						}
						ul{
							display: none;
						}
						&.expand{
							ul{
								display: block;
							}
						}
					}
					/deep/ ul{
						li{
							.title{
								padding-left: 40px;
							}
						}
					}
				}
			}
			.wrapper{
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				.bread_crumb{
					height: 40px;
					flex-shrink: 0;
				}
				.router_container{
					flex-grow: 1;
					position: relative;
					height: 0;
				}
			}
		}
  	}
	

</style>






