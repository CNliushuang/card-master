import Vue from 'vue';
import Main from './main.vue'
import Line from './line.vue'

const ToastConstructor = Vue.extend(Main);

let instance;
let _uid;
/**
 * ​显示消息提示框
 * @options type         String      选填    图标，有效值 "success", "loading", "info", "warn", "download" 默认："success"
 * @options content      String      必填    提示的内容
 * @options duration     Number      选填		 提示的延迟时间，单位毫秒，默认：1500
 */

const Toast = options => {
	options = options || {};
	if (typeof options === 'string') {
	  options = {
	    content: options
	  }
	}

	let render;
	if(!!options.render && typeof options.render == 'function'){
    render = options.render;
    delete options.render;
  }

	instance = new ToastConstructor({
    data: options
  });

	if(!!render){
		instance.$slots.default = render(instance.$createElement);
	}

 	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

Toast.line = {
	show(options){
		options = options || {};
		if(_uid){
			const h = instance.$createElement;
			instance.$slots.default = h(Line, {
				props: {
					content: '连接服务器失败，请检查网络设置',
					url: options.url ? options.url : null,
				}
			})
			instance.$forceUpdate();
		}else{
			Toast({
				type: 'warn',
				mode: 'line',
				duration: 0,
				render(h){
					return h(Line, {
						props: {
							content: '连接服务器失败，请检查网络设置',
							url: options.url ? options.url : null,
						}
					})
				}
			})
			_uid = instance._uid;
		}
	},
	hide(){
		if(_uid){
			instance.close();
			instance = undefined;
			_uid = undefined;
		}
	}
}


export default Toast