import '@/config/quill.css'

import {filterFilesName, filterFilesSize} from '@/config/utils'

import Upload from '@/modules/widget/upload'

const BlockEmbed = Quill.import('blots/block/embed');
const Embed = Quill.import('blots/embed');

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

class FileBlot extends BlockEmbed { 
	static create(file) { 
		let node = super.create(); 
		window.n = node; 
		node.dataset.file = JSON.stringify(file); 
		node.setAttribute('contenteditable', false);
		node.setAttribute('title', '点击下载');
		node.innerHTML = `${filterFilesName(file.name, file.expand)}  ${filterFilesSize(file.size)}`
		return node;
	} 
	static value(domNode) { 
		return JSON.parse(domNode.dataset.file);
	}
}

FileBlot.blotName = 'file';
FileBlot.tagName = 'div';
FileBlot.className = 'ql-module-file'; 

class ToolbarAt {
  constructor(quill){
    this.quill = quill;
    this.toolbar = quill.getModule('toolbar');
    if (typeof this.toolbar != 'undefined')
      this.toolbar.addHandler('at', this.checkAt);
    
    let atBtns = document.getElementsByClassName('ql-at');
    if (atBtns) { 
      [].slice.call( atBtns ).forEach(( atBtn ) => {
      	atBtn.innerHTML = '<svg viewBox="0 0 1024 1024" width="18" height="18"><path class="ql-fill" d="M907.6 814.2c-47.8 50.6-104.6 87.6-170.4 110.8C671.4 948.4 602 960 529 960c-69.8 0-133.4-11-190.6-33.2-57.2-22-106.2-52.8-146.6-92.2-40.6-39.4-72-86.6-94.4-141.6-22.4-55-33.4-115-33.4-180 0-64.2 12.2-123.6 36.6-178.2 24.4-54.6 57.6-102 99.8-142.2 42.2-40.2 91.4-71.6 148-94.6C404.6 75.4 465 64 529 64c55.2 0 108.8 8 160.6 24 52 16 98 40.2 138.2 72.2 40.2 32.2 72.2 72.2 96.2 120.4 24 48.2 36 104.8 36 169.8 0 48.2-6.6 90.8-20 127.6-13.4 37-31.2 67.8-53.6 92.8-22.4 25-47.8 43.6-76.6 56-28.8 12.4-59 18.6-90.6 18.6-32.4 0-58.4-7.6-78-22.8-19.4-15.2-29.2-34.6-29.2-57.8l-6 0c-12.2 19.2-30.8 37.6-56 54.8-25.2 17.2-56 26-92.6 26-55.2 0-97.8-18-127.8-54.2-30-36.2-45-83-45-141 0-33.8 5.6-67 17-100 11.4-33 27.6-62.2 48.6-88 21-25.6 46.2-46.4 75.4-62 29.2-15.6 61.6-23.4 97.4-23.4 30.8 0 56.8 6.4 78 19.2 21 12.8 34.8 28.6 41.4 47l1.2 0 9.8-48.2 108.4 0L714 522.8c-1.6 11.2-3.8 23.6-6.6 37.4-2.8 13.6-4.2 26.4-4.2 38.6 0 13.6 2.6 25 8 34.4 5.2 9.2 15.6 13.8 31 13.8 31.6 0 57.8-16.8 78.6-50.6 20.6-33.8 31-79 31-136 0-48.2-8.2-91-24.4-128.2-16.2-37.4-38.8-68.6-67.6-94-28.8-25.2-63.2-44.4-102.8-57.2-39.8-12.8-83.2-19.2-130.2-19.2-51.2 0-98 9-140.6 27s-79 43-109 74.6c-30 31.8-53.4 69-70 112C190.4 418.2 182 464.6 182 514.4c0 53 8.8 100.8 26.2 143.4 17.4 42.6 42 78.8 73.6 109 31.6 30.2 69.4 53.2 113.2 69.2 43.8 16 92.2 24 144.8 24 65.8 0 122.4-10.4 169.8-31.4 47.4-20.8 91-49.8 130.8-86.8L907.6 814.2zM526.6 376c-19.4 0-36.6 5.6-51.2 16.8-14.6 11.2-27 25.4-37.2 42.8-10.2 17.2-17.8 36.4-23.2 57.2-5.2 20.8-8 41-8 60.2 0 9.6 1 19.8 3 30.8 2 10.8 6 20.8 12.2 30.2 6 9.2 14 16.8 23.8 22.8 9.8 6 22.8 9 39 9 22 0 40.6-5.4 56-16.2 15.4-10.8 28-24.4 37.8-41 9.8-16.4 16.8-34.4 21.4-53.6 4.4-19.2 6.6-37 6.6-53 0-12.8-1.2-25.4-3.6-38-2.4-12.4-6.6-23.6-12.8-33.8-6-10-14.4-18.2-25-24.6C555 379.2 542 376 526.6 376z"></path></svg>';
        //atBtn.innerHTML = '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>';
      });
    };
  }

