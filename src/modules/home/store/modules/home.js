import * as types from '../mutation-types'

// initial state
const state = {
  scope: 'nav_information',
  openKeys:[],
  bread_crumb:[],
  nav:[
    // {
    //   name:"我的信息",
    //   path:"/information",
    //   uuid:"information"
    // },
    {
      name:"用户管理",
      path:"/account",
      uuid:"account",
    },{
      name:"产品管理",
      path:"/cars",
      uuid:"cars",
    },
  ],
  navMaps:{}
}

// getters
const getters = {
  scope: state => state.scope,
  openKeys: state => state.openKeys,
  bread_crumb: state => state.bread_crumb,
  nav: state => state.nav,
  navMaps: state => state.navMaps,
}

// actions
const actions = {
  switchScope({ commit, state }, scope) {
    commit('SWITCH_SCOPE', scope);
  },
  setOpenKeys({ commit, state},key){
    commit('SET_OPEN_KEYS', key);
  },
  setOpenKeysDirect({ commit, state},key){
    commit('SET_OPEN_KEYS_DIRECT', key);
  },
  setBreadCrumb({ commit, state},list){
    commit('SET_BREAD_CRUMB', list);
  },
  initNav({ commit, state}){
    commit('INIT_NAV');
  },
  chagneRouter({commit,state,dispatch},{router}){
    dispatch('initNav');
    const path = router.path;
    let maps = state.navMaps;
    var nav = null;
    for(var key in maps){
      if(maps[key].path == path){
        nav = maps[key];
      }
    }
    if(nav){
      // dispatch('setOpenKeys',nav.uuid);
      dispatch('switchScope',nav.uuid);
      let bread_crumb = [];
      bread_crumb.push(nav);
      if(nav.parent){
        bread_crumb.unshift(nav.parent);
        // dispatch('setOpenKeysDirect',nav.parent.uuid);
      }
      dispatch('setBreadCrumb',bread_crumb)
    }
  }


}

// mutations
const mutations = {
  [types.SWITCH_SCOPE](state, scope) {
    state.scope = scope;
  },
  [types.SET_OPEN_KEYS](state, key) {
    const index = state.openKeys.findIndex(item => item == key);
    if(index >= 0){
      state.openKeys.splice(index,1);
    }else{
      state.openKeys.push(key);
    }
  },
  [types.SET_OPEN_KEYS_DIRECT](state, key) {
    const index = state.openKeys.findIndex(item => item == key);
    if(index >= 0){
    }else{
      state.openKeys.push(key);
    }
  },


  [types.SET_BREAD_CRUMB](state, list) {
    const home = {
      name:"主页",
      uuid:"main",
      path:"/"
    }
    list.unshift(home);
    state.bread_crumb = list;
  },
  [types.INIT_NAV](state) {
    const list = state.nav;
    let maps = {};
    function fn(list){
      for(var items of list){
        maps[items.uuid] = items;
        if(items.children && items.children.length > 0){
          fn(items.children);
        }
      }
    }
    fn(list);
    state.navMaps = maps;
  },




}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
