<template>
    <div>
        <h2>Your Shopping Cart</h2>
        <div>
            Your cart is empty...
        </div>
        <div>
            <img :src="product.image" alt="Product Image">
            <div>
                <h3>{{ product.title }}</h3>
                <p>${{ product.price }}</p>
                <button>Remove</button>
            </div>
        </div>
        <div>
            <p>Total Items: </p>
            <p>Total Cost: </p>
        </div>
        <button>Clear Cart</button>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';

    const cartItems = ref([]);
    const totalCost = ref(0);
    
</script>