  checkAt(){
  	let range = this.quill.getSelection();
  	const atSignBounds = this.quill.getBounds(range.index);
  	const react = this.quill.container.getBoundingClientRect();
  	//console.log(atSignBounds, react)
  	// SelectUser({
  	// 	top: atSignBounds.top + atSignBounds.height + react.top,
  	// 	left: atSignBounds.left + react.left,
  	// 	callback: list => {
  	// 		if(list && list.length > 0){
  	// 			this.quill.insertEmbed(range.index, 'at', {
  	// 				uuid: list[0].uuid,
  	// 				name: list[0].nick_name || list[0].name
  	// 			}, Quill.sources.USER);
  	// 			this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
  	// 		}else{
  	// 			this.quill.setSelection(range.index, Quill.sources.SILENT);
  	// 		}
  	// 	}
  	// })
  }
}

class AtBlot extends Embed {
	static create(user) {
    let node = super.create();
    node.innerHTML = '@' + user.name;
    node.setAttribute('user', JSON.stringify(user));
    return node;
  }

  static value(node) {
    return node.getAttribute('user');
  }

}

AtBlot.blotName = 'at';
AtBlot.tagName = 'b';

export default class Editor {
	constructor({ container, toolbar, theme = 'bubble', change, height, placeholder  = '' }){
		this.container = container;
		this.toolbar = toolbar ? toolbar : [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
     //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      [ 'link', 'image' ],
      [ 'emoji' ],
      [ 'at' ],
      ['clean']                                         // remove formatting button
    ];
		this.theme = theme;
		this.change = change;
		this.height = height;
		this.placeholder = placeholder;
		this.id = `Editor_${new Date().getTime()}_`;
		this.Quill = null;
		this.init();
		this.create();
		this.bind();

		cleanEditor();
		saveEditor(this.id, this.Quill);
	}
	init(){
	  Quill.register(DividerBlot);
		Quill.register(FileBlot);
		Quill.register('modules/toolbar_at', ToolbarAt);
		Quill.register({
			'formats/at': AtBlot
		});
	}
	create(){
		const div = document.createElement('div');
		div.id = this.id;
		if(this.height){
			div.style.height = this.height;
		}
		this.container.appendChild(div);
		this.Quill = new Quill(`#${this.id}`, {
      bounds: `#${this.id}`,
      placeholder: this.placeholder,
      modules: {
        formula: true,
        syntax: true,
        toolbar: {
         	container: this.toolbar,
         	handlers: { 
         		emoji(){},
         		at(){}
         	},
        },
        imageResize: {
          displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white'
          },	
          modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        toolbar_emoji: true,
        toolbar_at: true,
      },
      theme: this.theme
    })

	}
	bind(){
		let timer = null;


		document.querySelector(`#${this.id} .ql-editor`).onfocus = () => {
			if(timer){
				clearTimeout(timer);
			}
			// callClient('editor_focus', {})
		}

		document.querySelector(`#${this.id} .ql-editor`).onblur = () => {
			timer = setTimeout(() => {
				// callClient('editor_blur', {})
			}, 4000)
			
		}

		document.querySelector(`#${this.id} .ql-editor`).onmousedown = (e) => {
			if(e.button == 2){//右键
				var hashtml=false,hasselected=false;
				var html = document.querySelector(`#${this.id} .ql-editor`).innerHTML.replace(/<img.*?(?:>|\/>)/gi, '[图片]').replace(/<\/?[^>]*>/gi,'');
				if(html.trim()){
					hashtml = true;
				}
				var range = this.Quill.getSelection();
				if(range && range.length != 0){
					hasselected = true;
				}
				var params = {
					hashtml,
					hasselected
				}
				// callClient('show_right_menu',params)

				e.stopPropagation();
                e.preventDefault(); 
                return false;
			}			
		}




		let appPlat = 'web';
    if(appPlat == 'web' || appPlat == 'electron'){
    	paste(document.querySelector(`#${this.id} .ql-editor`), this.Quill)
		}else{
			document.querySelector(`#${this.id} .ql-editor`).onpaste = e => {
				console.log('禁止粘贴')
				e.preventDefault();
			}
			this.Quill.keyboard.addBinding({
				key: 'v',
      	shortKey: true
			}, (range, context) => {
				
			})
		}

		this.Quill.on('editor-change', (eventName, range) => {
		  if (eventName === 'text-change') {
		  } else if (eventName === 'selection-change') {
		    if(range){
		    	this.change && this.change();
		    }
		  }
		});

		const toolbar = this.Quill.getModule('toolbar');

		toolbar.addHandler('image', () => {
			const range = this.Quill.getSelection();
			image().then(file => {
				this.Quill.insertEmbed(range ? range.index: 0, 'image', file.url, Quill.sources.USER)
			})
		});

		this.Quill.keyboard.addBinding({
      key: '1',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H1', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

   this.Quill.keyboard.addBinding({
      key: '2',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H2', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: '3',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H3', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: '4',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H4', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: '5',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H5', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: '6',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'header', 'H6', Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: 'd',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'divider', 'HR', Quill.sources.USER);
      this.Quill.setSelection(range.index + 2, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: 'r',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'blockquote', {}, Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
      key: 'j',
      shortKey: true
    }, (range, context) => {
      this.Quill.insertEmbed(range.index + 1, 'code-block', {}, Quill.sources.USER);
      this.Quill.setSelection(range.index + 1, Quill.sources.SILENT);
    });

    this.Quill.keyboard.addBinding({
			key: 'k',
			shortKey: true
		}, (range, context) => {
			if (range == null) return;
			if (range.length == 0) {
				let formats = this.Quill.getFormat();
				Object.keys(formats).forEach((name) => {
					this.Quill.format(name, false);
				});
			} else {
				this.Quill.removeFormat(range, Quill.sources.USER);
			}
		});

		this.Quill.keyboard.addBinding({
        key: 'f',
        shortKey: true
    }, (range, context) => {
      Upload({
				callback: list => {
					if(list && list.length > 0){
						list.forEach((item, index) => {
							if(['jpg','gif','png','gif','jpeg'].indexOf(item.expand) >= 0){
								this.Quill.insertEmbed(range ? range.index + index : 0, 'image', item.url, Quill.sources.USER)
							}else{
								this.Quill.insertEmbed(range ? range.index + index : 0, 'file', item, Quill.sources.USER)
							}
							this.Quill.setSelection(range.index + 1 + index, Quill.sources.SILENT);
						})
					}
					
				},
			})
    });
	}

	get at(){
		if(this.Quill){
			const contents = this.Quill.getContents();
			if(contents && contents.ops && contents.ops.length > 0){
				const ats = contents.ops.filter(item => {
					return !!item.insert && !!item.insert.at && typeof item.insert.at === 'string';
				});
				return ats.map(item => {
					return JSON.parse(item.insert.at);
				})
			}
		}
		return [];
	}
}

const paste = (dom, quill) => {
	dom.onpaste = e => {
		console.log('=====================')
		console.log(e)
		const clipboardData = e.clipboardData;
		for (let i = 0; i < clipboardData.items.length; i++) {
			const item = clipboardData.items[i];
			console.log('=====================')
			console.log(item)
			if (item.kind == 'file' && item.type.match(/^image\//i)) {
				const blob = item.getAsFile();
				upload(blob).then(file => {
					insertImg(file.url, quill);
				});
			}
		}
	}
}

const image = () => {
	return new Promise((resolve, reject) => {
		const id = new Date().getTime() + 'quillFile';
		let input = document.createElement('input');
		input.id = id;
		input.type = 'file';
		input.accept = 'image/*';
		input.style.display = 'none';
		
		input.onchange = e => {
			if(e.target.files && e.target.files.length){
				upload(e.target.files[0]).then(file => {
					resolve(file)
					input.parentNode.removeChild(input);
					input = null;
				});
			}else{
				input.parentNode.removeChild(input);
				input = null;
			}
		}
	
		document.body.appendChild(input);

		input.click();
	})
}

export const upload = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = event => {
			const base64Str = event.target.result;
			getToken().then(uptoken => {
				// let url = window.url = 'https://upload-z0.qiniu.com/putb64/-1';
				let url = window.url = 'https://upload-z1.qiniu.com/putb64/-1';
			  //url = 'https://upload-z1.qiniu.com/putb64/-1';
			  const xhr = new XMLHttpRequest();
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4 && xhr.status === 200) {
			  		const resp = JSON.parse(xhr.responseText);
			    	if(resp.error == 'ok'){
			    		resolve(JSON.parse(resp.file))
							//insertImg(JSON.parse(resp.file).url);
			      }
			   	} else if(xhr.readyState === 4 && typeof xhr.status !== 'undefined' && xhr.status !== 200) {
			    
					}
				}

				xhr.open('POST', url, true);
				xhr.setRequestHeader('Content-Type', 'application/octet-stream');
				xhr.setRequestHeader('Authorization', 'UpToken ' + uptoken);
				// 需要将前缀去掉
				const startIndex = base64Str.indexOf('base64,');
				// 'base64,'.length === 7
				xhr.send(base64Str.slice(startIndex + 7));
			})
		} 	
		reader.readAsDataURL(file);
	})
}

