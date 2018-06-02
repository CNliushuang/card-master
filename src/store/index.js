import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import homeStore from '@/modules/home/store'
import userStore from '@/modules/user/store'




Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		homeStore,
		userStore,
	},
	plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
export default store;
