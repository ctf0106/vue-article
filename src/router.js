import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/article',

    }, {
        path: '/articleList',
        name: 'articleList',
        component: () =>
            import('./views/articleList.vue')
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
    }
    ],
})
