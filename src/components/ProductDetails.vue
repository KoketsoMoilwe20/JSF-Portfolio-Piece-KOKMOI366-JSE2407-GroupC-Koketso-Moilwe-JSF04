<template>
    <!-- Loading state while fetching product details -->
    <div v-if="loading" class="product-detail">
        Loading...
    </div>

    <!-- Display product details if loaded successfully -->
    <div v-else-if="product" class="product-details">
        <div class="product-image-container">
            <img :src="product.image" class="product-image">
        </div>
        
        <div class="product-info">
            <h2>{{ product.title }}</h2>
            <p class="price">${{ product.price }}</p>
            <div class="ratings">

                <!-- Render star icons based on product rating -->
                <span v-for="star in 5" :key="star" class="star">

                 <!-- Show filled star if rating is equal to or greater than the current star position -->
                <svg v-if="star <= product.rating.rate" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="star-filled" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.453L24 9.539l-6 5.848 1.417 8.273L12 18.897l-7.417 4.763L6 15.387 0 9.539l8.332-1.499z"/></svg>

                <!-- Show empty star if rating is less than the current star position -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="star-empty" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.453L24 9.539l-6 5.848 1.417 8.273L12 18.897l-7.417 4.763L6 15.387 0 9.539l8.332-1.499z" fill-opacity="0.3"/></svg>
                </span>

                <!-- Display the number of ratings -->
                <span class="rating-number">({{ product.rating.count }})</span>
        </div>

        <!-- Product Description -->
        <p class="description">{{ product.description }}</p>

        <!-- Product Category -->
        <p class="category">Category: {{ product.category }}</p>

        <!-- Button to navigate back to the product list -->
        <button @click="goBack" class="back-button">Back To Products</button>
    </div>
        </div>
        
        <!-- Display if the product is not found -->
    <div v-else class="prodcuct-details">
        Product not found
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';


    // Reactive state variables
    const product = ref(null) 
    const loading = ref(true)
    const route = useRoute()


    /**
     * Fetches product details from the API based on the product ID from the route parameters.
     * Updates the state and handles errors.
     */
    const fetchProduct = async () => {
        const id = route.params.id;
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            product.value = await response.json()
            loading.value = false
        } catch (error) {
            console.error('Error fetching product:', error)
            loading.value = false
        }
    }

    const router = useRouter();

    /**
     * Navigates back to the Home view while preserving the current query parameters.
     */
    const goBack = () => {
        router.push({name: 'Home',
            query: route.query //preserving the current query parameters
        });
    };

    onMounted(fetchProduct) //Fetch product details when component is mounted
</script>

<style scoped>
    .product-details {
        display: flex;
    padding: 20px;
    max-width: 1000px;
    max-height: 80vh;
    margin: 20px auto;
    background-color: #F3DBCE;
    border: 1px solid #B5838D;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .product-image-container {
        flex: 0 0 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
    }


    .product-image {
        max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid #E5989B;

    }

    .product-info {
        flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 60vh;
    overflow-y: auto;
    padding-left: 20px;
}

    h2 {
        font-size: 1.5rem;
    color: #6D6875;
    margin-top: 0;
    margin-bottom: 10px;
    }

    .price {
        font-weight: bold;
    font-size: 1.2em;
    color: #E5989B;
    margin: 5px 0px;
    }

    .description {
        font-size: 0.9rem;
    color: #4b5563;
    margin: 10px 0;
    flex-grow: 1;
    overflow-y: auto;
    }

    .category {
        font-style: italic;
        color: #B5838D;
        margin: 5px 0;
    }

    .ratings {
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.star {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.2rem;
}

.star-filled {
    color: #ffb4a2;
}

.star-empty {
    color: #e5989b;
}

.rating-number {
    font-size: 0.9rem;
    color: #6b7280;
    margin-left: 0.5rem;
}

.back-button {
    background-color: #FFB4A2;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-start;
    margin-top: 10px;
}

.back-button:hover {
    background-color: #e5989b;
}

@media (max-width: 768px) {
    .product-details {
        flex-direction: column;
        max-height: none;
        height: auto;
        margin: 10px;
        padding: 15px;
    }

    .product-image-container {
        flex: 0 0 auto;
        padding-right: 0;
        padding-bottom: 15px;
    }

    .product-image {
        max-height: 40vh;
    }

    .product-info {
        padding-left: 0;
        max-height: none;
    }

    h2 {
        font-size: 1.3rem;
    }

    .price, .description, .category, .rating-number {
        font-size: 0.85rem;
    }

    .star {
        width: 1rem;
        height: 1rem;
    }

    .back-button {
        width: 100%;
        padding: 10px;
    }
}

</style>