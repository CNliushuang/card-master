import Vue from 'vue';
import Main from './main.vue'


let NewAccountConstructor = Vue.extend(Main)

let instance;

const NewAccount = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	NewAccount: options
	    }
	}
	instance = new NewAccountConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default NewAccount