<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="类别名称">
          <el-input  placeholder="类别名称" v-model="categoryName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getInitList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="categoryList" >
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="主键" property="categoryId"></el-table-column>
      <el-table-column label="类别" property="categoryName"></el-table-column>
      <el-table-column label="创建时间" :formatter="dateFormat" property="gmtCreate"></el-table-column>
      <el-table-column label="修改时间" :formatter="dateFormat" property="gmtUpdate"></el-table-column>
      <el-table-column label="是否最终列表"  property="last"></el-table-column>
      <el-table-column label="路径地址"  property="categoryPath"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
	import { getCategoryList } from '@/api/api'
  export default {
    data() {
      return {
        categoryName:'',
        categoryList:[],
      }
    },
    methods: {
      getInitList(){
        this.getCategoryList();
      },
      handleEdit(val){
        console.log(val);
      },
      handleDelete(val){
        console.log(val);
      },
     async getCategoryList(){
       let data={
         categoryName:this.categoryName,
       }
      let categoryList= await getCategoryList(data);
      this.categoryList=categoryList.data;
     },
      dateFormat:function(row,column){
       var t=new Date(row.gmtCreate);//row 表示一行数据, updateTime 表示要格式化的字段名称
    　　var year=t.getFullYear(),
       　　 month=t.getMonth()+1,
       　　 day=t.getDate(),
      　　  hour=t.getHours(),
      　　  min=t.getMinutes(),
      　　  sec=t.getSeconds();
  　　  var newTime=year+'-'+
      　　  (month<10?'0'+month:month)+'-'+
     　　   (day<10?'0'+day:day)+' '+
      　　  (hour<10?'0'+hour:hour)+':'+
      　　  (min<10?'0'+min:min)+':'+
      　　  (sec<10?'0'+sec:sec);
  　　  return newTime;
      },
    },
    mounted(){
      this.getCategoryList()
    }
  }
</script>
<style>

</style>
