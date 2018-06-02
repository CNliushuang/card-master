import * as types from '../mutation-types'

// initial state
const state = {
	groupList:[],//账号组
	total:0,
	currentPage:1,
	limit:20,
}

// getters
const getters = {
	groupList: state => state.groupList,
	total: state => state.total,
	currentPage: state => state.currentPage,
	limit: state => state.limit,

}

// actions
const actions = {
	getGroupList ({commit, state,dispatch},{orgId,parentId,filter,status,searchKey,currentPage,limit}){
		const start = (currentPage-1)*limit;
		return new Promise((resolve,reject)=>{
			$API.group.getGroupList({start,limit,orgId,filter,parentId,status,searchKey},resp => {
    			commit(types.INIT_GROUP_LIST,{resp,currentPage,limit})
				resolve(resp);
			})
	    })
	},
	// getAuthoritiesList ({commit, state,dispatch}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.getAuthoritiesList(resp => {
 //    			commit(types.INIT_AUTHORITIES_LIST,resp)
	// 			resolve(resp);
	// 		})
	//     })
	// },
	// getAccountGroupDetail ({commit, state,dispatch},{uuid}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.getAccountGroupDetail({uuid},resp => {
	// 			resolve(resp);
	// 		})
	//     })
	// },
	deleteGroup ({commit, state,dispatch},{uuid}){
		return new Promise((resolve,reject)=>{
			$API.group.deleteGroup({uuid},resp => {
				resolve(resp);
			})
	    })
	},

	


}



// mutations
const mutations = {
	[types.INIT_GROUP_LIST] (state,{resp,currentPage,limit}) {
		state.currentPage = currentPage;
		state.limit = limit;
	    state.groupList = resp.list;
	    state.total = resp.count;
	},
	// [types.INIT_AUTHORITIES_LIST] (state,resp) {
	//     state.authorities = resp.authorities;
	// },
	


}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

