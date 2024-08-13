<template>
    <Filter @filter-sort-change="handleFilterSortChange" :appliedFilters="appliedFilters"/>
    <div class="product-grid">
      <div v-if="loading">Loading...</div>
        <div v-else class="grid">
            <div v-for="product in sortedAndFilteredProducts" :key="product.id" class="product-card" @click="viewProduct(product.id)">
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
                <button>Add To Cart</button>
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

.product-card button {
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
}

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

</style>