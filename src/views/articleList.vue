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
      <el-table-column label="序号">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号"></el-table-column>
      <el-table-column label="标题"></el-table-column>
      <el-table-column label="文章类别"></el-table-column>
      <el-table-column label="发布日期"></el-table-column>
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
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
      }
    },
    mounted(){
      this.getArticleList()
    }
  }
</script>
<style>

</style>
