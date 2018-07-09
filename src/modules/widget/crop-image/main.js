import Vue from 'vue';
import Main from './main.vue'


let CropImageConstructor = Vue.extend(Main)

let instance;

const CropImage = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	CropImage: options
	    }
	}
	instance = new CropImageConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default CropImage