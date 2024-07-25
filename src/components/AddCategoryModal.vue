<template>
  <div class="modal">
    <div class="overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add Category</h2>
        <form @submit.prevent="submitAddCategory">
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="name" required />
          </div>
          <div>
            <label for="price">Price:</label>
            <input type="number" v-model="price" required />
          </div>
          <div>
            <label for="categoryId">Category ID:</label>
            <input type="number" v-model="categoryId" required />
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
    const name = ref('');
    const price = ref(0);
    const categoryId = ref(null);

    const submitAddCategory = async () => {
      await store.addProduct({
        name: name.value,
        price: parseFloat(price.value),
        categoryId: parseInt(categoryId.value),
      });
      name.value = '';
      price.value = 0;
      categoryId.value = null;
      emit('close');
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      name,
      price,
      categoryId,
      submitAddCategory,
      closeModal,
    };
  },
};
</script>
