<template>
	<li v-if="showNav" :class="{'expand':isExpand}">
		<div @click="goSwtich" class="title" :class="{'active':(scope == items.uuid)}" :style="filterStyle">{{items.name}}<i v-if="items.children && items.children.length > 0" class="el-icon" :class="{'el-icon-arrow-right':!isExpand,'el-icon-arrow-down':isExpand}"></i></div>
		<ul v-if="items.children && items.children.length > 0">
			<nav-items v-for="item in items.children" :key="item.uuid" :items="item"></nav-items>
		</ul>
	</li>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import {Link} from '@/config/utils'

	export default{
		props:["items"],
		name:"nav-items",
		computed:{
			...mapGetters({
        		openKeys: 'homeStore/home/openKeys',
        		scope: 'homeStore/home/scope',
				user: 'userStore/user/user',
				authorities: 'userStore/user/authorities',
				color:'userStore/user/color',
			}),
			filterStyle(){
				var background = this.color.active_background || '#ffffff';
				var font = this.color.active_font || '#333333';
				var style = {};
				if(this.scope == this.items.uuid){
					style = {
						background:background,
						color:font
					}
				}
				return style;
			},
			isExpand(){
				var result = this.openKeys.indexOf(this.items.uuid) >=0?true:false
				return result;
			},
			showNav(){
				var result = false;
				/*我的信息没有权限*/
				if(this.items.uuid == 'information'){
					result = true;
					return result;
				}
				/*超级管理员可以查看所有权限*/
				if(this.user && this.user.userType == 'SUPER_ADMIN'){
					result = true;
					return result;
				}
				/*判断权限*/
				let key = this.items.children && this.items.children.length > 0?'model':'name';
				let uuid = this.items.uuid;
				for(var items of this.authorities){
					if(items[key] == uuid && (items.readStatus == 1 || items.writeStatus == 1)){
						result = true;
					}
				}
				return result;
			}
		},
		methods:{
			...mapActions({
		        setOpenKeys: 'homeStore/home/setOpenKeys',
		        setBreadCrumb: 'homeStore/home/setBreadCrumb',
		    }),
			goSwtich(){
				if(this.items.children && this.items.children.length > 0){//有子，展开子
					this.setOpenKeys(this.items.uuid);
				}

				// else{
				// 	let bread_crumb = [];
				// 	bread_crumb.push(this.items);
				// 	if(this.items.parent){
				// 		bread_crumb.unshift(this.items.parent);
				// 	}
				// 	this.setBreadCrumb(bread_crumb);
				// }
				Link(this.items.path);


			}
		}
	}
</script>


