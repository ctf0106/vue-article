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
            component: () =>
                import('./views/category/categoryList.vue')
        },{
            path:'/modifyPerson',
            name:'modifyPerson',
            component:()=>
            import('./views/person/modifyPerson')
        }
        ,{
            path:'/commentAuit',
            name:'commentAuit',
            component:()=>
            import('./views/comment/commentAuit')
        },{
            path:'/commentManage',
            name:'commentManage',
            component:()=>
            import('./views/comment/commentManage')
        },{
            path:'/accountManage',
            name:'accountManage',
            component:()=>
            import('./views/website/accountManage')
        },{
            path:'/siteManage',
            name:'siteManage',
            component:()=>
            import('./views/website/siteManage')
        }
    ]
    }],
})
