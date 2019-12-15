<template>
    <div class="container">
      <el-form ref="form" :model="articleDetail" label-width="80px" show-word-limit maxlength="20">
        <el-form-item label="文章标题" >
          <el-input v-model="articleDetail.title"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select v-model="articleDetail.categoryId"  placeholder="请选择活动区域" value-key="categoryId">
             <el-option
              v-for="category in categoryAllList"
              :key="category.categoryId"
              :value="category.categoryId"
              :label="category.categoryName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" >
          <el-input v-model="articleDetail.keywords"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="articleDetail.description"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="作者" >
          <el-input v-model="articleDetail.writer"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="文章头图" style="width:500px;">
          <el-upload
            :action="uploadAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="uploadTitlePicSuccess"
            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor 
          class="editor"
          v-model="articleDetail.content"
          ref="myQuillEditor" 
          :options="editorOption" 
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
          </quill-editor>
          <!-- 图片上传组件辅助-->
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            name="img"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
	import {getArticleDetailById,getCategoryAllList,saveOrUpdateArticle} from '@/api/api'
export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000 //kb
    }
  },

  components: {
    quillEditor
  },

  data() {
    return {
      content: this.value,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              // link: function(value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            }
          }
        }
      },
      serverUrl: "/v1/blog/imgUpload", // 这里写你要上传的图片服务器地址
      header: {
      }, // 有的图片服务器要求请求头需要有token
      articleId:null,//如果是修改则articleId不为空
      articleDetail:{
        title:null,
        articleId:null,
        categoryName:null,
        categoryId:null,
        keywords:null,
        description:null,
        content:null,
        recommend:null,
        writer:null,
        top:null,
        titlePic:null,
      },
      fileList: [],
      categoryAllList:[],
      uploadAction:"/attach/upload",
    };
    
  },

  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },

    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess(res) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data[0].url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    
    //获取文章详情
    async getArticleDetailById(){
       let data={
         articleId:this.articleId,
       }
      let result= await getArticleDetailById(data);
      if(result.data!=null){
        let data=result.data.data;
        this.articleDetail=data;
        let articleTitlePic=data.titlePic;
        if(articleTitlePic!=null && articleTitlePic!=""){
          this.fileList.push({name:"titlePic",url:articleTitlePic});
        }
        
      } 
    },
    handleRemove(file, fileList) {
      this.articleDetail.titlePic="";
    },
    handlePreview(file) {
      console.log(file);
    },
     //查询类目列表
    async getCategoryAllList(){
      let data={
        categoryName:this.categoryName,
      }
      let result= await getCategoryAllList(data);
      if(result.data!=null){
        this.categoryAllList=result.data.data;
      }
      console.log(this.categoryAllList);
    },
    uploadTitlePicSuccess(res){
      let data=res.data;
      this.fileList=data;
      if(data!=null && data.length>0){
        let pic=data[0];
        this.articleDetail.titlePic=pic.url;
      }
      console.log(this.articleDetail);
    },
    //获取文章详情
    async getArticleDetailById(){
       let data={
         articleId:this.articleId,
       }
      let result= await getArticleDetailById(data);
      if(result.data!=null){
        let data=result.data.data;
        this.articleDetail=data;
        let articleTitlePic=data.titlePic;
        if(articleTitlePic!=null && articleTitlePic!=""){
          this.fileList.push({name:"titlePic",url:articleTitlePic});
        }
        
      } 
    },
    async onSubmit() {
      let data=this.articleDetail;
      let result= await saveOrUpdateArticle(data);
      if(result.data!=null){
        if(result.data.code==200){
          this.$router.push({name:"articleList"})
        }
      }
    },
  },
  created(){
    let articleId=this.$route.query.articleId
    this.articleId=articleId;
    if(articleId!=null && articleId!="" && articleId!=undefined){
      this.getArticleDetailById();
    }
  },
  mounted(){
    this.getCategoryAllList();
  }
};
</script> 

<style>
.container{
  padding: 24px;
  
}
.el-form{
  width: 80%;
}

.editor {
  line-height: normal !important;
  height: 400px;
}
.ql-toolbar{
  height: 40px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
.line{
  text-align: center;
}
</style>
