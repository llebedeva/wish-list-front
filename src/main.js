import Sortable from 'sortablejs';
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import {changeOrderWishesAction} from "./js/wishActions.js";
import Wishlist from "./components/Wishlist";
import WishPage from "./components/WishPage";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Wishlist},
    { path: '/wish/:id', component: WishPage}
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

const wishList = document.getElementById('list');
const wishItem = document.querySelectorAll('#list .list-group-item');

if (wishItem !== null) {
  Sortable.create(wishList, {
    multiDrag: true,
    fallbackTolerance: 3,
    animation: 150,

    onEnd: async function (/**Event*/evt) {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (oldIndex !== newIndex) {
        await changeOrderWishesAction(oldIndex, newIndex);
      }
    }
  });
}
