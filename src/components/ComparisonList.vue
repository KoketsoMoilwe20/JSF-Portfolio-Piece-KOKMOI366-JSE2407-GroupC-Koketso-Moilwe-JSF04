<template>
    <div>
        <h2>Comparison List</h2>

        <!-- Display message if comparison list is empty -->
         <div v-if="comparedProducts.length ===0">
            No products added to the comparison list
         </div>

        <!-- Displaying products side by side for comparison -->
        <div v-else class="comparison-table">
            <div v-for="product in comparedProducts" :key="product.id" class="product-comparison">
                <img :src="product.image" alt="Product Image" class="product-image">
                <h3>{{ product.title }}</h3>
                <p>Price: ${{ product.price }}</p>
                <p>Category: {{ product.category }}</p>
                <button @click="removeFromComparison(product.id)" class="remove-button">Remove</button>
            </div>
        </div>

        

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