<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input  placeholder="文章标题"></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="articleList.list" >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="标题" property="title"></el-table-column>
      <el-table-column label="作者"  property="writer"></el-table-column>
      <el-table-column label="发布日期"  :formatter="dateFormat" property="gmtCreate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
  </div>
</div>
</template>

<script>
	import { getArticleList } from '../api/api'
  export default {
    data() {
      return {
        pageNum:1,
        pageSize:10,
        articleList:'',
      }
    },
    methods: {
     async getArticleList(){
       let data={
         pageNum:this.pageNum,
         pageSize:this.pageSize,
       }
      let articleList= await getArticleList(data);
      this.articleList=articleList.data;
      console.log(articleList);
     },
      handleSizeChange(val) {
        console.log(val)
      },
      handleCurrentChange(val) {
        console.log(val)
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
      this.getArticleList()
    }
  }
</script>
<style>

</style>
