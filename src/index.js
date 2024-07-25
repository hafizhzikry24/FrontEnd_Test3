import { defineStore } from 'pinia';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

  const FETCH_PRODUCTS = gql`
  query FetchProducts {
    products {
      id
      name
      price
      category_id
      __typename
    }
  }
`;

const FETCH_CATEGORIES = gql`
  query FetchCategories {
    categories {
      id
      name
      parent_id
      __typename
    }
  }
`;

 const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Float!, $categoryId: Int!) {
    insert_products(objects: { name: $name, price: $price, category_id: $categoryId }) {
      returning {
        id
        name
        price
        category_id
      }
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation EditProduct($id: Int!, $name: String!, $price: Float!, $categoryId: Int!) {
    update_products_by_pk(pk_columns: { id: $id }, _set: { name: $name, price: $price, category_id: $categoryId }) {
      id
      name
      price
      category_id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;

  const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!, $parentId: Int) {
    insert_categories(objects: { name: $name, parent_id: $parentId }) {
      returning {
        id
        name
        parent_id
      }
    }
  }
`;

const EDIT_CATEGORY = gql`
  mutation EditCategory($id: Int!, $name: String!) {
    update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    delete_categories_by_pk(id: $id) {
      id
    }
  }
`;

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
  }),
  actions: {
    async fetchProducts() {
      const { onResult } = useQuery(FETCH_PRODUCTS);
      onResult(({ data }) => {
        this.products = data?.products || [];
      });
    },
    async fetchCategories() {
      const { onResult } = useQuery(FETCH_CATEGORIES);
      onResult(({ data }) => {
        this.categories = data?.categories || [];
      });
    },
    async addProduct(product) {
      const { mutate } = useMutation(ADD_PRODUCT);
      await mutate({ variables: product });
      this.fetchProducts();
    },
    async editProduct(product) {
      const { mutate } = useMutation(EDIT_PRODUCT);
      await mutate({ variables: product });
      this.fetchProducts();
    },
    async deleteProduct(productId) {
      const { mutate } = useMutation(DELETE_PRODUCT);
      await mutate({ variables: { id: productId } });
      this.fetchProducts();
    },
    async addCategory(category) {
      const { mutate } = useMutation(ADD_CATEGORY);
      await mutate({ variables: category });
      this.fetchCategories();
    },
    async editCategory(category) {
      const { mutate } = useMutation(EDIT_CATEGORY);
      await mutate({ variables: category });
      this.fetchCategories();
    },
    async deleteCategory(categoryId) {
      const { mutate } = useMutation(DELETE_CATEGORY);
      await mutate({ variables: { id: categoryId } });
      this.fetchCategories();
    },
  },
});
