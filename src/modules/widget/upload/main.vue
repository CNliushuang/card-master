<template>
    <modal @destroy="destroy" :title="`上传附件`">
        <div class="upload">
            <ul class="file-list">
                <item v-for="(item, index) in list" :key="index" :item="item" :index="index" :remove="removeFile"></item>
            </ul>
        </div>
        
        <template slot="footer" slot-scope="props">
            <div :id="uploadId" style="margin-right: 10px;">
                <el-button size="mini">上传附件</el-button>
            </div>
            <el-button @click.native="submit(props.close)" size="mini" type="primary">确认</el-button>
        </template>
    </modal>
</template>

<script>
import Modal from '../common/Modal.vue';
import Item from './Item.vue';

import Toast from '@/modules/widget/toast'

import * as api from './api';

export default{
	components: {
        Modal,
        Item
    },
	methods: {
        updatePercent(id, percent){
            const index = this.list.findIndex(item => {
                return (id == item.id)
            })
            if(index >= 0){
                this.list[index].progress = percent;
            }
        },
        updateUuidUrl(id, uuid, url){
            const index = this.list.findIndex(item => {
                return (id == item.id)
            })
            if(index >= 0){
                this.list[index].uuid = uuid
                this.list[index].url = url
            }
        },
         updateUuidExpand(id, uuid, expand){
            const index = this.list.findIndex(item => {
                return (id == item.id)
            })
            if(index >= 0){
                this.list[index].uuid = uuid
                this.list[index].expand = expand
            }
        },
        updateUuidError(id, error){
            const index = this.list.findIndex(item => {
                return (id == item.id)
            })
            if(index >= 0){
                this.list[index].error = error
            }
        },
        removeFile(index){
            this.list.splice(index, 1);
        },
        destroy(){
            this.$el &&
            this.$el.parentNode &&
            this.$el.parentNode.removeChild(this.$el);
            this.$destroy();
            this.destroyed && this.destroyed();
        },
        submit(close){
            const array = this.list.filter(item => !item.error && !!item.uuid).map(item => {
                return {
                    name: item.name,
                    size: item.size,
                    uuid: item.uuid,
                    url: item.url,
                    expand: item.expand
                }
            });
            this.callback &&  this.callback(array);
            close();
        },
        uploader(){
            Qiniu.uploader({
                disable_statistics_report: false, 
                runtimes: 'html5,flash,html4',
                browse_button: this.uploadId,
                uptoken_func: file =>{    // 在需要获取 uptoken 时，该方法会被调用
                    //console.log(2222, file.id, file.uptoken)
                    return file.uptoken;
                },
                get_new_uptoken: true,
                domain: 'http://xinghuo.vnest.net',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                max_file_size: '1000mb',             // 最大文件体积限制
                flash_swf_url: '/static/plupload/js/Moxie.swf',  //引入 flash,相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                init: {
                    FilesAdded: (up, files) => {
                        const promiseArray = new Array();

                        files.forEach(item => {
                            this.list.push({
                                id: item.id,
                                name: item.name,
                                size: item.size,
                                progress: 0,
                                uuid: null,
                                url: null,
                                error: false,
                                expand: item.name.replace(/.+\./, '')
                            });

                            promiseArray.push(new Promise((resolve, reject) => {
                                api.filesQiniuUploadTicket({
                                    reqType: this.reqType,
                                    name: item.name,
                                    expand: item.name.replace(/.+\./, ''),
                                    size: item.size,
                                    resId: this.resId,
                                    folderId: this.folderId,
                                    projectId: this.projectId,
                                }, resp => {
                                    item.uptoken = resp.ticket;
                                    resolve(resp.ticket)
                                }, resp => {
                                    resolve();
                                    this.updateUuidError(item.id, true);
                                    Toast({
                                        type: 'error',
                                        content: resp.msg,
                                        duration: 3000,
                                    })
                                    up.removeFile(item);
                                })
                            }))
                        });

                        Promise.all(promiseArray).then(respArray => {
                            //console.log(respArray)
                            if(respArray.some(item => !!item)){
                                up.start();
                            }
                        }) 
                    },
                    BeforeUpload: (up, file) => {
                        // 每个文件上传前,处理相关的事情
                    },
                    UploadProgress: (up, file) => {
                      this.updatePercent(file.id, file.percent);
                        // 每个文件上传时,处理相关的事情
                    },
                    FileUploaded: (up, file, info) => {
                        const response = JSON.parse(info.response);
                        if(response.error == 'ok'){
                            const f = JSON.parse(response.file);
                            this.updateUuidUrl(file.id, f.uuid, f.url);
                            this.updateUuidExpand(file.id, f.uuid, f.expand);
                        }
                    },
                    Error: (up, err, errTip) => {
                        console.log(err, errTip)
                    },
                    UploadComplete: () => {
                    },
                    Key: (up, file) => {
                    }
                }
            });
        }
    },
    data(){
        return {
            list: [],
            reqType: 'general_file',
            folderId: null,
            projectId: null,
            resId: null,

            callback: null,
            destroyed: null,

            uploadId: null,
        }
    },
    created(){
        this.uploadId = new Date().getTime() + '';
    },
    mounted() {
      this.$nextTick(() => {
        this.uploader();
      });
    }
}	
</script>

<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";

    .upload{
        width: @MODAL_WIDTH;
        .file-list{
            max-height: 260px;
            min-height: 158px;
            overflow-y: auto;
        }
    }
</style>