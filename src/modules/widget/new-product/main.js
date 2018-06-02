import Vue from 'vue';
import Main from './main.vue'


let NewProductConstructor = Vue.extend(Main)

let instance;

const NewProduct = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	NewProduct: options
	    }
	}
	instance = new NewProductConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default NewProduct