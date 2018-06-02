<template>
	<div ref="container" class="list_wrapper">
		<div ref="operate" class="operate clearfix">
			<el-button  @click="goAddProduct" type="primary">新增车辆信息</el-button>
		</div>
		<div class="filter_list">
			<div class="tree_box">
				sfsdfsfs
			</div>
			<div class="filter_table">
				<el-table
				    ref="multipleTable"
				    :data="list"
				    :height="tableHeight"
				    stripe
				    tooltip-effect="dark"
				    style="width: 100%"
				    @selection-change="">
				    <el-table-column
				      label="品牌"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="车系"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="车型号"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="物料链接"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="添加时间"
				      show-overflow-tooltip>
				    </el-table-column>

				    <el-table-column label="操作" width="260" fixed="right">
				      <template slot-scope="scope">
				      	<el-button
				          size="mini"
				          @click="">禁用</el-button>
				        <el-button
				          size="mini"
				          type="primary"
				          @click="">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="">删除</el-button>
				      </template>
				    </el-table-column>


				</el-table>
				<div ref="page" class="page">
					<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage"
				      :page-sizes="[10,20, 30, 40, 50]"
				      :page-size="limit"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
				</div>

			</div>
		</div>
		
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import AddProduct from '@/modules/widget/new-product'
	export default{
		data(){
			return {
				list:[{
					mobile:"18311344273"
				}],
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
			handleCurrentChange(){

			},
			setHeight(){
		    	var container = this.$refs.container.offsetHeight;
		    	var operate = this.$refs.operate.offsetHeight;
		    	var page = this.$refs.page.offsetHeight;
		    	var tableHeight = container - operate -page;
		    	console.log(tableHeight);
		    	this.tableHeight = tableHeight;
		    },
		    goAddProduct(){
		    	AddProduct({

		    	})
		    }
	    },
	  
		mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
		created(){

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
  		.filter_list{
  			display: flex;
  			flex-direction: row;
  			.tree_box{
  				width: 200px;
  				flex-shrink: 0;
  				border-right: 1px solid #ebeef5;
  			}
  			.filter_table{
  				flex-grow: 1;
  			}
  		}
  		.page{
  			padding: 10px 0;
  		}
  	}
</style>
