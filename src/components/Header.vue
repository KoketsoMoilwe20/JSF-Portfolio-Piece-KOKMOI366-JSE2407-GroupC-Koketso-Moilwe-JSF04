<template>

  <!-- Sticky header that stays at the top of the viewport -->
    <header class="sticky-header">

       <!-- Navigation container -->
        <nav class="nav-container">
            <div class="nav-content">

               <!-- Logo link with image and text -->
                <a href="/" class="logo-link">
                    <img src="/online-shop.png" class="logo-image" alt="SwiftCart Logo" />
                    <span class="logo-text">ZenCart</span>
                </a>
                
                <!-- Button to toggle the mobile menu -->
                <button @click="toggleNavbar" class="mobile-menu-button" aria-controls="navbar-dropdown" :aria-expanded="isNavbarOpen">
                    <span class="sr-only">Toggle navigation</span>
                    <svg class="menu-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <!-- Navigation menu, visibility controlled by isNavbarOpen -->
                <div :class="['navbar-menu', { 'navbar-menu-hidden': !isNavbarOpen }]" id="navbar-dropdown">
                    <ul class="nav-list">
                        <li class="nav-item wishlist-item">
                            <a href="/wishlist" class="wishlist-link">
                <div v-if="wishlistCount" class="wishlist-badge">{{ wishlistCount }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="wishlist-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 18.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </a>
                        </li>
                        <li class="nav-item cart-item">
                            <a href="/cart" class="cart-link">
                                <div v-if="cartCount" class="cart-badge">{{ cartCount }}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart-icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </a>
                        </li>

                        <!-- Comparison -->
                         <li class="nav-item comparison-item">
                            <a href="/comparison" class="comparison-link">
                                <div v-if="comparisonCount" class="comparison-badge">{{ comparisonCount }}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="comparison-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5.25V18.75M7.5 8.25h9M7.5 12h9m-9 3.75h9M7.5 5.25A2.25 2.25 0 019.75 3h4.5A2.25 2.25 0 0116.5 5.25v13.5A2.25 2.25 0 0114.25 21h-4.5A2.25 2.25 0 017.5 18.75V5.25z" />
                                </svg>
                            </a>
                         </li>

                        <li class="nav-item">
                            <a v-if="!isLoggedIn" href="/login" class="nav-link">Login</a>
                            <a v-else href="#" @click.prevent="logout" class="nav-link">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import {ref, onMounted, onUnmounted} from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const isNavbarOpen = ref(false);
    const isLoggedIn = ref(false);
    const cartCount = ref(0);
    const wishlistCount = ref(0);
    const comparisonCount = ref(0);

    const toggleNavbar = () => {
        isNavbarOpen.value = !isNavbarOpen.value;
    };

    const checkLoginStatus = () => {
        isLoggedIn.value = !!localStorage.getItem('token');
    };

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.value = cart.reduce((total, item) => total + item.quantity, 0);
    };

    const updateWishlistCount = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistCount.value = wishlist.length;
};

    const updateComparisonCount = () => {
        const comparison = JSON.parse(localStorage.getItem('comparison')) || [];
        comparisonCount.value = comparison.length;
    }

    const logout = () => {
        //clearing the JWT from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('cart'); //clear the cart data from local storage
        localStorage.removeItem('wishlist');

        //Reset
        isLoggedIn.value = false;
        // userId.value = null; //Reset the userId

        //Redirect to the login page
        router.push('/login');
    };

    onMounted(() => {
        checkLoginStatus();
        updateCartCount();
        updateWishlistCount();
        updateComparisonCount();

        //Listen for custom event to update the cart count
        window.addEventListener('update-cart-count', updateCartCount);
        window.addEventListener('update-wishlist-count', updateWishlistCount);
        window.addEventListener('update-comparison-count', updateComparisonCount);
    });

    onUnmounted(() => {
    // Clean up event listeners
    window.removeEventListener('update-cart-count', updateCartCount);
    window.removeEventListener('update-wishlist-count', updateWishlistCount);
    window.removeEventListener('update-comparison-count', updateComparisonCount);
});
</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 50;
}

.nav-container {
    background-color: #6D6875;
}

.nav-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo-image {
  width: 75px;
    height: auto;
    margin-right: 0;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #F3DBCE;
}

.mobile-menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.menu-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #F3DBCE;
}

.navbar-menu {
    width: 100%;
}

.navbar-menu-hidden {
    display: none;
}

.nav-list {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    list-style-type: none;
   
}


.nav-link {
  display: block;
  padding: 0.5rem 0;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.cart-item,
.wishlist-item,
.comparison-item {
    display: block;
    position: relative;
    margin-right: 1rem;
}

.cart-badge,
.wishlist-badge,
.comparison-badge {
    position: absolute;
    top: -0.5rem;
    left: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #EF4444;
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
}

.cart-icon, .wishlist-icon, .comparison-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
}

@media (min-width: 768px) {
    .mobile-menu-button {
        display: none;
    }

    .navbar-menu {
        display: block !important;
        width: auto;
    }

    .nav-list {
        flex-direction: row;
        padding: 0;
    }

    .nav-link {
        padding: 0.5rem 1rem;
        margin-bottom: 0;
    }

    .cart-item {
        display: block;
        position: relative;
    }

    .mobile-cart-item {
        display: none;
    }
}
</style>
