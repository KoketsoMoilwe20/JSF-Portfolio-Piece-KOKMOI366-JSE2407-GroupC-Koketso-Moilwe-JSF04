<template>
    <div class="comparison-container">
        <h2 class="comparison-title">Comparison List</h2>

        <!-- Back Button -->
        <button @click="goBack" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-back" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg> Back
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
                  <th v-for="product in state.comparisonList" :key="product.id" class="product-column">
                            <div class="product-header">
                                <img :src="product.image" alt="Product Image" class="product-image">
                                <h3 class="product-title">{{ product.title }}</h3>
                            </div>
                        </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                        <td v-for="product in state.comparisonList" :key="'price-' + product.id">${{ product.price }}</td>
                    </tr>
                    <tr>
                        <td v-for="product in state.comparisonList" :key="'category-' + product.id">{{ product.category }}</td>
                    </tr>
                    <tr>
                        <td v-for="product in state.comparisonList" :key="'description-' + product.id">{{ product.description }}</td>
                    </tr>
                    <tr>
                        <td v-for="product in state.comparisonList" :key="'rating-' + product.id">
                            {{ product.rating.rate }} ({{ product.rating.count }}) reviews
                        </td>
                    </tr>
                    <tr>
                        <td v-for="product in state.comparisonList" :key="'action-' + product.id">
                            <button @click="removeFromComparison(product.id)" class="remove-button">Remove</button>
                        </td>
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
  table-layout: auto;
}

.comparison-table th,
.comparison-table td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: center;
}

.comparison-table th {
  padding: 1rem;
  border-bottom: 2px solid #ddd;
}
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
}

.product-column {
    text-align: center;
}

.product-header {
    text-align: center;
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

.back-button {
    background-color: #f5f5f5;
    color: #333;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #e0e0e0;
}

.icon-back {
    margin-right: 0.5rem;
}
</style>