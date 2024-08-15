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
                    <button @click="updateQuantity(item, item.quantity - 1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="updateQuantity(item, item.quantity + 1)">+</button>
                </div>

                <button @click="removeFromCart(item)">Remove</button>
            </div>
        </div>
            <div class="cart-summary">
                <h3>Total: ${{ totalCost }}</h3>
                <button @click="clearCart">Clear Cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import { jwtDecode } from 'jwt-decode';

    const cartItems = ref([]);
    const totalCost = ref(0);
    let userId = null;

    //Decoding the JWT to get the userId
    const decodeUserId = () => {
        const token = localStorage.getItem('token');

        if(token) {
            const decoded = jwtDecode(token);
            userId = decoded.userId; 
        }
    };
    
    const loadCart = () => {
        cartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
        updateTotalCost();
    };

    const updateQuantity = (item, newQuantity) =>  {
        if (newQuantity <= 0) {
            removeFromCart(item);

        } else {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const updatedCart = cart.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: newQuantity} : cartItem);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            loadCart();

            window.dispatchEvent(new CustomEvent('update-cart-count'));
        }
    };

    const removeFromCart = (item) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        loadCart();

        window.dispatchEvent(new CustomEvent('update-cart-count'));
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        loadCart();

        window.dispatchEvent(new CustomEvent('update-cart-count'));
    };

    const updateTotalCost = () => {
        totalCost.value = cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }

    onMounted(() => {
        decodeUserId();
        loadCart();
    })
</script>

<style scoped>
    .cart {
        padding: 1rem;
    }

    .cart-item {
        display: flex;
        margin-bottom: 1rem;
    }

    .cart-item-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    .cart-item-info {
        margin-left: 1rem;
        flex-grow: 1;
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

    .cart-summary {
        margin-top: 1rem;
    }

    .cart-summary button {
        background-color: #d9534f; 
        color: white;
        border: none;
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
</style>