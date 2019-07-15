<template>
  <div class="app-container">
    <div style="float:left;width:220px;">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="editCategory"
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
        this.deleteCategoryById(data.id);
      },
      editCategory(data,data2,data3){
        let categoryId=data.id;
        this.$router.push({name:"editCategory",query:{categoryId:categoryId}})
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
