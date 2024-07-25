<template>
  <div>
    <h2>Product List</h2>
    <button @click="openAddProductModal">Add Product</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>type</th>
          <th>category ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.__typename }}</td>
          <td>{{ product.category_id }}</td>
          <td>
            <button class="edit" @click="openEditProductModal(product)">Edit</button>
            <button class="secondary" @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddProductModal v-if="showAddProductModal" @close="closeAddProductModal" />
    <EditProductModal v-if="showEditProductModal" :product="currentProduct" @close="closeEditProductModal" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/index';
import AddProductModal from './AddProductModal.vue';
import EditProductModal from './EditProductModal.vue';

export default {
  components: {
    AddProductModal,
    EditProductModal,
  },
  setup() {
    const store = useProductStore();
    const showAddProductModal = ref(false);
    const showEditProductModal = ref(false);
    const currentProduct = ref(null);

    const openAddProductModal = () => {
      showAddProductModal.value = true;
    };

    const closeAddProductModal = () => {
      showAddProductModal.value = false;
    };

    const openEditProductModal = (product) => {
      currentProduct.value = product;
      showEditProductModal.value = true;
    };

    const closeEditProductModal = () => {
      showEditProductModal.value = false;
      currentProduct.value = null;
    };

    const deleteProduct = async (productId) => {
      await store.deleteProduct(productId);
    };

    onMounted(async () => {
      await store.fetchProducts();
    });

    return {
      products: store.products,
      showAddProductModal,
      openAddProductModal,
      closeAddProductModal,
      showEditProductModal,
      openEditProductModal,
      closeEditProductModal,
      currentProduct,
      deleteProduct,
    };
  },
};
</script>
