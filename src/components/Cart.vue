<template>
    <div class="cart">
        <button @click="goBack" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 19l-7-7 7-7"/>
            </svg>
            Back
        </button>
        <h2>Your Shopping Cart</h2>
        <div v-if="state.cartItems.length === 0">
            Your cart is empty...
        </div>

    <div v-else>
        <div class="cart-item" v-for="item in state.cartItems" :key="item.id">
            <img :src="item.image" alt="Product Image" class="cart-item-image">
            <div class="cart-item-info">
                <h3>{{ item.title }}</h3>
                <p>${{ item.price }}</p>

                <div class="quantity-control">
                    <button @click="updateQuantity(item, item.quantity - 1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="updateQuantity(item, item.quantity + 1)">+</button>
                </div>

                <button @click="removeFromCart(item)" class="remove-button">Remove</button>
            </div>
        </div>
            <div class="cart-summary">
                <h3>Total: ${{ state.totalCost }}</h3>
                <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted} from 'vue';
    import { useRouter } from 'vue-router';
    import store from '../store';

    const { state, updateQuantity, removeFromCart, clearCart} = store;
    const router = useRouter();

    onMounted(() => {
        store.decodeUserId();
        store.loadCart();
    });

    const goBack = () => {
        router.back();
    };
</script>

<style scoped>
    .cart {
        padding: 1rem;
        background-color: #F3DBCE;
    }

    .back-button {
    background: none;
    border: none;
    color: #6D6875;
    font-size: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
}

    h2 {
        font-size: 2rem;
    color: #6D6875;
    margin-bottom: 1rem;
    }

    .cart-item {
        display: flex;
    margin-bottom: 1rem;
    background-color: #F3F3F3;
    border: 1px solid #E0E0E0;
    border-radius: 1rem;
    padding: 0.5rem;
    align-items: center;
    width: 100%;
    max-width: 400px; /* Adjust the max-width to make cards smaller */
    box-sizing: border-box;
    }

    .cart-item-image {
        width: 80px;
    height: 80px;
    object-fit: contain;
    margin-right: 1rem;
    }

    .cart-item-info {
        flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    }

    .quantity-control {
        display: flex;
        align-items: center;
    }

    .quantity-control button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 0.375rem;
        padding: 0.5rem;
        margin: 0 0.5rem;
        cursor: pointer;
    }

    .remove-button {
        background-color: #FFB4A2; /* Slightly different shade to match the palette */
        color: white;
        border: none;
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .remove-button:hover {
        background-color: #E5989B; /* Hover state for remove button */
    }

    .cart-summary {
        margin-top: 1rem;
    }

    .clear-cart-button {
        background-color: #E5989B; /* Matches the wishlist clear button */
        color: white;
        border: none;
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .clear-cart-button:hover {
        background-color: #B5838D; /* Hover state similar to wishlist */
    }
</style>