const insertImg = (src, quill) => {
	const range = quill.getSelection();
	if(range){
		quill.insertEmbed(range.index, 'image', src, Quill.sources.USER)
		quill.setSelection(range.index + 1, Quill.sources.SILENT);
	}
}

const getToken = () => {
	const reqType = 'general_file';
	const expand = 'jpeg';
	const name =  new Date().getTime() +'_'+ Math.ceil( Math.random() * 10000 ) + '.' + expand;
	const comm = getRequestParam();
	const params = new Array();
	params.push('token=' + comm.token, 'comp_id=' + comm.comp_id, 'req_type=' + reqType, 'name=' + name, 'expand=' + expand);
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
    	xhr.open('GET', config_server.server_api + '/files/storage/ticket.json?' + params.join('&'), true);
    	xhr.onreadystatechange = () => {
      	if (xhr.readyState == 4 && xhr.status == 200) {
      		//从服务器获得数据
      		const uptoken = JSON.parse(xhr.responseText).ticket;
      		resolve(uptoken)
      	}
    };
    xhr.send();
  })
}


const cleanEditor = id => {
	if(window.quillEditorArray && window.quillEditorArray.length > 0){
		window.quillEditorArray = window.quillEditorArray.filter(item => {
			return !!document.querySelector(`#${item.id}`)
		})
	}
}

