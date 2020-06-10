<template>
    <div class="list-group-item">
        <a :href="url">{{ this.name }}</a>
        <button @click="show(item)">Edit</button>
        <button @click="deleteItem">Delete</button>
    </div>
</template>

<script>
    import {deleteWishAction} from "../js/wishActions.js";

    export default {
        name: "WishItem",
        props: {
            item: Object,
            name: String,
            show: Function
        },
        computed: {
            url: function() {
                return "/wish/" + this.id;
            },
        },
        created: function() {
            this.id = this.item['id'];
        },
        methods: {
            async deleteItem() {
                if (await deleteWishAction(this.id)) {
                    this.$emit('delete-item', this.id);
                }
            }
        }
    }
</script>

<style scoped>
    .list-group-item {
        border: 1px solid #6c757d;
        margin: 5px 0;
        padding: 3px;
        border-radius: 3px;
    }
</style>
