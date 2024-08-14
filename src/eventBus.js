import { reactive } from "vue";

export const eventBus = reactive({
    cartCount: 0,
    updateCartCount(count) {
        this.cartCount = count;
    }
});