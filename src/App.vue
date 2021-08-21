<template>
  <div>
    <h1 class="header">Wiley</h1>
    <BestSeller msg="Paperback Nonfiction Bestsellers"/>
  </div>
</template>

<script>
import BestSeller from './components/BestSeller.vue'

export default {
  name: 'App',
  components: {
    BestSeller
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
    border-bottom: 2px solid #000;
    text-align: left;
    padding-left: 50px;
}
</style>
