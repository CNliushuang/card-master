<template>
    <modal :title="'新增产品'" @destroy="destroy" @submit="submit">
        <div class="modal_slide_wrapper" :style="{height:height+'px'}">
            <div class="group">
                <div class="name">
                    所属分类
                </div>
                <div class="content">
                    <el-select v-model="product.typeId" :disabled="true" placeholder="请选择">
                        <el-option
                            v-for="item in typeList"
                            :key="item.uuid"
                            :label="item.name"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    产品名称
                </div>
                <div class="content">
                    <el-input v-model="product.name"></el-input>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    产品banner
                </div>
                <div class="content">
                    <img v-if="product.cover" :src="product.cover">
                    <el-button @click="goUpload" size="mini" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </div>
            </div>
            <div class="group">
                <div class="name">
                    内容
                </div>
                <div class="content">
                    <!-- <div class="editor" ref="editor" style="height: 200px;"></div> -->
                    <template v-for="(items,index) in content">
                        <div v-if="items.type == 'image'" class="items">
                            <div class="items_box">
                                <img  :src="items.url">
                            </div>
                            <i class="el-icon-delete" title="删除" @click="deleteItems(index)"></i>
                        </div>
                        <div v-if="items.type == 'text'" class="items">
                            <div class="items_box">
                                <el-input type="textarea" :value="items.summary" @change="changeSummary(index,$event)" placeholder="请输入内容"></el-input>
                            </div>
                            <i class="el-icon-delete" title="删除" @click="deleteItems(index)"></i>
                        </div>
                    </template>
                    <div class="operate">
                        <el-button @click="goAddImage">插入图片</el-button>
                        <el-button  type="primary" @click="goAddText">插入文本</el-button>
                    </div>

                </div>
            </div>

        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';
    import Editor from '@/config/quill'
    import Upload from '@/modules/widget/upload'


    export default{
        components:{
            Modal
        },
        data(){
            return {
                height:200,
                product:{
                    typeId:"",
                    name:"",
                    cover:""
                },
                content:[],
                editor:[],
                locked:false,
                typeList:[],
                editor:null,
                toolbar:[
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  ['blockquote', 'code-block'],

                 //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
                  [{ 'list': 'ordered'}],
                  //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

                  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

                  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

                  [ 'link', 'image' ],

                  [ 'emoji' ],

                ],
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
            goAddText(){
                var temp = {
                    type:"text",
                    summary:""
                }
                this.content.push(temp)
            },
            goAddImage(){
                Upload({
                    callback:(data) => {
                        var temp = {
                            type:"image",
                            url:data[0].url
                        }
                        this.content.push(temp);
                    }
                })
            },
            goUpload(){
                Upload({
                    callback:(data) => {
                        this.product.cover = data[0].url;
                    }
                })
            },
            deleteItems(index){
                this.content.splice(index,1);
            },
            changeSummary(index,val){
                this.content[index].summary = val;
            },

            submit(close){
                if(!this.product.name){
                    this.$message.error('请填写产品名称');
                    return false;
                }
                // const content =document.querySelector(`#${this.editor.id} .ql-editor`).innerHTML;
                // const summary = content.replace(/<img.*?(?:>|\/>)/gi, '[图片]').replace(/<\/?[^>]*>/gi,'');
                var content = JSON.stringify(this.content);
                var summary = "";
                var cover = this.product.cover;
                var img_box = [];
                for(var items of this.content){
                    if(items.type == 'image'){
                        img_box.push(items.url);
                    }
                }
                if(img_box.length > 0 && !this.product.cover){
                    cover = img_box[0];
                }

                if(!this.product.uuid){
                    api.newProduct({name:this.product.name,typeId:this.product.typeId,content,summary,cover},() => {
                        this.callback && this.callback();
                        close && close();
                    })
                }else{
                    api.modifyProduct({uuid:this.product.uuid,name:this.product.name,typeId:this.product.typeId,content,summary,cover},() => {
                        this.callback && this.callback();
                        close && close();
                    })
                }
                
            },
            setEditor(){
                setTimeout(() => {
                    this.editor = new Editor({
                        placeholder:'',
                        theme:"snow",
                        container: this.$refs.editor,
                        toolbar:this.toolbar,
                        change: () => {

                        }
                    });

                    setTimeout(() =>{
                        this.editor.Quill.focus();
                        if(this.product.content){
                            this.editor.Quill.pasteHTML(this.product.content);
                        }
                    },500)


                })

            },

        },
        mounted(){
            this.setHeight();
            // this.setEditor();
            console.log(this.parent);
            if(this.parent){
                this.product.typeId = this.parent.uuid;
                var temp = [];
                temp.push(this.parent);
                this.typeList = temp;
            }
            if(this.product && !this.parent){
                var temp = [];
                var temp_type = {
                    uuid:this.product.typeId,
                    name:this.product.typeName
                }
                temp.push(temp_type);
                this.typeList = temp;
                if(this.product.content){
                    this.content = JSON.parse(this.product.content)
                }
            }
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modal_slide_wrapper{
        width: 700px;
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
                .items{
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 10px;
                    i{
                        width: 27px;
                        text-align: center;
                        font-size: 16px;
                        flex-shrink: 0;
                        cursor: pointer;
                        &:hover{
                            color: #37a0f8;
                        }
                    }
                    .items_box{
                        flex-grow: 1;
                        width: 0;
                    }
                }
                .operate{
                    margin-top: 20px;
                }
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
