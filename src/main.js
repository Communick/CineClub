import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router.js'; // Import du routeur

const app = createApp(App); // create app
app.use(router); // Utilisation de Vue Router
app.mount('#app'); // mount app
