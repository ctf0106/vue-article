import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: { name: 'index' }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>import('./views/login/login.vue'),
    },
    {
        path: '/',
        name: 'index',
        component: () =>import('./views/index.vue'),
        children:[{
            path: '/articleList',
            name: 'articleList',
            component: () =>import('./views/article/articleList.vue'),
        },
        {
            path: '/writeArticle',
            name: 'writeArticle',
            component: () =>
                import('./views/article/writeArticle.vue')
        },
        {
            path: '/categoryList',
            name: 'categoryList',
            component: () =>import('./views/category/categoryList.vue'),
            children:[{
                path: '/editCategory',
                name: 'editCategory',
                component: () =>import('./views/category/editCategory.vue')
            }]
        },
        {
            path:'/modifyPerson',
            name:'modifyPerson',
            component:()=>
            import('./views/person/modifyPerson')
        },
        {
            path:'/siteManage',
            name:'siteManage',
            component:()=>
            import('./views/website/siteManage')
        }
    ]
    }],
})
