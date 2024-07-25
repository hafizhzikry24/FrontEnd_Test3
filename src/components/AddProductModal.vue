<template>
  <div class="modal">
    <div class="overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add Product</h2>
        <form @submit.prevent="submitAddProduct">
          <div>
            <label for="id">ID:</label>
            <input type="text" v-model="product.id" required />
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="product.name" required />
          </div>
          <div>
            <label for="price">Price:</label>
            <input type="number" v-model="product.price" required />
          </div>
          <div>
            <label for="category_id">Category ID:</label>
            <input type="number" v-model="product.category_id" required />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useProductStore } from '@/index';

export default {
  setup(_, { emit }) {
    const store = useProductStore();
    const product = ref({
      name: '',
      price: null,
      category_id: null,
    });

    const submitAddProduct = async () => {
      await store.addProduct({ ...product.value });
      emit('close');
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      product,
      submitAddProduct,
      closeModal,
    };
  },
};
</script>
