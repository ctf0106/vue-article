import { fetch } from "../service/services.js";

//查询文章列表
export const getArticleList = data =>fetch("post", "", "/admin/article/getArticleList", data);

export const getCategoryList = data =>fetch("post", "", "/admin/category/getCategoryList", data);
