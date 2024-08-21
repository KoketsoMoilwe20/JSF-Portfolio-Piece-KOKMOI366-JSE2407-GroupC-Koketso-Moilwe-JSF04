<template>
   <div class="wishlist-page">
    <button @click="goBack" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-back" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg> Back
        </button>
        <h2 class="cool-text">My Wishlist</h2>
        <Filter @filter-sort-change="handleFilterSortChange" :appliedFilters="appliedFilters" />
        <button @click="clearWishlist" class="clear-all-button">Clear All</button>
        <div v-if="filteredWishlist.length === 0">
            <p>Your wishlist is empty.</p>
        </div>
        <div v-else class="wishlist-grid">
            <div v-for="product in filteredWishlist" :key="product.id" class="wishlist-item">
                <img :src="product.image" class="wishlist-image">
                <h3>{{ product.title }}</h3>
                <p>${{ product.price }}</p>
                <button @click="removeFromWishlist(product.id)" class="icon-button remove-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-remove" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <button @click="addToCart(product)" class="icon-button add-to-cart-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-cart" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.6 3M7 13h10l1.6-8H5.2M16 16a2 2 0 11-4 0M7 16a2 2 0 11-4 0"/></svg>
                </button>
                <button @click="viewProductDetails(product.id)" class="view-details-button">View Details</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import Filter from './Filter.vue';
    import { syncWishlist, fetchWishlist, fetchProducts } from '../api';

    const router = useRouter();
    const wishlist = ref(JSON.parse(localStorage.getItem('wishlist')) || [])
    const wishlistCount = ref(wishlist.value.length);
    const appliedFilters = ref({});
    const userId = ref('user123'); // In a real app, this would come from authentication
    const allProducts = ref([]);

    const goBack = () => {
        router.back();
    };

    const filteredWishlist = computed(() => {
    return wishlist.value.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(appliedFilters.value.searchQuery?.toLowerCase() || '');
        const matchesCategory = !appliedFilters.value.category || product.category === appliedFilters.value.category;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (appliedFilters.value.sortOption === 'lowToHigh') {
            return a.price - b.price;
        } else if (appliedFilters.value.sortOption === 'highToLow') {
            return b.price - a.price;
        }
        return 0;
    });
});

const handleFilterSortChange = (filters) => {
    appliedFilters.value = filters;
};

    onMounted(() => {
        // Retrieve wishlist from local storage
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.value = storedWishlist;
    });

    const saveWishlist = async () => {
  try {
    await syncWishlist(userId.value, wishlist.value);
  } catch (error) {
    console.error('Failed to sync wishlist:', error);
  }
};

    const removeFromWishlist = async (id) => {
        wishlist.value = wishlist.value.filter(product => product.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value)); // Update local storage directly
    window.dispatchEvent(new CustomEvent('update-wishlist-count')); // Dispatch event
    };

    const clearWishlist = async () => {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
        wishlist.value = [];
        localStorage.setItem('wishlist', JSON.stringify([])); // Clear local storage
        window.dispatchEvent(new CustomEvent('update-wishlist-count')); // Dispatch event
    }
};

const addToWishlist = async (product) => {
  if (!wishlist.value.some(item => item.id === product.id)) {
    wishlist.value.push(product);
    await saveWishlist();
    window.dispatchEvent(new CustomEvent('update-wishlist-count'));
  }
};


const viewProductDetails = (productId) => {
    router.push({ name: 'ProductDetails', params: { id: productId } });
};

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        
        const event = new Event('update-cart-count');
        window.dispatchEvent(event);
    };

    onMounted(async () => {
  try {
    // Fetch all products
    allProducts.value = await fetchProducts();
    
    // Fetch wishlist
    const userWishlist = await fetchWishlist(userId.value);
    
    // Map wishlist IDs to full product objects
    wishlist.value = userWishlist.map(wishlistItem => 
      allProducts.value.find(product => product.id === wishlistItem.id) || wishlistItem
    );
  } catch (error) {
    console.error('Failed to initialize wishlist:', error);
  }
});

// Watch for changes in the wishlist and sync
watch(wishlist, async () => {
  await saveWishlist();
}, { deep: true });
</script>

<style scoped>
.wishlist-page {
    padding: 1rem;
    background-color: #F3DBCE;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.cool-text {
    font-family: 'Poppins', sans-serif;
    color: #6D6875;
    font-size: 2rem;
    margin: 0.5rem 0;
}

.wishlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    width: 100%; /* Ensure the grid spans full width */
}

.wishlist-item {
    background-color: #F3F3F3;
    border: 1px solid #E0E0E0;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wishlist-image {
    width: 65%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 1rem;
}

.clear-all-button {
    background-color: #E5989B;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 1rem 0;
}

.clear-all-button:hover {
    background-color: #B5838D;
}

.view-details-button {
    background-color: #FFB4A2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.view-details-button:hover {
    background-color: #E5989B;
}

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-top: 0.5rem;
}

.icon-back, .icon-remove, .icon-cart {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #6D6875;
    transition: stroke 0.3s;
}

.icon-button:hover .icon-back, 
.icon-button:hover .icon-remove, 
.icon-button:hover .icon-cart {
    stroke: #B5838D;
}

.back-button {
    align-self: flex-start;
    margin-bottom: 1rem;
}
</style>