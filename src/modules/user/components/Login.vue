<template>
	<div class="login">
		<div class="login_wrapper">
			<div class="login_card">
				<div class="card_header">
					登录<span class="name">后台管理系统</span>
				</div>
				<div class="card_form">
					<div class="card_title">输入您的帐号、密码登录</div>
					<el-input @keyup.enter.native="goLogin" :autofocus="true" v-model="loginInfo.identify" placeholder="用户名/手机号" clearable></el-input>
					<el-input @keyup.enter.native="goLogin" v-model="loginInfo.password" placeholder="密码" type="password" clearable></el-input>
					<el-button type="primary" @click="goLogin" :loading="locked">登录</el-button>
				</div>
			</div>
		</div>


	</div>
</template>
<script>
	import { Link } from '@/config/utils'
	import {mapGetters,mapActions} from 'vuex';
	export default{
		data(){
			return {
				loginInfo:{
					identify:'',
					password:''
				},
				locked:false
			}
		},
		methods:{
			...mapActions({
		        login: 'userStore/user/login',
		    }),
			goLogin(){
				if(!this.loginInfo.identify){
					this.$message({
			          showClose: true,
			          message: '请输入用户名/手机号',
			          type: 'error'
			        });
			        return false;
				}
				if(!this.loginInfo.password){
					this.$message({
			          showClose: true,
			          message: '请输入密码',
			          type: 'error'
			        });
			        return false;
				}
				if(!this.locked){
					this.locked = true;
					setTimeout(() => {
						this.locked = false;
					},5000)
					this.login({identify:this.loginInfo.identify,password:this.loginInfo.password}).then((resp) => {
						if(resp.result == 0){
							Link('/account')
						}else{
							this.$message({
					          message: resp.msg || '登录失败，请检查网络连接',
					          type: 'error'
					        });
						}
						this.locked = false;
					})
				}
				
			}
		}

	}
</script>


<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
	.login{
		width: 100%;
		height: 100%;
		overflow-y: auto;
	    background-image: url(~@/modules/user/images/signup-bg.png);
	    background-size: cover;
	    background-position: left center;
	    .login_wrapper{
	    	display: block;
		    max-width: 500px;
		    margin: 0 auto;
		    padding: 90px 0 30px 0;
		    width: 100%;
		    .login_card{
		    	background: #fff;
			    box-shadow: 0 0 20px rgba(0,0,0,.08), inset 0 0 3px #fff;
			    padding: 20px;
			    border-radius: 4px;
			    .card_header{
			    	border-bottom: solid 1px #eaeaea;
				    padding-bottom: 13px;
				    position: relative;
				    font-size: 22px;
				    color: #4d5250;
				    letter-spacing: 2px;
				    padding-left: 10px;
				    .name{
				    	color: @COMMON_ALERT;
				    }
			    }
			    .card_form{
			    	padding: 20px 20px 0 20px;
			    	.card_title{
			    		font-size: 15px;
					    display: block;
					    color: @MAIN_COLOR_FIVE;
					    margin-bottom: 20px;
			    	}
			    	/deep/ .el-input{
			    		margin-bottom: 15px;
			    		.el-input__inner{
			    			height: 40px !important;
			    		}
			    	}
			    	/deep/ .el-button{
			    		display: block;
			    		width: 100%;
			    		margin: 0 auto;
			    		font-size: 16px;
			    		height: 40px;
			    	}
			    }
		    }
	    }
	}

</style>






