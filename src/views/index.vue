<template>
  <div id="app">
    <Login></Login>
    <Btb></Btb>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Btb from '@/components/Bottom_bar.vue'
export default {
  name: 'loginview',
  components: {
    Login,
    Btb
  }
}
</script>

<style>
</style>
