<template>
    <div class="container">
      <el-form ref="form" :model="category" label-width="80px" show-word-limit maxlength="20">
        <el-form-item label="类目名称" >
          <el-input v-model="category.categoryName"  style="width:350px;"></el-input>
          <el-button @click="createPath">生成路径</el-button>
        </el-form-item>
        <el-form-item label="最终列表">
        <el-select v-model="category.last"  filterable clearable placeholder="请选择">
          <el-option v-for="(item,index) in lastList" 
          :key="index" 
          :label="item.label" 
          :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="父类" >
          <el-input v-model="category.parentName"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="排序" >
          <el-input v-model="category.sort"  style="width:350px;"></el-input>
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

import {getCategoryDetaiById,saveOrUpdateCategory,getPinYin} from '@/api/api'
import { constants } from 'crypto';
export default {
  data() {
    return {
      category:{
        categoryId:null,
        title:null,
        categoryName:null,
        keywords:null,
        description:null,
        parentName:null,
        parentId:null,
        last:null,
        categoryPath:null,
      },
      categoryAllList:[],
      lastList: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
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
      //知识点
      this.category.last = String(this.category.last) 
    },
    async onSubmit() {
      let data=this.category;
      let result= await saveOrUpdateCategory(data);
      if(result.data!=null){
        if(result.data.code==200){
          this.$message({
            type: 'success',
            message: '操作成功！'
          });  
        }
      }
    },
    loadData(){
      let type=this.$route.query.type;
      if(type=='top'){
        this.category={
          categoryId:null,
          title:null,
          categoryName:null,
          keywords:null,
          description:null,
        }
      }else if(type=="add"){
        this.category={
          categoryId:null,
          title:null,
          categoryName:null,
          keywords:null,
          description:null,
        }
        let categoryId=this.$route.query.categoryId;
        let parentName=this.$route.query.categoryName;
        this.category.parentId=categoryId;
        this.category.parentName=parentName;
      }else if(type=='update'){
        let categoryId=this.$route.query.categoryId
        if(categoryId!=null && categoryId!="" && categoryId!=undefined){
          this.category.categoryId=categoryId;
          this.getCategoryDetaiById();
        }
      }
    },
    async createPath(){
      console.log(this.category.categoryName);
      let data={
         categoryName:this.category.categoryName
       }
      let result = await getPinYin(data);
      if(result.data!=null){
        let categoryPath=result.data.data;
        this.category.categoryPath=categoryPath;        
      }
    }

  },
  created(){
    
  },
  mounted(){
      this.loadData();
  },
  watch:{
    '$route' (to,from) {
       this.loadData()
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
</style>
