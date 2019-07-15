<template>
    <div class="container">
      <el-form ref="form" :model="category" label-width="80px" show-word-limit maxlength="20">
        <el-form-item label="类目名称" >
          <el-input v-model="category.categoryName"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="最终列表">
         <el-switch
          v-model="category.last"
          active-text="是"
          change=lastChange
          inactive-text="否">
        </el-switch>
        </el-form-item>
        <el-form-item label="路径" >
          <el-input v-model="category.categoryPath"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="关键词" >
          <el-input v-model="category.keywords"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="category.description"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>

import {getCategoryDetaiById,saveOrUpdateCategory} from '@/api/api'
export default {
  data() {
    return {
      category:{
        categoryId:null,
        title:null,
        categoryName:null,
        keywords:null,
        description:null,
      },
      categoryAllList:[],      
    };
    
  },

  methods: {
    
    //获取类目
    async getCategoryDetaiById(){
       let data={
         categoryId:this.category.categoryId,
       }
      let result= await getCategoryDetaiById(data);
      if(result.data!=null){
        let data=result.data.data;
        this.category=data;        
      } 
    },
    async onSubmit() {
      let data=this.category;
      let result= await saveOrUpdateCategory(data);
      if(result.data!=null){
        if(result.data.code==200){
          
        }
      }
    },
    lastChange(){
      
    }
  },
  created(){
    
  },
  mounted(){
    let categoryId=this.$route.query.categoryId
    if(categoryId!=null && categoryId!="" && categoryId!=undefined){
      this.category.categoryId=categoryId;
      this.getCategoryDetaiById();
    }
  },
  watch:{
    '$route' (to,from) {
       let categoryId=this.$route.query.categoryId
      if(categoryId!=null && categoryId!="" && categoryId!=undefined){
        this.category.categoryId=categoryId;
        this.getCategoryDetaiById();
      }
    }
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
