<template>
    <Filter @filter-sort-change="handleFilterSortChange" :appliedFilters="appliedFilters"/>
    <div class="product-grid">
      <div v-if="loading">Loading...</div>
        <div v-else class="grid">
            <div v-for="product in sortedAndFilteredProducts"   :key="product.id" class="product-card" @click="viewProduct(product.id)">
                <img :src="product.image" class="product-image">
                <h3>{{ product.title }}</h3>
                <h4 class="product-category">{{ product.category }}</h4>
                <p>${{ product.price }}</p>
                <div class="ratings">
                  <span v-for="star in 5" :key="star" class="star">
                    <!-- Display filled star if the rating is at or above the current star position -->
                    <svg v-if="star <= product.rating.rate" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="star-filled" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.453L24 9.539l-6 5.848 1.417 8.273L12 18.897l-7.417 4.763L6 15.387 0 9.539l8.332-1.499z"/>
                    </svg>

                    <!-- Display empty star if the rating is below the current star position -->
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="star-empty" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.453L24 9.539l-6 5.848 1.417 8.273L12 18.897l-7.417 4.763L6 15.387 0 9.539l8.332-1.499z" fill-opacity="0.3"/>
                        </svg>
                  </span>
                  <span>({{ product.rating.count }})</span>
                </div>
                <button @click.stop="addToCart(product)">Add To Cart</button>

                <!-- Compare button -->
                <button @click.stop="addToCompare(product)" class="compare-button">
                  <i class="fas fa-balance-scale"></i> Compare
                </button>

                <!-- Wishlist button (Heart Icon) -->
                <div @click.stop="addToWishlist(product)" class="wishlist-icon" :class="{ 'wishlisted': wishlistedProducts.has(product.id) }">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="heart-icon">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, computed} from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Filter from './Filter.vue';

    // Reactive state variables
    const products = ref([]);
    const loading = ref(true)
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortOption = ref('');
    const appliedFilters = ref({});
    const wishlistedProducts = ref(new Set());


    /**
     * Fetches products from the API and updates the state.
     * Handles errors and updates the loading state.
     */
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            products.value = await response.json()
            loading.value = false
        } catch (error) {
            console.error('Error fetching products:', error)
            loading.value = false
        }
    }

    const router = useRouter();
    const route = useRoute();

    /**
     * Navigates to the product detail view with the specified product ID.
     * Updates the URL query parameters to include current filters and sort options.
     */

    const viewProduct = (id) => {
        router.push({name: 'ProductDetails',
         params: {id},
         query: {
          searchQuery: searchQuery.value,
          category: selectedCategory.value,
          sortOption: sortOption.value
         }
        });
    };


     /**
     * Handles changes in filter and sort options.
     * Updates the reactive state and the URL query parameters.
     */

    const handleFilterSortChange = (filters) => {
      searchQuery.value = filters.searchQuery;
      selectedCategory.value = filters.category;
      sortOption.value = filters.sortOption;

      //Updating URL with the new filters and sort option
      router.replace({
        query: {
          searchQuery: searchQuery.value,
          category: selectedCategory.value,
          sortOption: sortOption.value
        }
      });
    };

    /**
     * Filters products based on the current search query and selected category.
     * 
     * @returns {Array} - The filtered list of products.
     */
    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value;

        return matchesSearch && matchesCategory;
      });
    });


    /**
     * Sorts the filtered products based on the selected sort option.
     * 
     * @returns {Array} - The sorted list of filtered products.
     */
    const sortedAndFilteredProducts = computed(() => {
      let result = [...filteredProducts.value];
      if (sortOption.value === 'lowToHigh') {
        result.sort((a, b)  => a.price - b.price);
      } else if (sortOption.value === 'highToLow') {
        result.sort((a, b)  => b.price - a.price);
      }
      return result;
    });

    const addToCart = (product) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === product.id);

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({...product, quantity: 1});
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      
      //Emitting a custom event to update the cart count
      const event = new Event('update-cart-count');
      window.dispatchEvent(event);
    };

    const addToCompare = (product) => {
    let comparison = JSON.parse(localStorage.getItem('comparison')) || [];
    
    // Check if the product is already in the comparison list
    if (comparison.find(item => item.id === product.id)) {
        alert('Product is already in the comparison list.');
        return;
    }

    // Check if the limit has been reached
    if (comparison.length >= 5) { // max_comparison can be replaced with a constant or configuration
        alert('You can only compare up to 5 products.');
        return;
    }

    // Add the product to the comparison list
    comparison.push(product);
    localStorage.setItem('comparison', JSON.stringify(comparison));
    alert('Product added to comparison list!');

    // Dispatch a custom event to update the comparison count
    window.dispatchEvent(new CustomEvent('update-comparison-count'));
};


