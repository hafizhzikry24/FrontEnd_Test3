// src/main.js
import { createApp, h, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createPinia } from 'pinia';
import apolloClient from './apollo';
import App from './App.vue';
import './assets/main.css';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

const pinia = createPinia();

app.use(pinia);
app.mount('#app');


