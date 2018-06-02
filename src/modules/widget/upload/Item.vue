<template>
	<li class="item">
    <div :class="`icon icon-${ getExpand }`"></div>
    <div class="content">
      <div class="name" :class="{'error': item.error}">{{ getFilesName }}<span class="size">{{ getFileSize }}</span><span v-if="item.error">（上传失败）</span></div>
      <div class="result" v-if="!!item.uuid && !!item.url">上传成功</div>
      <div class="progress" v-else><div class="rate" :style="getProgress"></div></div>
    </div>
    <div class="operate" @click="remove(index)"><div class="delete"></div></div>
  </li>
</template>

<script>
export default{
	props: {
		item: {
			type: Object,
			default: null,
		},
		index: {
			type: Number,
			default: 0,
		},
		remove: {
			type: Function,
			default: null
		}
	},
	computed: {
		getProgress(){
			return { width: this.item.progress+'%'};
		},
		getExpand(){
			if(this.item.name){
		        const box = this.item.name.split('.');
		        return box[box.length-1];
		    }else{
		        return '';
		    }
		},
		getFilesName(){
			/*优化附件名字显示*/
			const ext = this.getExpand;
			const str = this.item.name;
    		const totalLen = ext.length + 11;
    		const lastLen = ext.length + 3;
    		if(str.length > totalLen){
        		const temp = str.substr(0,8) + '...' + str.substr(str.length-lastLen,lastLen);
        		return temp;
    		}else{
        		return str;
    		}
		},
		getFileSize(){
			const size = this.item.size;
			let str = '';
		    if(size < 1024){
		        str = size + 'B'
		    }else if(size > 1024 && size <1048576){
		        str = (size/1024).toFixed(2) + 'K'
		    }else{
		        str = (size/1048576).toFixed(2) + 'M'
		    }
		    return str;
		}
	}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/config/config.less";

  .item{
		display: flex;
	  font-size: 12px;
	  color: @FONT_COLOR_THIRD;
	  margin-top: 10px;
	  &:first-child{
	  	margin-top: 0;
	  }
	  .icon{
	  	flex-shrink: 0;
	  	width: 26px;
		  height: 32px;
		  overflow: hidden;
		  background-image: url(~@/modules/widget/images/new_files_icons.png);
		  background-repeat: no-repeat;
		  background-position: -30px -36px;
		  &.icon-zip {
				background-position: -142px -36px;
			}
			&.icon-xls, &.icon-xlsx{
				background-position: -254px -36px;
			}
			&.icon-doc, &.icon-docx{
				background-position: -366px -36px;
			}
			&.icon-ppt, &.icon-pptx{
				background-position: -534px -36px;
			}
			&.icon-vsd{
				background-position: -646px -36px;
			}
			&.icon-pdf{
				background-position: -702px -36px;
			}
			&.icon-txt{
				background-position: -758px -36px;
			}
			&.icon-apk {
			  background-position: -814px -36px;
			}
			&.icon-exe {
			  background-position: -870px -36px;
			}
			&.icon-ipa {
			  background-position: -926px -36px;
			}
			&.icon-avi,&.icon-mov,&.icon-3gp {
			  background-position: -982px -36px;
			}
			&.icon-mp3,&.icon-wav,&.icon-mp4,&.icon-wma {
			  background-position: -30px -99px;
			}
			&.icon-rar {
			  background-position: -142px -99px;
			}
			&.icon-psd {
			  background-position: -198px -99px;
			}
			&.icon-key {
			  background-position: -254px -99px;
			}
			&.icon-dmg {
			  background-position: -310px -99px;
			}
			&.icon-ai {
			  background-position: -366px -99px;
			}
			&.icon-cad {
			  background-position: -86px -36px;
			}
			&.icon-mmap {
			  background-position: -198px -36px;
			}
			&.icon-jpg,&.icon-jpeg {
			  background-position: -478px -36px;
			}
			&.icon-png,&.icon-PNG {
			  background-position: -590px -36px;
			}
			&.icon-gif,&.icon-GIF {
			  background-position: -1038px -36px;
			}
	  }
	  .content{
	  	flex-grow: 1;
      min-width: 0;
      margin-left: 20px;
      margin-right: 20px;
      .name{
      	height: 16px;
      	line-height: 16px;
			  overflow: hidden;
			  white-space: nowrap;
			  text-overflow: ellipsis;
			  &.error {
				  color: #ff2000;
				}
				.size {
				  margin-left: 4px;
				  font-size: 10px;
				  color: @FONT_COLOR_FOUR;
				}
      }
      .progress{
      	margin-top: 8px;
			  width: 100%;
			  height: 6px;
			  border-radius: 3px;
			  background: #e7e7e7;
      	.rate{
      		border-radius: 3px;
				  height: 6px;
				  background-color: @COMMON_BLUE;
      	}
      }
      .result{
      	height: 16px;
      	line-height: 16px;
      	color: #5cb85c;
      }
	  }
	  .operate{
	  	display: flex;
	  	justify-content: center;
      align-items: center;
	  	flex-shrink: 0;
	  	height: 32px;
	  	width: 20px;
	  	.delete{
	  		width: 18px;
	  		height: 18px;
	  		background-image: url(~@/modules/widget/images/delete.svg);
		  	background-repeat: no-repeat;
		  	background-size: 100%;
		  	&:hover{
		  		background-image: url(~@/modules/widget/images/delete-active.svg);
		  	}
	  	}
	  }
  }
</style>