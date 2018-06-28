<template>
	<div ref="container" class="list_wrapper">
		<!-- <div ref="operate" class="operate">
			<el-button  @click="goNewAccount" type="primary">新增用户</el-button>
		</div> -->
		<div class="filter_list">
			<el-table
			    ref="multipleTable"
			    :data="list"
			    :height="tableHeight"
			    stripe
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="">
			    <el-table-column
			   	  prop="mobile"
			      label="手机号码"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="wechatId"
			      label="微信id"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="注册时间"
			      show-overflow-tooltip>
			      <template slot-scope="scope">{{ scope.row.createDate | timesToDate('yyyy-MM-dd HH:mm:ss') }}</template>
			    </el-table-column>
			    <el-table-column
			      label="最近一次登录"
			      show-overflow-tooltip>
			      <template slot-scope="scope">{{ scope.row.lastUpDate | timesToDate('yyyy-MM-dd HH:mm:ss') }}</template>
			    </el-table-column>
			    <el-table-column label="操作" width="260" fixed="right">
			      <template slot-scope="scope">
			      	<el-button
			      	  v-if="scope.row.status == 1"
			          size="mini"
			          type="danger"
			          @click="modifyAccount(scope.row,0)">禁用</el-button>
		<!-- 	        <el-button
			          v-if="scope.row.status == -1"
			          size="mini"
			          @click="">编辑</el-button> -->
			        <el-button
			          v-if="scope.row.status == 0"
			          size="mini"
			          type="primary"
			          @click="modifyAccount(scope.row,1)">启用</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="deleteAccount(scope.row,scope.$index)">删除</el-button>
			      </template>
			    </el-table-column>


			</el-table>
		</div>
		<div ref="page" class="page">
			<el-pagination
		      @current-change="handleCurrentChange"
		      :page-size="limit"
		      layout="prev, pager, next"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		data(){
			return {
				list:[],
				tableHeight:200,
				total:0,
				currentPage:1,
				limit:10,
	
			}
		},
		computed:{
			...mapGetters({
				user: 'userStore/user/user',
			}),
		},
		methods:{
			handleSizeChange(){

			},
			handleCurrentChange(page){
				let start = (page-1)*this.limit;
				this.getAccountlist(start);
			},
			setHeight(){
		    	var container = this.$refs.container.offsetHeight;
		    	var page = this.$refs.page.offsetHeight;
		    	var tableHeight = container -page -24;
		    	console.log(tableHeight);
		    	this.tableHeight = tableHeight;
		    },
		    getAccountlist(start){
		    	start = start || 0;
		    	$API.account.getAccountList({start,limit:this.limit},(data) => {
		    		this.list = data.list;
		    		this.total = data.count;
		    	})
		    },
		    modifyAccount(data,status){
		    	var account = {
		    		uuid:data.uuid,
		    		status
		    	}
		    	$API.account.modifyAccount({account},(data) => {
		    		this.getAccountlist();
		    	})
		    },
		    deleteAccount(data,index){
		    	this.$confirm('确定要删除该账号吗？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	$API.account.deleteAccount({account_id:data.uuid},() => {
		        		this.list.splice(index,1);
			          	this.$message({
			            	type: 'success',
			            	message: '删除成功!'
			          	});
		        	})
		        }).catch(() => {
		                   
		        });
		    }
	    },
	  
		mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
		created(){
			this.getAccountlist();
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.list_wrapper{
  		padding-left: 20px;
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		overflow: auto;
  		.operate{
  			padding: 10px 0;
  			/deep/ .el-button{
  				float: left;
  				margin-right: 10px;
  			}
  		}
  		.page{
  			padding: 10px 0;
  		}
  	}
</style>
