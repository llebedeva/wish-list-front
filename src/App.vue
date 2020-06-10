<template>
  <div id="app">
    <Wishlist/>
  </div>
</template>

<script>
import Wishlist from './components/Wishlist.vue'

export default {
  name: 'App',
  components: {
    Wishlist
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
</style>
