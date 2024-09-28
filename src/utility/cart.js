import { ref } from 'vue';

export const eventBus = {
  openCart: ref(false),
};

export const eventCart = {
  refreshCart: () => {}, // Placeholder for the method to refresh the cart
};



export default eventBus;
