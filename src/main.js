import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import { createPinia } from 'pinia';
import '@/utils/css/normalize.css';

import VueAwesomePaginate from "vue-awesome-paginate";

// Importa el archivo CSS necesario
import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueAwesomePaginate)
    .mount('#app');
