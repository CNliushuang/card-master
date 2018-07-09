<template>
	<div ref="container" class="list_wrapper">
		<div class="filter_list">
			<div class="tree_box">
				<el-tree
			      :data="types"
			      node-key="id"
			      default-expand-all
			      @node-click="clickNode"
			      >
			      <span class="custom-tree-node" slot-scope="{ node, data }">
			        <span>{{ node.label }}</span>
			        <span>
			          <el-button
			            type="text"
			            size="mini"
			            @click="() => append(node,data)">
			            新增产品
			          </el-button>
			          <el-button
			            type="text"
			            size="mini"
			            @click.stop="() => modify(node, data)">
			            修改
			          </el-button>
			          <el-button
			            type="text"
			            size="mini"
			            @click="() => remove(node, data)">
			            删除
			          </el-button>
			        </span>
			      </span>
			    </el-tree>
			    <el-button size="mini" @click="goAddTypes" type="primary">添加产品分类</el-button>

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
<!-- 				    <el-table-column
				    	prop="brandName"
				      label="品牌"
				      show-overflow-tooltip>
				    </el-table-column> -->
				    <el-table-column
				    	prop="typeName"
				      label="车系"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				    	prop="name"
				      label="车型号"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="添加时间"
				      show-overflow-tooltip>
				      <template slot-scope="scope">{{ scope.row.createDate | timesToDate }}</template>
				    </el-table-column>

				    <el-table-column label="操作" width="260" fixed="right">
				      <template slot-scope="scope">
				      	<el-button
				      		v-if="scope.row.status == 0"
				          	size="mini"
				          	@click="enableProduct(scope.row)">启用</el-button>
				        <el-button
				      		v-if="scope.row.status == 1"
				          	size="mini"
				          	@click="disableProduct(scope.row)">禁用</el-button>
				        <el-button
				          size="mini"
				          type="primary"
				          @click="modifyProduct(scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="deleteProduct(scope.row,scope.$index)">删除</el-button>
				      </template>
				    </el-table-column>


				</el-table>
				<div ref="page" class="page">
					<el-pagination
				      	@current-change="handleCurrentChange"
				      	:page-size="limit"
					    layout="prev, pager, next"
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
	import NewTypes from '@/modules/widget/new-types'
	export default{
		data(){
			return {
				list:[],
				tableHeight:200,
				total:0,
				currentPage:1,
				limit:10,
				types:[],
				brandList:[],
				currentNode:null
	
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
				var start = (page-1)*this.limit;
				this.getProductList(start);
			},
			setHeight(){
		    	var container = this.$refs.container.offsetHeight;
		    	var page = this.$refs.page.offsetHeight;
		    	var tableHeight = container -page;
		    	console.log(tableHeight);
		    	this.tableHeight = tableHeight;
		    },
		    goAddTypes(){
		    	NewTypes({
		    		callback:() => {
		    			this.getTreeList();
		    		}
		    	})
		    },
		    
		    clickNode(data,node){
		    	console.log(data);
		    	console.log(node)
		    	this.currentNode = data;
		    	this.getProductList();
		    },
		    getProductList(start){
		    	start = start || 0;
		    	$API.cars.getProductList({typeId:this.currentNode.uuid,status:0,start,limit:this.limit},(data) => {
		    		this.list = data.list;
		    		this.total = data.count;
		    	})
		    },
		    append(node,data){
		    	this.currentNode = data;
		    	AddProduct({
		    		parent:data,
		    		callback:() => {
		    			this.getProductList();
		    		}
		    	})
		    },
		    remove(node,data){
		    	this.$confirm('确定要删除该产分类吗？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			    	$API.cars.deleteProductType({productType:data},() => {
			    		let index = this.types.findIndex(item => item.uuid == data.uuid);
			    		this.types.splice(index,1);
			    		this.$message({
				            type: 'success',
				            message: '删除成功!'
				        });
		    		})
		          
		        }).catch(() => {
		                    
		        });
		    	
		    },
		    modify(node,data){
		    	NewTypes({
		    		productType:data,
		    		callback:(productType) => {
		    			console.log(productType)
		    			for(var items of this.types){
		    				if(items.uuid == productType.uuid){
		    					items.name = productType.name;
		    					items.label = productType.name;
		    					items.parentId = productType.parentId;
		    					items.cover = productType.cover;
		    					items.content = productType.content;
		    					items.brandId = productType.brandId;
		    				}
		    			}

		    			console.log(this.types)


		    		}
		    	})
		    },
		    modifyProduct(data){
		    	AddProduct({
		    		product:data,
		    		callback:() => {

		    		}
		    	})
		    },
		    disableProduct(data){
		    	let product = {
		    		uuid:data.uuid,
		    		status:0
		    	}
		    	$API.cars.modifyProduct({product},() => {
		    		data.status = 0;
		    	})
		    },
		    enableProduct(data){
		    	let product = {
		    		uuid:data.uuid,
		    		status:1
		    	}
		    	$API.cars.modifyProduct({product},() => {
		    		data.status = 1;
		    	})
		    },
		    deleteProduct(data,index){
		    	this.$confirm('确定要删除该产品吗？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	$API.cars.deleteProduct({product_id:data.uuid},() => {
			    		this.list.splice(index,1);
			    		this.$message({
				            type: 'success',
				            message: '删除成功!'
				        });
			    	})
		          
		        }).catch(() => {
		                    
		        });
		    },
		    getData(){
		    	$API.cars.getBrandList({},(resp) => {
		    		console.log(resp);
		    		this.brandList = resp.list;
		    		this.getTreeList();
		    	})
		    },
		    getTreeList(){
		    	let brandId = this.brandList[0].uuid;
	    		$API.cars.getProductTypes({brandId,status:0,parentId:''},(data) => {
	    			console.log(data);
	    			for(var items of data.list){
	    				items.label = items.name;
	    			}
	    			this.types = data.list;

	    			this.currentNode = data.list[0];
	    			this.getProductList();

	    		})
		    }

	    },
	  
		mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
		created(){
			this.getData();
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 8px;
	}
  	.list_wrapper{
  		padding-left: 20px;
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		box-sizing: border-box;
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
  				width: 400px;
  				flex-shrink: 0;
  				border-right: 1px solid #ebeef5;
  			}
  			.filter_table{
  				flex-grow: 1;
  				overflow: auto;
  			}
  		}
  		.page{
  			padding: 10px 0;
  		}
  	}
</style>
