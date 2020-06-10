import Vue from 'vue'
import App from './App.vue'
import Sortable from 'sortablejs';

import {changeOrderWishesAction} from "./js/wishActions.js";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

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
