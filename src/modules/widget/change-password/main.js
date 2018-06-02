import Vue from 'vue';
import Main from './main.vue'


let ChangePasswordConstructor = Vue.extend(Main)

let instance;

const ChangePassword = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	ChangePassword: options
	    }
	}
	instance = new ChangePasswordConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default ChangePassword