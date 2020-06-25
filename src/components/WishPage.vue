<template>
    <div>
        <h2>{{ name }}</h2>
        <p><a :href="link">{{ link }}</a></p>
        <p>{{ description }}</p>
        <button>Edit</button>
        <button @click="deleteItem">Delete</button>
        <router-link class="link" to="/">Back to wishlist</router-link>
    </div>
</template>

<script>
    import {getWish, deleteWishAction} from '../js/wishActions.js';

    export default {
        name: "WishPage",
        props: ['id'],
        data() {
           return {
               name: '',
               link: '',
               description: '',
           }
        },
        created : async function() {
            let wish = await getWish(this.id);
            wish = wish[0];
            this.name = wish['wish'];
            this.link = wish['link'];
            this.description = wish['description'];
        },
        methods: {
            async deleteItem() {
                await deleteWishAction(this.id);
                await this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    .link {
        display: block;
    }
</style>
