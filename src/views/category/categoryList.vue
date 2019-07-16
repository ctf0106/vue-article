<template>
  <div class="app-container">
    <div style="float:left;width:220px;">
       <el-button size="mini" @click="addCategoryTop">添加顶级栏目</el-button>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-folder"></i>&nbsp;<span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              style="margin-left:5px;"
              @click="() => append(data)">
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button
              type="text"
              size="mini"
              style="margin-left:5px;"
              @click="() => edit(data)">
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
    <router-view></router-view>
  </div>
</div>
</template>

<script>
	import {getCategoryTree,deleteCategoryById} from '@/api/api'
  export default {
    data() {
      return {
        data: [],
      }
    },
    methods: {
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
       this.$router.push({name:"editCategory",query:{type:'add',categoryId:data.id,categoryName:data.label}})
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        this.deleteCategoryById(data.id);
      },
      edit(data){
        let categoryId=data.id;
        this.$router.push({name:"editCategory",query:{type:'update',categoryId:categoryId}})
      },
      async deleteCategoryById(categoryId){
        let data={
          categoryId:categoryId
        }
        let result= await deleteCategoryById(data);
        if(result.data!=null){
          this.$message({
            type: 'success',
            message: '删除成功'
          });  
        }
     },
     addCategoryTop(){
       this.$router.push({name:"editCategory",query:{type:'top'}})
     }
  },
    mounted(){
      this.getCategoryTree();
    }
  }
</script>
<style>
.footer{
  margin-top: 20px;
}
</style>
