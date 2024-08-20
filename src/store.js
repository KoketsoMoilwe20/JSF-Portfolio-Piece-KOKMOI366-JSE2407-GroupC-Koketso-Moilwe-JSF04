import { reactive } from "vue";
import { jwtDecode } from "jwt-decode";

const state = reactive({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    totalCost: 0,
    userId: null,
    comparisonList: JSON.parse(localStorage.getItem('comparison')) || []
});

const decodeUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        state.userId = decoded.userId;
    }
};

const loadCart = () => {
    state.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    updateTotalCost();
};

const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(item);
    } else {
        const updatedCart = state.cartItems.map(cartItem => 
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        state.cartItems = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateTotalCost();
        window.dispatchEvent(new CustomEvent('update-cart-count'));
    }
};

const removeFromCart = (item) => {
    const updatedCart = state.cartItems.filter(cartItem => cartItem.id !== item.id);
    state.cartItems = updatedCart;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalCost();
    window.dispatchEvent(new CustomEvent('update-cart-count'));
};

const clearCart = () => {
    state.cartItems = [];
    localStorage.removeItem('cart');
    updateTotalCost();
    window.dispatchEvent(new CustomEvent('update-cart-count'));
};

const updateTotalCost = () => {
    state.totalCost = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
};

// Load comparison list from localStorage
const loadComparisonList = () => {
    state.comparisonList = JSON.parse(localStorage.getItem('comparison')) || [];
};

// Add an item to the comparison list
const addToComparisonList = (product) => {
    const exists = state.comparisonList.some(comparedProduct => comparedProduct.id === product.id);
    if (!exists) {
        state.comparisonList.push(product);
        localStorage.setItem('comparison', JSON.stringify(state.comparisonList));
    }
};

// Remove an item from the comparison list
const removeFromComparison = (productId) => {
    state.comparisonList = state.comparisonList.filter(product => product.id !== productId);
    localStorage.setItem('comparison', JSON.stringify(state.comparisonList));
    window.dispatchEvent(new CustomEvent('update-comparison-count')); // Trigger the custom event
};

// Helpers to update counts in Header.vue
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    return cartCount;
};

const updateComparisonCount = () => {
    const comparison = JSON.parse(localStorage.getItem('comparison')) || [];
    const comparisonCount = comparison.length;
    return comparisonCount;
};

// Clear the entire comparison list
const clearComparisonList = () => {
    state.comparisonList = [];
    localStorage.removeItem('comparison');
    window.dispatchEvent(new CustomEvent('update-comparison-count')); // Trigger the custom event
};

const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    window.dispatchEvent(new CustomEvent('update-wishlist-count'));
};

const removeFromWishlist = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('update-wishlist-count'));
};



// Initial setup
decodeUserId();
loadCart();

export default {
    state,
    decodeUserId,
    loadCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateTotalCost,
    loadComparisonList,
    addToComparisonList,
    removeFromComparison,
    clearComparisonList,
    updateCartCount,
    updateComparisonCount
};