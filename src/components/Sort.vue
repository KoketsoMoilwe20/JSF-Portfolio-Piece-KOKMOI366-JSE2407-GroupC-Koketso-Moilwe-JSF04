<template>
    <!-- Container for the sort component -->
    <div class="sort-component">
        <!-- Dropdown for selecting sort option -->
        <select v-model="sortOption" @change="emitSortChange">
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
        </select>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    // Define component props
    const props = defineProps({
        initialSort: {
            type: String,
            default: ''
        }
    });

    // Reactive state variable for the selected sort option
    const sortOption = ref(props.initialSort);

    // Define the emits for the component
    const emit = defineEmits(['sort-change']);

    /**
     * Emits the current sort option to the parent component.
     */
    const emitSortChange = () => {
        emit('sort-change', sortOption.value)
    };

    /**
     * Watcher to emit sort change whenever the sortOption changes.
     * The immediate flag ensures that the initial sort option is emitted as well.
     */
    watch(sortOption, () => {
        emitSortChange();
    }, {immediate: true})
</script>

<style scoped>
    .sort-component {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }

    .sort-component select {
        padding: 8px;
        border: 1px solid #B5838D;
        border-radius: 4px;
        font-size: 16px;
        background-color: #FFFFFF; /* Background color */
        color: #6D6875; /* Text color */
        width: 200px;
    }

    /* Responsive styles for smaller screens */
    @media (max-width: 768px) {
        .sort-component {
            margin-top: 20px;
            justify-content: flex-start;
        }

        .sort-component select {
            width: 100%;
            max-width: 200px;
        }
    }
</style>