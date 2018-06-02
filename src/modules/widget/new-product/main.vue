<template>
    <modal :title="'新增产品'" @destroy="destroy" @submit="submit">
        <div class="modal_slide_wrapper" :style="{height:height+'px'}">
            <div class="group">
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">品牌</div>
                        <div class="content">
                            <el-select v-model="account.cars" placeholder="请选择品牌">
                                <el-option
                                  v-for="item in carsList"
                                  :key="item.uuid"
                                  :label="item.name"
                                  :value="item.uuid">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">车系</div>
                        <div class="content">
                            <el-select v-model="account.cars" placeholder="请选择车系">
                                <el-option
                                  v-for="item in carsList"
                                  :key="item.uuid"
                                  :label="item.name"
                                  :value="item.uuid">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                   <div class="items">
                        <div class="name">型号</div>
                        <div class="content">
                           <el-select v-model="account.cars" placeholder="请选择型号">
                            <el-option
                              v-for="item in carsList"
                              :key="item.uuid"
                              :label="item.name"
                              :value="item.uuid">
                            </el-option>
                          </el-select>
                          
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">是否启用</div>
                        <div class="content">
                            <el-radio v-model="radio" label="1">启用</el-radio>
                            <el-radio v-model="radio" label="2">禁用</el-radio>
                        </div>
                    </div>
                </div>
            </div>
            <div class="more_info">
                dsfsfs
            </div>

        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';



    export default{
        components:{
            Modal
        },
        data(){
            return {
                height:200,
                account:{
                    cars:""
                },
                locked:false,
                carsList:[],
                radio:"1"
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
            submit(){

            }

        },
        mounted(){
            this.setHeight();

        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modal_slide_wrapper{
        width: 800px;
        overflow: auto;
        display: flex;
        flex-direction: row;
        .group{
            margin-bottom: 10px;
            width: 300px;
            flex-shrink: 0;
            .title{
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                .icon{
                    float: left;
                    width: 3px;
                    height: 15px;
                    background: #67a7f6;
                    margin-right: 8px;
                    display: inline-block;
                    margin-top: 2px;
                }
            }
            .other_group{
                padding: 10px;
                border-top: 1px solid #f4f4f4;
                .items{
                    .name{
                        margin-bottom: 10px;
                    }
                }
            }
            .warpper{
                .items{
                    margin: 10px 0 10px 0;
                    &.stage{
                        float: none;
                        /deep/ .el-input{
                            width: 80px;
                            margin:0 4px;
                        }
                        .part{
                            margin-right: 30px;
                        }

                        .el-icon{
                            font-size: 18px;
                            cursor: pointer;
                            margin-right: 6px;
                            display: none;
                            &:hover{
                                color: @COMMON_BLUE;
                            }
                        }
                        &:hover{
                            .el-icon{
                                display: inline-block;
                            }
                        }
                    }
                    /deep/ .el-select{
                        width: 100%;
                        margin-bottom: 10px;
                    }
                    /deep/ .el-input{
                        width: 100%;
                    }

        
                    .name{
                        width: 70px;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                    }
                    .content{
                        margin-left: 70px;
                        .info{
                            margin-top: 2px;
                            font-size: 12px;
                            color: @FONT_COLOR_FOUR;
                        }
                        .el-radio{
                            margin-top: 8px;
                        }
                    }
                }
            }
        }

        .more_info{
            padding-left: 10px;
            border-left: 1px solid #e3e3e3;
            margin-left: 20px;
            flex-grow: 1;
        }


    }
</style>
