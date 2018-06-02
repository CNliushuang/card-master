<template>
    <modal :title="'用户信息'" @destroy="destroy" @submit="submit">
        <div class="modal_slide_wrapper" :style="{height:height+'px'}">
            <div class="group">
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">用户手机号码</div>
                        <div class="content">
                            <el-input  :clearable="true" :minlength="1" :maxlength="20" v-model="account.loginName" placeholder="请输入用户手机号码"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">用户微信id</div>
                        <div class="content">
                            <el-input  :clearable="true" :minlength="1" :maxlength="20" v-model="account.loginName" placeholder="请输入用户微信id"></el-input>
                        </div>
                    </div>
                   <div class="items">
                        <div class="name">是否可以选择产品</div>
                        <div class="content">
                           <el-select v-model="account.cars" placeholder="请选择产品">
                            <el-option
                              v-for="item in carsList"
                              :key="item.uuid"
                              :label="item.name"
                              :value="item.uuid">
                            </el-option>
                          </el-select>
                          <el-select v-model="account.cars" placeholder="请选择产品系列">
                            <el-option
                              v-for="item in carsList"
                              :key="item.uuid"
                              :label="item.name"
                              :value="item.uuid">
                            </el-option>
                          </el-select>
                        </div>
                    </div>
                    
                </div>

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
                carsList:[]
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
        width: 450px;
        overflow: auto;
        .group{
            margin-bottom: 10px;
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
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                    }
                    .content{
                        margin-left: 120px;
                        .info{
                            margin-top: 2px;
                            font-size: 12px;
                            color: @FONT_COLOR_FOUR;
                        }
                    }
                }
            }


        }




    }
</style>
