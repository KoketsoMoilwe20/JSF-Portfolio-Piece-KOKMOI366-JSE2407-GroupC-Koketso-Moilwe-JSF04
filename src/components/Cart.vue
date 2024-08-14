<template>
    <div class="cart">
        <h2>Your Shopping Cart</h2>
        <div v-if="cartItems.length === 0">
            Your cart is empty...
        </div>

    <div v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <img :src="item.image" alt="Product Image" class="cart-item-image">
            <div class="cart-item-info">
                <h3>{{ item.title }}</h3>
                <p>${{ item.price }}</p>

                <div class="quantity-control">
                    <button>-</button>
                    <span>{{ item.quantity }}</span>
                    <button>+</button>
                </div>

                <button>Remove</button>
            </div>
        </div>
            <div class="cart-summary">
                <h3>Total: ${{ totalCost }}</h3>
                <button>Clear Cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';

    const cartItems = ref([]);
    const totalCost = ref(0);
    
    const loadCart = () => {
        cartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
        updateTotalCost();
    };


</script>