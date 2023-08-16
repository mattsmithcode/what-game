import '@/assets/main.scss';
import 'primeflex/primeflex.css';

import App from '@/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faEllipsisVertical, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { createPinia } from 'pinia';
import PiniaPersistedState from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import { createApp } from 'vue';

library.add(
    faCheck,
    faEllipsisVertical,
    faPencil,
    faPlus,
    faTrash
);

const pinia = createPinia()
    .use(PiniaPersistedState);

createApp(App)
    .use(pinia)
    .use(PrimeVue)
    .use(ConfirmationService)
    .mount('#app');
