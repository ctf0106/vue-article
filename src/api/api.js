import { fetch } from "../service/services.js";


//登陆接口
export const login = data =>fetch("post", "", "/admin/login/on", data);

//查询文章列表
export const getArticleList = data =>fetch("post", "", "/admin/article/getArticleList", data);
//查询类目列表
export const getCategoryList = data =>fetch("post", "", "/admin/category/getCategoryList", data);

//查询类目树
export const getCategoryTree = data =>fetch("post", "", "/admin/category/getCategoryTree", data);

//删除文章
export const deleteArticleById=data=>fetch("post","","/admin/article/deleteArticleById",data);

//查询文章详情
export const getArticleDetailById=data=>fetch("post","","/admin/article/getArticleDetailById",data);

//查询类目列表
export const getCategoryAllList = data =>fetch("post", "", "/admin/category/getCategoryAllList", data);

//保存或修改文章
export const saveOrUpdateArticle = data =>fetch("post", "", "/admin/article/saveOrUpdateArticle", data);

//个人信息
export const getOneUser = data =>fetch("get", "", "/admin/user/getOneUser", data);
//保存或更新个人信息
export const saveOrUpdateUser = data =>fetch("post", "", "/admin/user/saveOrUpdateUser", data);

//网站信息
export const getOneSite = data =>fetch("get", "", "/admin/site/getOneSite", data);

//保存或更新网站信息
export const saveOrUpdateSite = data =>fetch("post", "", "/admin/site/saveOrUpdateSite", data);

