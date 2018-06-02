import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import Container from '@/modules/home/components/Home'


import Home from '@/modules/home/router'
import User from '@/modules/user/router'
import Account from '@/modules/account/router'
import Cars from '@/modules/cars/router'


Vue.use(Router)


const children =[
    ...Home,
    ...User.routes,
    ...Account,
    ...Cars
]


const routes = [
    {
    	path: '/', component: Container,
    	children:children
    },
    ...User.routes_root,
]









const router = new Router({
  routes: routes
})





router.beforeEach((to, from, next) => {
    console.log(to);
    store.dispatch('homeStore/home/chagneRouter',{router:to})

  if(to.path != '/login'){
    let comm = getRequestParam()
    if( !comm || !comm.token){
        console.log("跳转");
        // Link('/login');
        next({path:'/login'});
        return false;
    }
    const user = store.getters['userStore/user/user'];
    if(comm && !!comm.token && !user){
        store.dispatch('userStore/user/userMy').then(() => {
            next();
        });
    }else{
      next();
    }
  }else{
    next();
  }
})





















export default router;