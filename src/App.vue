<template>
  <div id="app">
    <header>
      <h1>Product Management</h1>
    </header>
    <div class="container">
      <ProductList />
      <CategoryList />
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import CategoryList from './components/CategoryList.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    CategoryList
  }
}
</script>

<style>
@import './assets/main.css';
</style>
