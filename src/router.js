import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: { name: 'index' }

    },
    {
        path: '/',
        name: 'index',
        component: () =>import('./views/index.vue'),
        children:[{
            path: '/articleList',
            name: 'articleList',
            component: () =>import('./views/articleList.vue'),
        },
        {
            path: '/writeArticle',
            name: 'writeArticle',
            component: () =>
                import('./views/writeArticle.vue')
        },
        {
            path: '/categoryList',
            name: 'categoryList',
            component: () =>
                import('./views/categoryList.vue')
        },{
            path:'/modifyPerson',
            name:'modifyPerson',
            component:()=>
            import('./views/modifyPerson')
        }
        ,{
            path:'/commentAuit',
            name:'commentAuit',
            component:()=>
            import('./views/commentAuit')
        },{
            path:'/commentManage',
            name:'commentManage',
            component:()=>
            import('./views/commentManage')
        },{
            path:'/accountManage',
            name:'accountManage',
            component:()=>
            import('./views/accountManage')
        },{
            path:'/websiteManage',
            name:'websiteManage',
            component:()=>
            import('./views/websiteManage')
        }
    ]
    }],
})
