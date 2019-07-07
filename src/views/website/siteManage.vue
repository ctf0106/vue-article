<template>
    <div class="container">
      <el-form ref="form" :model="site" label-width="100px" show-word-limit maxlength="20">
        <el-form-item label="网站名称" >
          <el-input v-model="site.title"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="关键词" >
          <el-input v-model="site.keywords"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="site.description"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="站点根网址" >
          <el-input v-model="site.basePath"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="网站版权信息">
            <el-input v-model="site.powerBy"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="网站备案号">
            <el-input v-model="site.webRecord"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import {getOneSite,saveOrUpdateSite} from '@/api/api'
export default {
  data() {
    return {
      site:{
        siteId:null,
        title:null,
        keywords:null,
        description:null,
        basePath:null,
        powerBy:null,
        webRecord:null
      },
    };
    
  },

  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },

   
    //获取网站详情
    async getOneSite(){
       let data={
       }
      let result= await getOneSite(data);
      if(result.data!=null){
        let data=result.data.data;
        this.site=data;
      } 
    },
    async onSubmit() {
      let data=this.site;
      let result= await saveOrUpdateSite(data);
      if(result.data!=null){
        if(result.data.code==200){
        //   this.$router.push({name:"articleList"})
        }
      }
    },
  },
  created(){
    
  },
  mounted(){
    this.getOneSite();
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
