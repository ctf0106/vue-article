<template>
  <el-container style="min-height:100vh">
    <el-aside width="200px" style="background-color:#324157;" >
      <el-row>
        <el-col :span="24" style="height:50px;line-height:50px;color:#FFF;font-size:14px;padding-left:30px;"><i class="el-icon-price-tag"></i>首页</el-col>
      </el-row>
        <el-menu router background-color="#324157" style="border-right:0px;" text-color="#fff" active-text-color="#1890ff">
          <nav-menu :navMenus="menuData"></nav-menu>
        </el-menu>
    </el-aside>
   
    <el-container>
      <el-header class="header">
        <!-- <el-breadcrumb separator="/" style="line-height:50px;float:left;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right:15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>曹先生</span>
      </el-header>
      <!-- <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleTabsEdit">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <el-container>
              <el-main>
                <router-view></router-view>
              </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs> -->
      

      <el-container>
              <el-main>
                <router-view></router-view>
              </el-main>
      </el-container>

    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  components: {
    NavMenu: NavMenu
  },
  data() {
    return {
      editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
      menuData: [
        //文章管理
        {
          entity: {
            id: 1,
            name: "article",
            icon: "el-icon-document",
            alias: "文章管理"
          },
          childs: [
            {
              entity: {
                id: 10,
                name: "articleList",
                icon: "el-icon-edit",
                alias: "文章管理",
              }
            },
            {
              entity: {
                id:11,
                name: "writeArticle",
                icon: "el-icon-mobile-phone",
                alias: "写文章",
              }
            }
          ]
        },
        //类别管理
        {
          entity: {
            id:2,
            name: "category",
            icon: "el-icon-tickets",
            alias: "文章类别管理"
          },
          childs: [
            {
              entity: {
                id:21,
                name: "categoryList",
                icon: "el-icon-edit",
                alias: "文章类别管理",
              }
            }
          ]
        },
        //系统管理
        {
          entity: {
            id:5,
            name: "system",
            icon: "el-icon-news",
            alias: "系统管理"
          },
          childs: [
            {
              entity: {
                id:51,
                name: "modifyPerson",
                icon: "el-icon-phone-outline\r\n",
                alias: "帐号管理",
                value: "/system/menu"
              }
            },
            {
              entity: {
                id:52,
                name: "siteManage",
                icon: "el-icon-phone-outline\r\n",
                alias: "网站信息管理",
                value: "/system/menu"
              }
            }
          ]
        }
      ],
      
    };
  },
  methods: {
    addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
    },
     removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
    handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
  }
  
};
</script>

<style>
.header{
  text-align:right;
  font-size:12px;
  height:50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

</style>