<template>
  <div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      router
      style="min-height:100vh;width:230px;float:left"
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <router-view style="margin-left:250px"></router-view>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
export default {
  components: {
    NavMenu: NavMenu
  },
  data() {
    return {
      activeIndex: 'article',
      isCollapse: true,
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
        //评论管理
         {
          entity: {
            id:4,
            name: "comment",
            icon: "el-icon-tickets",
            alias: "评论管理"
          },
          childs: [
            {
              entity: {
                id: 41,
                name: "commentAuit",
                icon: "el-icon-edit",
                alias: "评论审核"
              }
            },
            {
              entity: {
                id:42,
                name: "commentManage",
                icon: "el-icon-edit",
                alias: "评论维护",
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
                name: "websiteManage",
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
  mounted(){
    let start = window.location.href.lastIndexOf('/');
    let path = window.location.href.slice(start+1);
    this.activeIndex = path;
  }
  
};
</script>
<style>
body{
  margin: 0;
}
</style>
