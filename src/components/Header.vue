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
                        <li class="nav-item">
                            <a href="/wishlist" class="nav-link">Wishlist</a>
                        </li>
                        <li class="nav-item cart-item">
                            <a href="/cart" class="cart-link">
                                <div class="cart-badge">2</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart-icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/login" class="nav-link">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isNavbarOpen: false //State to control visibility of the mobile menu
        }
    },
    methods: {
       /**
         * Toggles the visibility of the mobile navigation menu.
         */
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen
        }
    }
}
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

.cart-item {
    display: block;
    position: relative;
}

.cart-badge {
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

.cart-icon {
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
