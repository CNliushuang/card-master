<template>
	<div class="user_info">
		<div class="title">账号信息</div>
		<div class="group clearfix">
			<div class="items">
				<div class="name">账号名称</div>
				<div class="content">
					<el-input :value="user.loginName" placeholder="" :readonly="true"></el-input>
				</div>
			</div>
			<div class="items password">
				<div class="name">密码</div>
				<div class="content">
					<el-input type="password" :value="user.password" placeholder="" :disabled="true"></el-input>
					<span @click="goChangePassword" class="change_password">修改</span>
				</div>
			</div>
			<div class="items">
				<div class="name">账号组</div>
				<div class="content">
					<el-input :value="user.authorityGroup && user.authorityGroup.name" placeholder="" :readonly="true"></el-input>
				</div>
			</div>
			<div class="items">
				<div class="name">数据级别</div>
				<div class="content">
					<el-input :value="user.authorityGroup && user.authorityGroup.orgType | filterOrgType" placeholder="" :readonly="true"></el-input>
				</div>
			</div>
			<div class="items">
				<div class="name">账号ID</div>
				<div class="content">
					<el-input :value="user.id" placeholder="" :readonly="true"></el-input>
				</div>
			</div>
		</div>
		<div class="title">管理员信息</div>
		<div class="group clearfix">
			<div class="items">
				<div class="name">管理员姓名</div>
				<div class="content">
					<el-input :value="user.nickname" placeholder="" :readonly="true"></el-input>
				</div>
			</div>
			<div class="items mobile">
				<div class="name">联系电话</div>
				<div class="content">
					<el-input @change="changeMobile" @keyup.native.enter="goChangeMobile" type="number" :value="user.mobile" placeholder="" :readonly="isEdit?false:true"></el-input>
					<span v-if="!isEdit" @click="goModify" class="modify">修改</span>
					<template v-if="isEdit">
						<span @click="cancelModify" class="modify">取消</span>
						<span @click="goChangeMobile" class="submit">提交</span>
					</template>
				</div>
			</div>
		</div>
		<template v-if="system && user && !user.platId && !user.unionId">
			<div class="title">系统信息</div>
			<div class="group clearfix">
				<div class="items">
					<div class="name">系统名称</div>
					<div class="content">
						<el-input :value="system.name" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">平台数量</div>
					<div class="content">
						<el-input :value="system.platCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">公会数量</div>
					<div class="content">
						<el-input :value="system.unionCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">艺人数量</div>
					<div class="content">
						<el-input :value="system.actorCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
			</div>
		</template>
		<template v-if="platInfo && user &&  !user.unionId">
			<div class="title">平台信息</div>
			<div class="group clearfix">
				<div class="items">
					<div class="name">平台名称</div>
					<div class="content">
						<el-input :value="platInfo.name" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">平台ID</div>
					<div class="content">
						<el-input :value="platInfo.id" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">平台分成</div>
					<div class="content">
						<el-input :value="platInfo.shareRatio" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">入账阈值</div>
					<div class="content">
						<el-input :value="platInfo.entryMax" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">公会数量</div>
					<div class="content">
						<el-input :value="platInfo.unionCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">艺人数量</div>
					<div class="content">
						<el-input :value="platInfo.actorCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
			</div>
		</template>
		<template v-if="unionInfo">
			<div class="title">公会信息</div>
			<div class="group clearfix">
				<div class="items">
					<div class="name">公会名称</div>
					<div class="content">
						<el-input :value="unionInfo.name" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">公会ID</div>
					<div class="content">
						<el-input :value="unionInfo.id" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">归属平台</div>
					<div class="content">
						<el-input :value="unionInfo.parentOrg && unionInfo.parentOrg.name" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">分成比例</div>
					<div class="content">
						<el-input :value="unionInfo.shareRatio" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">税点</div>
					<div class="content">
						<el-input :value="unionInfo.taxRatio" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">代发工资</div>
					<div class="content">
						<el-input :value="unionInfo.autoPay == 0?'代发工资':'自动'" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				
				<div class="items">
					<div class="name">艺人数量</div>
					<div class="content">
						<el-input :value="unionInfo.actorCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
				<div class="items">
					<div class="name">经纪人数量</div>
					<div class="content">
						<el-input :value="unionInfo.brokerCount" placeholder="" :readonly="true"></el-input>
					</div>
				</div>
			</div>
		</template>


	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import ChangePassword from '@/modules/widget/change-password'



	export default{
		data(){
			return {
				isEdit:false,
				mobile:""
			}
		},
		computed: {
			...mapGetters({
				user: 'userStore/user/user',
				authorities: 'userStore/user/authorities',
				system: 'userStore/user/system',
				platInfo: 'userStore/user/platInfo',
				unionInfo: 'userStore/user/unionInfo',
			}),
			filterLimit(){
				if(this.user.userType == 'SUPER_ADMIN'){
					return '超级管理员';
				}else{
					var result = [];
	                if(this.authorities && this.authorities.length > 0){
	                    for(var items of this.authorities){
	                        if(items.readStatus || items.writeStatus){
	                            result.push(items.summary);
	                        }
	                    }
	                }
	                return result.join('，');
				}
            }
	    },
	    methods:{
	    	goChangePassword(){
	    		ChangePassword({
	    			callback:() => {
	    				
	    			}
	    		})
	    	},
	    	goModify(e){
	    		$(e.target).parent().find('input').focus();
	    		this.isEdit = true;
	    	},
	    	cancelModify(e){
	    		this.isEdit = false;
	    		this.mobile = '';
	    	},
	    	changeMobile(mobile){
	    		this.mobile = mobile;
	    	},
	    	goChangeMobile(){
	    		if(this.mobile && this.mobile != this.user.mobile){
	    			this.$store.dispatch('userStore/user/changeMobile',{uuid:this.user.uuid,mobile:this.mobile}).then(() => {
	    				this.isEdit = false;
	    				this.mobile = ''
	    			})
	    		}
	    	}
	    },
	    mounted(){
	    }
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.user_info{
  		padding: 20px;
  		box-sizing: border-box;
  		overflow:auto;
  		height:100%;
  		.title{
  			height:30px;
  			line-height:30px;
  			font-size:14px;
  			background:#f4f4f4;
  			padding: 0 0 0 10px;
  		}
  		.group{
  			margin-top:10px;
  			max-width:800px;
  			.items{
	  			font-size: 14px;
	  			height: 30px;
	  			line-height: 30px;
	  			margin-bottom: 15px;
	  			float:left;
	  			width:50%;
	  			box-sizing:border-box;
	  			min-width:200px;
	  			.name{
	  				font-size: 14px;
	  				width: 90px;
	  				float: left;
	  				text-align: right;
	  			}
	  			.content{
	  				margin-left: 110px;
	  				position:relative;
	  				input{

	  				}
	  			}


	  			&.password{
	  				.change_password{
	  					position:absolute;
	  					font-size:12px;
	  					color:@COMMON_BLUE;
	  					right:-30px;
	  					top:2px;
	  					cursor:pointer;
	  				}
	  			}

	  			&.mobile{
	  				.modify{
	  					position:absolute;
	  					font-size:12px;
	  					color:@COMMON_BLUE;
	  					right:-30px;
	  					top:2px;
	  					cursor:pointer;
	  				}
	  				.submit{
	  					position: absolute;
	  					right: -94px;
	  					top: 2px;
	  					cursor: pointer;
  					    display: inline-block;
					    line-height: 1;
					    white-space: nowrap;
					    cursor: pointer;
					    background: #fff;
					    border: 1px solid #dcdfe6;
					    color: #606266;



					    -webkit-appearance: none;
					    text-align: center;
					    -webkit-box-sizing: border-box;
					    box-sizing: border-box;
					    outline: 0;
					    margin: 0;
					    -webkit-transition: .1s;
					    transition: .1s;
					    font-weight: 500;
					    padding: 7px 12px;
					    font-size: 12px;
					    border-radius: 4px;
					     color: #fff;
					    background-color: #409EFF;
					    border-color: #409EFF;
					    &:hover{
				    	    background: #66b1ff;
						    border-color: #66b1ff;
						    color: #fff;
					    }
	  				}
	  			}

	  		}
  		}
  		
  	}




</style>

