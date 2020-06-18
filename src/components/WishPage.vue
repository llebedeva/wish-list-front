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
        data() {
           return {
               id: '',
               name: '',
               link: '',
               description: '',
           }
        },
        created : async function() {
            this.id = this.$route.params.id;
            let wish = await getWish(this.id);
            wish = wish[0];
            this.name = wish['wish'];
            this.link = wish['link'];
            this.description = wish['description'];
        },
        methods: {
            async deleteItem() {
                await deleteWishAction(this.id);
                document.getElementById('back').click();
            }
        }
    }
</script>

<style scoped>
    .link {
        display: block;
    }
</style>
