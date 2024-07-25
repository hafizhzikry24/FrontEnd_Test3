<template>
  <div>
    <h2>Category List</h2>
    <button @click="openAddCategoryModal">Add Category</button>

    <table class="category-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Parent ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.__typename }}</td>
          <td>{{ category.parent_id }}</td>
          
          <td>
            <button class="edit" @click="openEditCategoryModal(category)">Edit</button>
            <button class="secondary" @click="deleteCategory(category.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddCategoryModal v-if="showAddCategoryModal" @close="closeAddCategoryModal" />
    <EditCategoryModal
      v-if="showEditCategoryModal"
      :category="selectedCategory"
      @close="closeEditCategoryModal"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/index';
import AddCategoryModal from './AddCategoryModal.vue';
import EditCategoryModal from './EditCategoryModal.vue';

export default {
  components: {
    AddCategoryModal,
    EditCategoryModal,
  },
  setup() {
    const store = useProductStore();
    const showAddCategoryModal = ref(false);
    const showEditCategoryModal = ref(false);
    const selectedCategory = ref(null);

    const openAddCategoryModal = () => {
      showAddCategoryModal.value = true;
    };

    const closeAddCategoryModal = () => {
      showAddCategoryModal.value = false;
    };

    const openEditCategoryModal = (category) => {
      selectedCategory.value = category;
      showEditCategoryModal.value = true;
    };

    const closeEditCategoryModal = () => {
      showEditCategoryModal.value = false;
    };

    const deleteCategory = async (categoryId) => {
      await store.deleteCategory(categoryId);
      
    };

    onMounted(async () => {
      await store.fetchCategories();
    });

    return {
      categories: store.categories,
      showAddCategoryModal,
      showEditCategoryModal,
      selectedCategory,
      openAddCategoryModal,
      closeAddCategoryModal,
      openEditCategoryModal,
      closeEditCategoryModal,
      deleteCategory,
    };
  },
};
</script>


