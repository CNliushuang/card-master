<template>
    <Modal :title="title" @destroy="destroy" @submit="confirm">
        <div class="select_file">
            <el-button size="mini" type="primary">选择图片</el-button>
            <input type="file"  @change="updateIco">
        </div>
        <div class="crop_img">
            <div class="imgBox" style="width:100%;" ref="imgbox">
                <img id="cropImg" style="width:100%;"/>
            </div>
            <canvas id="canvas1" style="display:none;"></canvas>
        </div>

        <template slot="footer" slot-scope="props">
            <!-- <v-button @click.native="props.close">取消</v-button> -->
            <!-- <v-button @click.native="confirm(props.close)" :type="'blue'" :icon="locked ? 'loading-blue' : null">确定</v-button> -->
            <el-button size="mini" @click.native="props.close">取消</el-button>
            <el-button size="mini" @click.native="confirm(props.close)" type="primary" :loading="locked?true:false"><template v-if="locked">图片上传中...</template><template v-else>上传图片</template></el-button>
        </template>

    </Modal>
</template>
<script>
    import * as api from './api';

    import Modal from '@/modules/widget/common/Modal.vue';
    //import Toast from '@/modules/widget/toast'
    export default{
        components: {
            Modal
        },
        data(){
            return{
                title:'图片裁剪',
                target:null,
                crop:false,
                src:'',
                headerIco:false,
                locked:false,
                callback:function(){
                }

            }
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            confirm(close){
                var canvas1,image;
                if(this.crop){
                    canvas1 = document.getElementById('canvas1');
                    image = canvas1.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                }else{
                    image =$('#cropImg').attr('src');
                }
                this.crop = false;

                console.log(image)
                if(image && !this.locked){
                    this.locked = true;
                    setTimeout(() => {
                        this.locked = false;
                    },5000)
                    api.uploadImg(image,(res) => {
                        console.log(res);
                        this.locked = false;
                        if(res && res.file){
                            this.callback && this.callback(JSON.parse(res.file));
                            close();
                        }
                    })
                }

                // this.callback(image);
               // close();
            },
            updateIco(e){
                var type = e.target.files[0].type;
                if(!/(jpg|png|gif|jpg|jpeg|JPG|JPEG|GIF|PNG|bmp|BMP)$/.test(type)){
                    this.$message.error('请传入正确的图片格式');
                    return false;
                };
                this.target = e.target;
                this.initCrop();
            },
            initCrop(){
                var _this=this;
                var canvas1 = document.getElementById('canvas1');
                var context = canvas1.getContext('2d');
                var fr = new FileReader();
                var file = _this.target.files[0];
                var marginTop = 0,ratio=1,imgWidth,imgHeight,dataUrl,img;
                fr.onload = function(e){
                    img = document.getElementById('cropImg');
                    dataUrl = e.target.result;
                    img.onload = function () {
                        imgWidth = this.width;
                        imgHeight = this.height;
                       if(imgWidth > imgHeight) {
                            ratio = imgWidth / 300;
                        }else{
                            ratio = imgHeight / _this.$refs.imgbox.clientHeight;
                        }
                        //var cropImg=document.getElementById('cropImg');
                        $("#cropImg").Jcrop({
                            setSelect:[0,0,100,100]
                        });
                    };
                    img.src = dataUrl;
                }
                fr.onloadend = function(e){
                    //var cropImg=document.getElementById('cropImg');
                    $("#cropImg").Jcrop({
                        // aspectRatio: 1,
                        bgColor: 'rgba(0,0,0,0.4)',
                        onSelect: function(c) {
                            var image = new Image();
                            image.src = dataUrl;
                            if(_this.headerIco){
                                canvas1.width = 100;
                                canvas1.height = 100;
                                context.drawImage(image, c.x* ratio, c.y* ratio, (c.x2- c.x)* ratio, (c.y2- c.y)* ratio,0,0,100,100);
                            }else{
                                canvas1.width = (c.x2- c.x)* ratio;
                                canvas1.height = (c.y2- c.y)* ratio;
                                context.drawImage(image, c.x* ratio, c.y* ratio, (c.x2- c.x)* ratio, (c.y2- c.y)* ratio,0,0,(c.x2- c.x)* ratio, (c.y2- c.y)* ratio);
                            }
                            _this.crop = true;
                        },
                    });
                };
                fr.readAsDataURL(file);
            }
        },
        computed:{

        },
        created(){
        },  
        mounted() {
            this.$nextTick(() => {
               
            });
            
        },
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .rounded-corners(@radius:5px) {
        -webkit-border-radius: @radius;
        -moz-border-radius: @radius;
        -ms-border-radius: @radius;
        -o-border-radius: @radius;
        border-radius: @radius;
    }
    .clearfix {
      zoom: 1;
    }
    .select_file{
        position: relative;
        input{
            width: 100%;
            height: 30px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
    }

    .clearfix:after {
      display: block;
      content: '';
      clear: both;
    }
    .crop_img{
        //width:@MODAL_WIDTH;
        width:600px;
        height:300px;
        overflow:hidden;
    }
</style>