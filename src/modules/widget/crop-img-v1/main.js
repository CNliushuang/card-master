import Vue from 'vue';
import Main from './main.vue'
import {removeWidget} from '@/config/utils'


let cropConstructor = Vue.extend(Main)

let instance;

const crop = options => {
    options = options || {};
    if (typeof options === 'string') {
        options = {
            crop: options
        }
    }
    instance = new cropConstructor({
        data: options
    });
    document.getElementById('app').appendChild(instance.$mount().$el);
    
}
export default crop