<template>
    <div class="comparison-container">
        <h2 class="comparison-title">Comparison List</h2>

        <!-- Display message if comparison list is empty -->
         <div v-if="comparedProducts.length ===0" class="empty-message">
            No products added to the comparison list
         </div>

        <!-- Displaying products side by side for comparison -->
         <div v-else class="comparison-table-container">
            <div class="comparison-table">
            <div v-for="product in comparedProducts" :key="product.id" class="product-column">
                <div class="product-card">
                    <img :src="product.image" alt="Product Image" class="product-image">
                    <h3 class="product-title">{{ product.title }}</h3>
                    <p class="product-price">Price: ${{ product.price }}</p>
                    <p class="product-category">Category: {{ product.category }}</p>
                    <button @click="removeFromComparison(product.id)" class="remove-button">Remove</button>
                </div>
            </div>
        </div>
         </div>
        

        <!-- Clear the comparison list -->
         <button v-if="comparedProducts.length > 0" @click="clearComparison" class="clear-button">
            Clear Comparison
         </button>

    </div>
</template>

<script setup>
    import { ref } from 'vue';

    // Array to hold the products being displayed
    const comparedProducts = ref([]);

    // Load comparison list from localStorage
    const loadComparisonList = () => {
        comparedProducts.value = JSON.parse(localStorage.getItem('comparison')) || [];
    };

    //Removing a product from the comparison list
    const removeFromComparison = (productId) => {
        const updatedComparison = comparedProducts.value.filter(product => product.id !== productId);
        localStorage.setItem('comparison', JSON.stringify(updatedComparison));
        loadComparisonList();
    }

    //Clear comparison list
    const clearComparison = () => {
    localStorage.removeItem('comparison');
    loadComparisonList();
    };

    //Loading comparison list on component mount
    loadComparisonList();

    
</script>

<style scoped>

.comparison-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.comparison-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.empty-message {
    text-align: center;
    font-style: italic;
    color: #666;
}

.comparison-table-container {
    overflow-x: auto;
}

.comparison-table {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}

.product-column {
    flex: 1 0 200px;
    max-width: 300px;
}

.product-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-price {
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.remove-button, .clear-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover, .clear-button:hover {
  background-color: #d32f2f;
}

.clear-button {
  display: block;
  margin: 2rem auto 0;
  background-color: #2196F3;
}

.clear-button:hover {
  background-color: #1976D2;
}

</style>