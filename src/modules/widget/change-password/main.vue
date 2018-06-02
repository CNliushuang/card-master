<template>
    <modal :title="'修改密码'" @destroy="destroy" @submit="submit">
        <div class="change_password" :style="{height:height+'px'}">
            <div class="items clearfix">
                <div class="name">旧密码</div>
                <div class="content">
                    <el-input placeholder="旧密码" type="password" v-model="password.old"></el-input>
                </div>
            </div>
            <div class="items clearfix">
                <div class="name">新密码</div>
                <div class="content">
                    <el-input placeholder="新密码" type="password" v-model="password.new"></el-input>
                </div>
            </div>
            <div class="items clearfix">
                <div class="name">确认密码</div>
                <div class="content">
                    <el-input placeholder="确认密码" type="password" v-model="password.confirm"></el-input>
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
                password:{
                    old:"",
                    new:"",
                    confirm:""
                }
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
            submit(close){
                if(!this.password.old){
                    this.$message.error('请填写旧密码');
                    return false;
                }
                if(!this.password.new){
                    this.$message.error('请填写新密码');
                    return false;
                }
                if(!this.password.confirm){
                    this.$message.error('请填写确认密码');
                    return false;
                }
                if(this.password.new != this.password.confirm){
                    this.$message.error('新密码和确认密码不一致');
                    return false;
                }


                api.changePassword({oldPassword:this.password.old,password:this.password.new},() => {
                    this.$message({
                      message: '密码修改成功',
                      type: 'success'
                    });
                    close && close();
                })

                
            },
            setHeight(){
                // var pageHeight = document.body.clientHeight;
                // var height = pageHeight - 150 - 40;
                this.height = 200;
            }

        },
        mounted(){
            this.setHeight();
            
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .change_password{
        width: 450px;
        overflow: auto;
        .items{
            margin: 10px 60px 20px 0;
            .name{
                width: 80px;
                height: 30px;
                line-height: 30px;
                float: left;
            }
            .content{
                margin-left: 80px;
                .info{
                    margin-top: 2px;
                    font-size: 12px;
                    color: @FONT_COLOR_FOUR;
                }
            }
        }

    }
</style>
