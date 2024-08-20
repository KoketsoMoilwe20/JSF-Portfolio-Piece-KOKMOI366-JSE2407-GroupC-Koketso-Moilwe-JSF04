import ProductGrid from './components/ProductGrid.vue'
import ProductDetails from './components/ProductDetails.vue'
import Login from './components/Login.vue'
import Cart from './components/Cart.vue'
import ComparisonList from './components/ComparisonList.vue'
import Wishlist from './components/Wishlist.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: ProductGrid,
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
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: {requiresAuth: true} //protecting cart route
    },
    {
      path: '/comparison',
      name: 'ComparisonList',
      component: ComparisonList,
      meta: {requiresAuth: true} //protect comparison route
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

//registers a global guard that'll run before every route change
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); //checking authentication. Retrieves a token from localStorage (if token exists, isAuthenticated will be true, otherwise it will be false)
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'ProductGrid' });
    } else {
      next();
    }
  });

  //Condition 1 checks if the target route (to) requires authentication

  //Condition 2 checks if the user is trying to navigate to the Login page while already authenticated

  //Final condition allows navigation

export default router