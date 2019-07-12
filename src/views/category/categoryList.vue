<template>
  <div class="app-container">
    <div style="float:left;width:220px;">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="showCategoryDetail"
        >
        
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-folder"></i>&nbsp;<span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              <i class="el-icon-remove-outline"></i>
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  <div style="float:left">
    <div class="filter-container">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="类别名称">
          <el-input  placeholder="类别名称" clearable v-model="searchInfo.categoryName" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="是否最终列">
           <el-select clearable  v-model="searchInfo.last" placeholder="请选择" style="width:100px">
            <el-option
              v-for="item in lastList"
              :key="item.index"
              :value="item.index"
              :label="item.lastName"
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
            clearable
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getInitList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="categoryList" >
      <el-table-column label="序号"  width="50" type="index"></el-table-column>
      <el-table-column label="主键" width="50" property="categoryId"></el-table-column>
      <el-table-column label="类别" width="100"  property="categoryName"></el-table-column>
      <el-table-column label="创建时间" :formatter="dateFormat" property="gmtCreate"></el-table-column>
      <el-table-column label="修改时间" :formatter="dateFormat" property="gmtUpdate"></el-table-column>
      <el-table-column label="是否最终列表"  property="last" :formatter="lastFormatter"></el-table-column>
      <el-table-column label="路径地址"  property="categoryPath"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.categoryId)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.categoryId)">删除</el-button>
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
        :total="categoryPageInfo.total">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
	import {getCategoryList,getCategoryTree} from '@/api/api'
  export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }]
      }];
      return {
        categoryPageInfo:{
          total:0,
        },//类目列表
        categoryList:[],
         data: JSON.parse(JSON.stringify(data)),
        lastList:[
          { 
            index:0,
            lastName:'否'
          },{
            index:1,
            lastName:'是'
          }
        ],
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
          categoryName:null,//名称  搜索
          startDate:null,//开始时间
          endDate:null,//结束时间
          pageNum:1,//开始页
          pageSize:10,//每页数量
        },
      }
    },
    methods: {
       getInitList(){
        this.searchInfo.pageNum=1;
        this.getCategoryPageInfo();
      },
      handleEdit(val){
        
      },
      handleDelete(val){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //选择每页大小
      handleSizeChange(val) {
        this.searchInfo.pageSize=val;
        this.getInitList();
      },
      //当前页码
      handleCurrentChange(val) {
        this.searchInfo.pageNum=val;
        this.getCategoryPageInfo();
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
     async getCategoryPageInfo(){
       let data=this.searchInfo;
      let result= await getCategoryList(data);
      if(result.data!=null){
        this.categoryPageInfo=result.data.data;
        this.categoryList=result.data.data.list;
        console.log(this.categoryPageInfo);
      }
     },
     lastFormatter(row,column){
      if(row.last==1){
        return "是"
      }else{
        return "否"
      }
     },
     //查询类目列表
     async getCategoryTree(){
       let data={
       }
      let result= await getCategoryTree(data);
      if(result.data!=null){
      this.data=result.data.data;
      console.log(this.data);
      }
     },
      append(data) {
        const newChild = { id:null, label: '新增类别', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      showCategoryDetail(data,data2,data3){
        let lable=data.label;
        this.searchInfo.categoryName=lable;
        this.getCategoryPageInfo();
        console.log(data);
        console.log(data2);
        console.log(data3)
      }
    },
    mounted(){
      this.getCategoryPageInfo();
      this.getCategoryTree();
    }
  }
</script>
<style>
.footer{
  margin-top: 20px;
}
</style>
