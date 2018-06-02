<template>
	<div class="box">
		<h1>组件库地址：<a href="http://element-cn.eleme.io/#/zh-CN/component/installation" target="_blank">Element</a></h1>
		<div class="group">
			<el-button>默认按钮</el-button>
			<el-button type="primary">主要按钮</el-button>
			<el-button type="success">成功按钮</el-button>
			<el-button type="info">信息按钮</el-button>
			<el-button type="warning">警告按钮</el-button>
			<el-button type="danger">危险按钮</el-button>
		</div>

		<div class="group">
			<el-button plain>朴素按钮</el-button>
			<el-button type="primary" plain>主要按钮</el-button>
			<el-button type="success" plain>成功按钮</el-button>
			<el-button type="info" plain>信息按钮</el-button>
			<el-button type="warning" plain>警告按钮</el-button>
			<el-button type="danger" plain>危险按钮</el-button>
		</div class="group">

		<div class="group">
			<el-button round>圆形按钮</el-button>
			<el-button type="primary" round>主要按钮</el-button>
			<el-button type="success" round>成功按钮</el-button>
			<el-button type="info" round>信息按钮</el-button>
			<el-button type="warning" round>警告按钮</el-button>
			<el-button type="danger" round>危险按钮</el-button>
		</div class="group">

		<div class="group">
			<el-button disabled>默认按钮</el-button>
			<el-button type="primary" disabled>主要按钮</el-button>
			<el-button type="success" disabled>成功按钮</el-button>
			<el-button type="info" disabled>信息按钮</el-button>
			<el-button type="warning" disabled>警告按钮</el-button>
			<el-button type="danger" disabled>危险按钮</el-button>
		</div>

		<div class="group">
			<el-button plain disabled>朴素按钮</el-button>
			<el-button type="primary" plain disabled>主要按钮</el-button>
			<el-button type="success" plain disabled>成功按钮</el-button>
			<el-button type="info" plain disabled>信息按钮</el-button>
			<el-button type="warning" plain disabled>警告按钮</el-button>
			<el-button type="danger" plain disabled>危险按钮</el-button>
		</div>
		<div class="group">
			<el-button type="primary" :loading="true">加载中</el-button>
		</div>
		<div class="group">
			<el-button>默认按钮</el-button>
			<el-button size="medium">中等按钮</el-button>
			<el-button size="small">小型按钮</el-button>
			<el-button size="mini">超小按钮</el-button>
		</div>
		<div class="group">
			<el-button round>默认按钮</el-button>
			<el-button size="medium" round>中等按钮</el-button>
			<el-button size="small" round>小型按钮</el-button>
			<el-button size="mini" round>超小按钮</el-button>
		</div>
		<div class="group">
			<el-radio v-model="radio" label="1">备选项</el-radio>
			<el-radio v-model="radio" label="2">备选项</el-radio>
		</div>
		<div class="group">
			<el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
			<el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
		</div>
		<div class="group">
			<el-checkbox v-model="checked">备选项</el-checkbox>
		</div>

		<div class="group">
			<el-input v-model="input" placeholder="请输入内容"></el-input>
			<el-input
				placeholder="请输入内容"
				v-model="input"
				:disabled="true">
			</el-input>
			<el-input
				placeholder="请输入内容"
				v-model="input"
				clearable>
			</el-input>
		</div>
		<div class="group">
			<div class="block">
			    <el-date-picker
			      v-model="datetime"
			      type="datetime"
			      placeholder="选择日期时间">
			    </el-date-picker>
			</div>
			<div class="block">
			    <el-date-picker
			      v-model="date"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			</div>
			<el-time-select
			  v-model="time"
			  :picker-options="{
			    start: '08:30',
			    step: '00:15',
			    end: '18:30'
			  }"
			  placeholder="选择时间">
			</el-time-select>
		</div>
		<div class="group">
			<el-button :plain="true" @click="open2">成功</el-button>
			<el-button :plain="true" @click="open3">警告</el-button>
			<el-button :plain="true" @click="open">消息</el-button>
			<el-button :plain="true" @click="open4">错误</el-button>
			<el-button type="text" @click="open5">点击打开 Message Box</el-button>
		</div>



	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		data () {
	      	return {
	        	radio: '1',
	        	checked:false,
	        	input:'',
	        	datetime:'',
	        	date:'',
	        	time:''
	      	};
	    },
		methods:{
			open() {
		        this.$message('这是一条消息提示');
		    },
		    open2() {
		        this.$message({
		          message: '恭喜你，这是一条成功消息',
		          type: 'success'
		        });
		    },

		    open3() {
		        this.$message({
		          message: '警告哦，这是一条警告消息',
		          type: 'warning'
		        });
		    },

		    open4() {
		        this.$message.error('错了哦，这是一条错误消息');
		    },

		    open5() {
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    }
		}

	}
</script>


<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
	.box{
		padding: 20px;
		height: 100%;
		overflow: auto;
		h1{
			margin-bottom: 20px;
		}
		.group{
			margin: 20px 0;
		}
	}

</style>