const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if the product is already in the wishlist
    if (wishlist.find(item => item.id === product.id)) {
        alert('Product is already in your wishlist.');
        return;
    }

    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Add the product ID to the wishlistedProducts set
    wishlistedProducts.value.add(product.id);
    
    // Dispatch a custom event to update the wishlist count
    window.dispatchEvent(new CustomEvent('update-wishlist-count'));
    
    alert('Product added to your wishlist!');
};


    onMounted(() => {
      fetchProducts();

      //Restoring filters from URL query parameters
      const { searchQuery: q, category, sortOption: sort } = route.query;
      searchQuery.value = q || '';
      selectedCategory.value = category || '';
      sortOption.value = sort || '';

      appliedFilters.value = {
          searchQuery: q || '',
          category: category || '',
          sortOption: sort || ''
      };

      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistedProducts.value = new Set(wishlist.map(item => item.id));
    });

</script>

<style scoped>

.product-grid {
    padding: 1rem;
    display: flex;
    justify-content: center;
    background-color: #F3DBCE;
    }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1200px; 
}

.product-card {
  background-color: #F3F3F3;
  border: 1px solid #E0E0E0; 
  border-radius: 1rem; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  align-items: center;
  padding: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15); 
}

.product-image {
  width: 65%;
  height: 100%;
  object-fit: contain;
  border-bottom: 1px solid #E5989B; 
}

.product-card h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
  
}

.product-card h4 {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #7A7A7A; 
}

.product-category {
  font-size: 1rem;
  color: #6D6875;
  background: linear-gradient(to right, #E5989B, #6D6875);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  border: 2px solid #E5989B;
  border-radius: 1rem;
  display: inline-block;
  margin: 0.5rem 0;
}

.product-card p {
  margin: 0.5rem 0;
  font-size: 1.125rem;
  font-weight: bold;
  color: #000;
}

/* .product-card button {
  background-color: #4caf50; 
  color: white;
  border: none;
  border-radius: 0.375rem; 
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
}

.product-card button:hover {
  background-color: #45a049; 
} */

.ratings {
    display: flex;
    
    align-items: center;
    margin: 0.5rem 0;
}

.star {
    width: 1rem;
    height: 1rem;
    margin-right: 0.1rem;
}

.star-filled {
    color: #ffc107;
}

.star-empty {
    color: #e0e0e0;
}

.rating-number {
    font-size: 0.875rem;
    color: #7a7a7a;
    margin-left: 0.5rem;
}

.compare-button {
    background-color: #E5989B;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
    display: flex;
    align-items: center;
}

.compare-button i {
    margin-right: 8px;
}

.compare-button:hover {
    background-color: #6D6875;
}

.wishlist-icon {
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.heart-icon {
    width: 24px;
    height: 24px;
    fill: #E5989B; /* Color of the heart icon */
}

.wishlist-icon:hover .heart-icon,
.wishlist-icon.wishlisted .heart-icon {
    transform: scale(1.2);
    fill: #ff6b6b; /* Color on hover */
}

</style>