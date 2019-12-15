<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input  placeholder="文章标题" size="mini" clearable v-model="searchInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="文章类别">
           <el-select clearable v-model="searchInfo.categoryId" size="mini" placeholder="请选择" >
            <el-option
              v-for="category in categoryAllList"
              :key="category.categoryId"
              :value="category.categoryId"
              :label="category.categoryName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="searchInfo.startDate"
            align="right"
            type="date"
            placeholder="开始时间"
            value-format="yyyy-MM-dd"
            size="mini"
            clearable
            :picker-options="pickerOptions">
          </el-date-picker>
          &nbsp;-&nbsp;
          <el-date-picker
            v-model="searchInfo.endDate"
            align="right"
            type="date"
            placeholder="结束时间"
            value-format="yyyy-MM-dd"
            size="mini"
            clearable
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        
        <el-button type="primary"  @click="getInitList" size="mini">查询</el-button>

        <el-button type="primary"  @click="againSyncIndexBtn" size="mini">重新同步索引</el-button>
        
      </el-form>
    </div>
    <el-table :data="articleList.list" >
      <el-table-column label="序号" width="80" type="index" sortable></el-table-column>
      <el-table-column label="类别" width="100" property="categoryName" sortable></el-table-column>
      <el-table-column label="标题" >
        <template slot-scope="scope">
           <a :href="[scope.row.articlePath]" target="_blank">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="关键词" property="keywords"></el-table-column>
      <el-table-column label="作者"  width="100" property="writer"></el-table-column>
      <el-table-column label="点击数"  width="100" property="onclick" sortable></el-table-column>
      <el-table-column label="发布日期"  :formatter="dateFormat" property="gmtCreate"></el-table-column>
      <el-table-column label="更新日期"  :formatter="dateFormat" property="gmtModify"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.articleId)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleList.total">
      </el-pagination>
  </div>
</div>
</template>

<script>
	import { getArticleList,deleteArticleById,getCategoryAllList,againSyncIndex} from '@/api/api'
  export default {
    data() {
      return {
        articleList:[],
        categoryAllList:[],//类目列表
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        searchInfo:{
          title:null,//搜索
          categoryId:null,//类目id  搜索
          startDate:null,//开始时间
          endDate:null,//结束时间
          pageNum:1,//开始页
          pageSize:10,//每页数量
        }
      }
    },
    methods: {
       getInitList(){
        this.searchInfo.pageNum=1;
        this.getArticleList();
      },
      handleEdit(val){
        this.$confirm('是否要进行修改操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$router.push({name:"writeArticle",query:{articleId:val}})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消编辑'
          });          
        });
      },
      handleDelete(val){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.deleteArticleById(val)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //查询文章列表
     async getArticleList(){
       let data=this.searchInfo;
      let result= await getArticleList(data);
      if(result.data!=null && result.data.code=="200"){
        this.articleList=result.data.data;
      }
     },
     //删除文章
     async deleteArticleById(articleId){
       console.log(articleId)
       let data={
         articleId:articleId,
       }
      let result= await deleteArticleById(data);
      if(result.data!=null){
        let code=result.data.code;
        if(code==200){
          this.$message({
            type: 'success',
            message: '删除成功'
          });  
        }else{
          this.$message({
            type: 'error',
            message: '删除失败'
          });  
        }
      }
      this.getInitList();
     },
      handleSizeChange(val) {
        this.searchInfo.pageSize=val;
        this.getArticleList();
      },
      handleCurrentChange(val) {
        this.searchInfo.pageNum=val;
        this.getArticleList();
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
      //查询类目列表
     async getCategoryAllList(){
       let data={
         categoryName:this.categoryName,
       }
      let result= await getCategoryAllList(data);
      if(result.data!=null){
        this.categoryAllList=result.data.data;
        console.log(this.categoryAllList);
      }
     },
    async againSyncIndexBtn(){

      let result= await againSyncIndex();
      if(result.data!=null){
        let code=result.data.code;
        if(code==200){
          this.$message({
            type: 'success',
            message: '同步成功'
          });  
        }else{
          this.$message({
            type: 'error',
            message: '同步失败'
          });  
        }
      }
          
    },

    },
    mounted(){
      this.getArticleList();
      this.getCategoryAllList();
    }
  }
</script>
<style>
.footer{
  margin-top: 20px;
}
</style>
