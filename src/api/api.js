import { fetch } from "../service/services.js";

//查询文章列表
export const getArticleList = data =>fetch("post", "", "/article/admin/getArticleList", data);