<template>
  <div class="modal">
    <div class="overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Product</h2>
        <form @submit.prevent="submitEditProduct">
          <div>
            <label for="id">ID:</label>
            <input type="text" v-model="editedProduct.id" required />
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="editedProduct.name" required />
          </div>
          <div>
            <label for="price">Price:</label>
            <input type="number" v-model="editedProduct.price" required />
          </div>
          <div>
            <label for="category_id">Category ID:</label>
            <input type="number" v-model="editedProduct.category_id" required />
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
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useProductStore();
    const editedProduct = ref({ ...props.product });

    const submitEditProduct = async () => {
      await store.editProduct({ ...editedProduct.value, id: props.product.id });
      emit('close');
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      editedProduct,
      submitEditProduct,
      closeModal,
    };
  },
};
</script>

