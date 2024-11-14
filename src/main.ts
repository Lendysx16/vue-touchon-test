import { createApp } from 'vue';

import App from './App.vue';
import { piniaPlugin } from './plugins/pinia';
import { router } from './plugins/vue-router';

const app = createApp(App);

app.use(piniaPlugin).use(router);

app.mount('#app');
