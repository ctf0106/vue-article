import { fetch } from "../service/services.js";


//登陆接口
export const login = data =>fetch("post", "", "/admin/login", data);

//查询文章列表
export const getArticleList = data =>fetch("post", "", "/admin/article/getArticleList", data);
//查询类目列表
export const getCategoryList = data =>fetch("post", "", "/admin/category/getCategoryList", data);
//删除文章
export const deleteArticleById=data=>fetch("post","","/admin/article/deleteArticleById",data);

//查询文章详情
export const getArticleDetailById=data=>fetch("post","","/admin/article/getArticleDetailById",data);

//查询类目列表
export const getCategoryAllList = data =>fetch("post", "", "/admin/category/getCategoryAllList", data);

//保存或修改文章
export const saveOrUpdateArticle = data =>fetch("post", "", "/admin/article/saveOrUpdateArticle", data);

//超链接查询
export const getLinksListPageInfo = data =>fetch("post", "", "/admin/links/getLinksListPageInfo", data);

//删除超链接
export const deleteLinksById = data =>fetch("post", "", "/admin/links/deleteLinksById", data);

