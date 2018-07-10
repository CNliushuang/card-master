<template>
    <Modal :title="title" @destroy="destroy" @submit="confirm">
        <div class="cropper_container" :style="style">
            <div class="select_file">
                <el-button size="mini" type="primary">选择图片</el-button>
                <input type="file" accept="image/jpg,image/jpeg,image/png" name="file" id="chooseImg" class="hidden" @change="selectImg">
            </div>
            <div class="image_wrapper">
                <div class="tailoring-box-parcel">
                    <img id="tailoringImg">
                </div>
                <div class="preview-box-parcel">
                    <p>图片预览：</p>
                    <div class="square previewImg"></div>
                </div>
            </div>
        </div>
        <template slot="footer" slot-scope="props">
            <div class="footer_operate" style="flex-grow: 1; text-align: center;">
                <span class="opt" style="float: left;">
                    <el-button size="mini" type="primary" plain @click.native="reset">复位</el-button>
                    <el-button size="mini" type="primary" plain @click.native="rotate">旋转</el-button>
                    <el-button size="mini" type="primary" plain @click.native="scaleX">换向</el-button>
                    <el-button size="mini" type="primary" plain @click.native="zoom(0.1)">放大</el-button>
                    <el-button size="mini" type="primary" plain @click.native="zoom(-0.1)">缩小</el-button>
                </span>
                <span style="float: right;">
                    <el-button size="mini" @click.native="confirm(props.close)" type="primary" :loading="locked?true:false"><template v-if="locked">图片上传中...</template><template v-else>上传图片</template></el-button>
                </span>
                
            </div>
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
                flagX:true,
                style:{},
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
            setStyle(){
                var width = document.body.offsetWidth - 100;
                var height = document.body.offsetHeight -200;
                var style = {
                    width:width+'px',
                    height:height+'px'
                }
                this.style = style;



            },
            confirm(close){
                 if ($("#tailoringImg").attr("src") == null ){
                    return false;
                }else{
                    var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
                    var base64url = cas.toDataURL('image/jpeg'); //转换为base64地址形式
                    if(base64url && !this.locked){
                        this.locked = true;
                        setTimeout(() => {
                            this.locked = false;
                        },15000)
                        api.uploadImg(base64url,(res) => {
                            console.log(res);
                            this.locked = false;
                            if(res && res.file){
                                this.callback && this.callback(JSON.parse(res.file));
                                close();
                            }
                        })
                    }
                }
            },
            selectImg(e) {
                let file = e.target;
                if (!file.files || !file.files[0]){
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var replaceSrc = evt.target.result;
                    //更换cropper的图片
                    $('#tailoringImg').cropper('replace', replaceSrc,false);//默认false，适应高度，不失真
                }
                reader.readAsDataURL(file.files[0]);
            },
            initCropper(){
                $('#tailoringImg').cropper({
                    // aspectRatio: 1/1,//默认比例
                    preview: '.previewImg',//预览视图
                    guides: false,  //裁剪框的虚线(九宫格)
                    autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
                    movable: true, //是否允许移动图片
                    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
                    movable: true,  //是否允许移动剪裁框
                    resizable: true,  //是否允许改变裁剪框的大小
                    zoomable: true,  //是否允许缩放图片大小
                    mouseWheelZoom: true,  //是否允许通过鼠标滚轮来缩放图片
                    touchDragZoom: false,  //是否允许通过触摸移动来缩放图片
                    rotatable: true,  //是否允许旋转图片
                    crop: function(e) {
                        // 输出结果数据裁剪图像。
                    }
                });
            },
            reset(){
                $('#tailoringImg').cropper("reset");
            },
            rotate(){
                $('#tailoringImg').cropper("rotate", 45);
            },
            scaleX(){
                if(this.flagX){
                    $('#tailoringImg').cropper("scaleX", -1);
                    this.flagX = false;
                }else{
                    $('#tailoringImg').cropper("scaleX", 1);
                    this.flagX = true;
                }
                this.flagX != this.flagX;
            },
            zoom(key){
                $('#tailoringImg').cropper("zoom", key);
            }
            
        },
        computed:{

        },
        created(){
        },  
        mounted() {
            this.$nextTick(() => {
                this.initCropper();
                this.setStyle();
            })
        },
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .cropper_container{
        width: 1000px;
        display: flex;
        flex-direction: column;
        .select_file{
            position: relative;
            flex-shrink: 0;
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

        .image_wrapper{
            width: 100%;
            height: 0;
            flex-grow: 1;
            position: relative;
            padding: 5px 0;
            display: flex;
            flex-direction: row;
            .tailoring-box-parcel{
                width: 520px;
                height: 100%;
                // position: absolute;
                // left: 0;
                border: solid 1px #ddd;
                flex-grow: 1;
            }
            .preview-box-parcel{
                // display: inline-block;
                width: 228px;
                height: 100%;
                // position: absolute;
                // right: 0;
                padding: 4px 14px;
                box-sizing: border-box;
                flex-shrink: 0;
                p{
                    color: #555;
                }
                .previewImg{
                    width: 200px;
                    height: 200px;
                    overflow: hidden;
                }
                .square{
                    margin-top: 10px;
                    border: solid 1px #ddd;
                }
                .circular{
                    border-radius: 100%;
                    margin-top: 10px;
                    border: solid 1px #ddd;
                }
            }
        }


    }
    
</style>