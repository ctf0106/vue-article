<template>
    <div class="container">
      <el-form ref="form" :model="user" label-width="100px" show-word-limit maxlength="20">
        <el-form-item label="用户名" >
          <el-input v-model="user.userName"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="user.nickName"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="头像" >
          <el-input v-model="user.attachId"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="工作" >
          <el-input v-model="user.job"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="城市">
            <el-input v-model="user.liveCity"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="微信">
            <el-input v-model="user.wechat"  style="width:350px;"></el-input>
        </el-form-item>
         <el-form-item label="电子邮件">
            <el-input v-model="user.email"  style="width:350px;"></el-input>
        </el-form-item>
         <el-form-item label="QQ号">
            <el-input v-model="user.qq"  style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import {getUser,saveOrUpdateUser} from '@/api/api'
export default {
  data() {
    return {
      user:{
        userId:null,
        userName:null,
        nickName:null,
        job:null,
        liveCity:null,
        wechat:null,
        email:null,
        qq:null
      },
    };
    
  },

  methods: {

    //获取网站详情
    async getUser(){
       let data={
       }
      let result= await getUser(data);
      if(result.data!=null){
        let data=result.data.data;
        this.user=data;
      } 
    },
    async onSubmit() {
      let data=this.user;
      let result= await saveOrUpdateUser(data);
      if(result.data!=null){
        if(result.data.code==200){
          this.$message({
            type: 'success',
            message: '修改成功！'
          }); 
        }
      }
    },
  },
  created(){
    
  },
  mounted(){
    this.getUser();
  }
};
</script> 

<style>

</style>
