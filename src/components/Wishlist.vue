<template>
   <div class="wishlist-page">
        <h2>My Wishlist</h2>
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
                <button @click="removeFromWishlist(product.id)">Remove</button>
                <button @click="addToCart(product)">Add to Cart</button>
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

.wishlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
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

</style>