const saveEditor = (id, quill) => {
	if(!window.quillEditorArray){
		window.quillEditorArray = [];
	}
	window.quillEditorArray.push({ id, quill })
}

export const insertImage = datas => {
  const src = utf8to16(base64decode(datas)).replace(/\s/gi,' ');
  if(window.quillEditorArray && window.quillEditorArray.length > 0){
		window.quillEditorArray.forEach(item => {
			if(!!document.querySelector(`#${item.id}`)){
				insertImg(src, item.quill);
			}
		})
	}
}

export const insertText = datas => {
  const text = utf8to16(base64decode(datas));
  console.log(text);
  if(window.quillEditorArray && window.quillEditorArray.length > 0){
		window.quillEditorArray.forEach(item => {
			if(!!document.querySelector(`#${item.id}`)){
				setTimeout(() => {
					const range = item.quill.getSelection();
					if(range){
						//item.quill.insertText(range.index, text, Quill.sources.USER)
						//item.quill.setSelection(range.index + 1, Quill.sources.SILENT);
						item.quill.clipboard.dangerouslyPasteHTML(range.index, text, Quill.sources.USER)
					}
				}, 100)
			}
		})
	}
}

export const insertHtml = datas => {
 	const html = utf8to16(base64decode(datas));
  if(window.quillEditorArray && window.quillEditorArray.length > 0){
		window.quillEditorArray.forEach(item => {
			if(!!document.querySelector(`#${item.id}`)){
				setTimeout(() => {
					const range = item.quill.getSelection();
					if(range){
						item.quill.clipboard.dangerouslyPasteHTML(range.index, html, Quill.sources.USER)
					}
				}, 100)
			}
		})
	}
}