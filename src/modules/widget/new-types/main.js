import Vue from 'vue';
import Main from './main.vue'


let NewTypesConstructor = Vue.extend(Main)

let instance;

const NewTypes = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	NewTypes: options
	    }
	}
	instance = new NewTypesConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default NewTypes