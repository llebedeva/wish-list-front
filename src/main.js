import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Wishlist from "./components/Wishlist";
import WishPage from "./components/WishPage";
import PageNotFound from "./components/404";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Wishlist},
    { path: '/wish/:id', component: WishPage},
    { path: '*', component: PageNotFound}
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
