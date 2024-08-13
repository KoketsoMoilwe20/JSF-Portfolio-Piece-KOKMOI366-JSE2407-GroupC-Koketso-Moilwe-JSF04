import ProductGrid from './components/ProductGrid.vue'
import ProductDetails from './components/ProductDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: ProductGrid
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router