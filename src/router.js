import ProductGrid from './components/ProductGrid.vue'
import ProductDetails from './components/ProductDetails.vue'
import Login from './components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: ProductGrid,
        meta: {requiresAuth: true}
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails
    },
    {
        path: '/login', 
        name: 'Login', 
        component: Login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'ProductGrid' });
    } else {
      next();
    }
  });

export default router