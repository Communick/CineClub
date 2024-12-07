import { createRouter, createWebHistory } from 'vue-router';
import Home from './src/components/Home.vue';
import Login from './src/components/Login.vue';

const routes = [ // defining routes
  {
    path: '/', // base url
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
