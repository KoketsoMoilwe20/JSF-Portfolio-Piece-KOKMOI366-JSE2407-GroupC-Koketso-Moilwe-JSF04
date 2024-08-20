<template>
    <div class="comparison-container">
        <h2 class="comparison-title">Comparison List</h2>

        <!-- Back Button -->
         <button @click="goBack" class="back-button">
          Back
         </button>

        <!-- Display message if comparison list is empty -->
         <div v-if="state.comparisonList && state.comparisonList.length === 0" class="empty-message">
            No products added to the comparison list
         </div>

        <!-- Displaying products side by side for comparison -->
         <div v-else class="comparison-table-container">
           <table class="comparison-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in state.comparisonList" :key="product.id">
                  <td>
                    <img :src="product.image" alt="Product Image" class="product-image">
                    <h3 class="product-title">{{ product.title }}</h3>
                  </td>
                  <td>${{ product.price }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.rating.rate }} ({{ product.rating.count }}) reviews</td>
                  <td><button @click="removeFromComparison(product.id)" class="remove-button">Remove</button></td>
                </tr>
              </tbody>
           </table>
         </div>
        

        <!-- Clear the comparison list -->
         <button v-if="state.comparisonList && state.comparisonList.length > 0" @click="clearComparison" class="clear-button">
            Clear Comparison
         </button>

    </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import store from '../store';

  const {state, removeFromComparison, clearComparison} = store;

    // Access Router
    const router = useRouter();

    // Function to navigate back to the last viewed page
    const goBack = () => {
      router.back();
    };

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
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 1.2rem;
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