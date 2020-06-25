<template>
  <div>
    <h2>I wish...</h2>
    <p v-if="!wishlist.length">You don't have any wishes yet. Please, create your first wish.</p>
    <button @click="showModal()">New wish</button>
    <div id="list" class="list-group col">
      <wish-item v-for="item in wishlist" :key="item.id" :item="item" :name="item.name"
                 :show="showModal"
                 @delete-item="removeWishItem"
      ></wish-item>
    </div>
    <modal v-show="isModalVisible" @hide="hideModal">
      <form @submit.prevent="formSubmit">
        <label for="wish">Wish:</label>
        <br>
        <input id="wish" v-model.trim="name" type="text">
        <br>
        <label for="link">Reference:</label>
        <br>
        <input id="link" v-model.trim="link" type="text">
        <br>
        <label for="description">Additional information:</label>
        <br>
        <textarea id="description" v-model.trim="description" rows="3" cols="40"></textarea>
        <br>
        <button type="submit" v-bind:disabled="!formIsValid">Save</button>
      </form>
    </modal>
  </div>
</template>

<script>
  import Sortable from 'sortablejs';

  import {
      getWishlist,
      createWishAction,
      updateWishAction,
      changeOrderWishesAction
    } from '../js/wishActions.js';
  import Modal from './Modal.vue'
  import WishItem from './WishItem.vue'

  export default {
    name: 'WishlistPage',
    components: {
      Modal,
      WishItem
    },
    data() {
      return {
        wishlist: [],
        isModalVisible: false,
        id: null,
        name: '',
        link: '',
        description: ''
      }
    },
    computed: {
      formIsValid() {
        return this.name;
      }
    },
    created : async function() {
      const wishlist = await getWishlist();
      wishlist.forEach(wish => {
        this.wishlist.push({
          id: wish['id'],
          name: wish['wish'],
          link: wish['link'],
          description: wish['description'],
          priority: wish['priority']
        });
      });

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
    },
    methods: {
      showModal(item = null) {
        if (item) {
          this.id = item['id'];
          this.name = item['name'];
          this.link = item['link'];
          this.description = item['description'];
        } else {
          this.id = null;
          this.name = '';
          this.link = '';
          this.description = '';
        }
        this.isModalVisible = true;
      },
      hideModal() {
        this.isModalVisible = false;
      },
      addWishItem(id, name, link, description) {
        this.wishlist.push({
          id: id,
          name: name,
          link: link,
          description: description
        });
      },
      updateWishItem(id, name, link, description) {
        let index = 0;
        for (let item of this.wishlist) {
          if (item.id === id) {
            this.wishlist[index]['name'] = name;
            this.wishlist[index]['link'] = link;
            this.wishlist[index]['description'] = description;
            break;
          }
          index++;
        }
      },
      removeWishItem(id) {
        let index = 0;
        for (let item of this.wishlist) {
          if (item.id === id) {
            this.wishlist.splice(index, 1);
            break;
          }
          index++;
        }
      },
      async formSubmit() {
        if (this.id) {
          if (await updateWishAction(this.id, this.name, this.link, this.description)) {
            this.updateWishItem(this.id, this.name, this.link, this.description);
            this.hideModal();
          }
        } else {
          this.id = await createWishAction(this.name, this.link, this.description);
          if (this.id) {
            this.addWishItem(this.id, this.name, this.link, this.description);
            this.hideModal();
          }
        }
      }
    }
  }
</script>

<style scoped>
  .list-group {
    padding-left: 0;
    margin-bottom: 20px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 70%;
  }
</style>
