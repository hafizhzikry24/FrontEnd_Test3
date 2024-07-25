<template>
  <div class="modal">
    <div class="overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Category</h2>
        <form @submit.prevent="submitEditCategory">
          <div>
            <label for="id">ID:</label>
            <input type="text" v-model="editedCategory.id" required />
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="editedCategory.name" required />
          </div>
          <div>
            <label for="parent_id">Parent ID:</label>
            <input type="number" v-model="editedCategory.parent_id" required />
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
    category: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useProductStore();
    const editedCategory = ref({ ...props.category });

    const submitEditCategory = async () => {
      await store.editCategory({ id: editedCategory.value.id, name: editedCategory.value.name });
      emit('close');
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      editedCategory,
      submitEditCategory,
      closeModal,
    };
  },
};
</script>
