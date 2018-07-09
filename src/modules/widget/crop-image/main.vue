<template>
    <div class="corp_image_box">
        <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        img-format="png"></my-upload>
    </div>
</template>

<script>
    import * as api from './api';
    import myUpload from 'vue-image-crop-upload';
    export default{
        components:{
            myUpload
        },
        data(){
            return {
               show: true,
            }
        },
        computed:{
           
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                console.log(imgDataUrl)
                console.log(field)



            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }

        },
        mounted(){
            
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modal_slide_wrapper{
        width: 600px;
        overflow: auto;
        .group{
            display: flex;
            flex-direction: row;
            margin-bottom: 22px;
            .name{
                width: 90px;
                text-align: right;
                flex-shrink: 0;
                height: 30px;
                line-height: 30px;
                padding-right: 15px;
                box-sizing: border-box;
            }
            .content{
                flex-grow: 1;
                width: 0;
                img{
                    max-width: 100%;
                }
                .el-input,.el-select{
                    width: 100%;
                    box-sizing: border-box;
                }
            }
        }


    }
</style>
