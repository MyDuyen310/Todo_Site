import {
    createApp
} from 'vue'
import router from './router.js'
import store from './store/index.js'
import BaseModal from './components/ui/BaseModal.vue';
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.use(store);
app.component('base-modal', BaseModal);
app.mount('#app');