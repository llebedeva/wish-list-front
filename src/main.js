import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import WishlistPage from "./components/WishlistPage";
import WishPage from "./components/WishPage";
import PageNotFound from "./components/404";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: WishlistPage },
    { path: '/wish/:id', component: WishPage, props: true },
    { path: '*', component: PageNotFound }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
