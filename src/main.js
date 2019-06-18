import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
      sessionStorage.removeItem('token');
    }
    let token = sessionStorage.getItem('token');
    if (!token && to.path != '/login') {
      next({ path: '/login' })
    } else if(token && to.path != '/login' && to.path != '/404' && to.path != '/'){
        console.log(to.path);  
        next()
    } else {
      next()
    }
  })
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')