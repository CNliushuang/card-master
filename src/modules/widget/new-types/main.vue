<template>
    <modal :title="'新增产品分类'" @destroy="destroy" @submit="submit">
        <div class="modal_slide_wrapper" :style="{height:height+'px'}">
            <div class="group">
                <div class="name">
                    上级分类
                </div>
                <div class="content">
                    <el-select v-model="productType.brandId" placeholder="请选择">
                        <el-option
                            v-for="item in parentList"
                            :key="item.uuid"
                            :label="item.name"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    分类名称
                </div>
                <div class="content">
                    <el-input v-model="productType.name"></el-input>
                </div>
            </div>
            <div class="group" v-if="productType.uuid">
                <div class="name">
                    是否启用
                </div>
                <div class="content">
                    <el-select v-model="productType.status" placeholder="请选择状态">
                        <el-option
                          v-for="item in statusList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    分类banner
                </div>
                <div class="content">
                    <img v-if="productType.cover" :src="productType.cover">
                    <el-button @click="goUpload" size="mini" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    <el-button @click="deleteCover" size="mini" type="danger">删除banner</el-button>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    分类简介
                </div>
                <div class="content">
                    <el-input type="textarea" :rows="3" v-model="productType.content"></el-input>
                </div>
            </div>

        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';
    import Upload from '@/modules/widget/upload'
    import CropImage from '@/modules/widget/crop-img'


    export default{
        components:{
            Modal
        },
        data(){
            return {
                height:200,
                locked:false,
                labelPosition:"right",
                productType:{
                    name:"",
                    parentId:"",
                    cover:"",
                    content:"",
                    brandId:"",
                    status:0
                },
                statusList:[{
                    label:"禁用",
                    value:0
                },{
                    label:"启用",
                    value:1
                }],
                parentList:[]
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
            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150 - 40;
                this.height = height;
            },
            submit(close){
                console.log(this.productType);
                if(!this.productType.uuid){
                    api.createProductType({productType:this.productType},() => {
                        this.callback && this.callback();
                        close && close();
                    })
                }else{
                    api.modifyProductType({productType:this.productType},(resp) => {
                        this.callback && this.callback(resp.productType);
                        close && close();
                    })
                }
                
            },
            getParentList(){
                $API.cars.getBrandList({},(resp) => {
                    this.parentList = resp.list;
                    this.productType.brandId = resp.list[0].uuid;
                    this.productType.parentId = '';

                })
            },
            deleteCover(){
                this.productType.cover = "";
            },
            goUpload(){
                CropImage({
                    callback:(file) => {
                         this.productType.cover = file.url;
                    }
                })




                // Upload({
                //     callback:(data) => {
                //         console.log(data);
                //         this.productType.cover = data[0].url;
                //     }
                // })
            }

        },
        mounted(){
            this.setHeight();
            this.getParentList();
            console.log(this.parent);
            // if(this.parent){
            //     this.productType.parentId = this.parent.uuid;
            //     let temp = [];
            //     temp.push(this.parent);
            //     this.parentList = temp;
            // }
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
