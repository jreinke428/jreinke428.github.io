import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import VueParticles from '@tsparticles/vue3';
import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.
import AnimateOnScroll from 'primevue/animateonscroll';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';

import './styles.css';

const app = createApp(App);
const pinia = createPinia();

import {} from '@fortawesome/free-regular-svg-icons';
library.add();

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.directive('animateonscroll', AnimateOnScroll);
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(VueParticles, {
  init: async (engine) => {
    await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
  }
});
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
