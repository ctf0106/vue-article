<template>
    <el-container direction="horizontal" style="min-height:100vh">
        <el-aside width="200px" style="background-color:#545c64;" >
            <el-menu router background-color="#545c64" style="border-right:0px;" text-color="#fff" active-text-color="#ffd04b">
              <nav-menu :navMenus="menuData"></nav-menu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align:right;font-size:12px;height:50px;background:#E8E7E3;">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right:15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span style="line-height:50px;">曹先生</span>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
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
         //个人信息管理
         {
          entity: {
            id:3,
            name: "personManage",
            icon: "el-icon-tickets",
            alias: "个人信息管理"
          },
          childs: [
            {
              entity: {
                id:31,
                name: "modifyPerson",
                icon: "el-icon-edit",
                alias: "修改个人信息",
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
                name: "accountManage",
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
  }
  
};
</script>

<style>

</style>