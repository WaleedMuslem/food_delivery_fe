<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ supplier_name }} items</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <div 
          v-for="item in menu" 
          :key="item.ID" 
          class="group relative flex flex-col sm:flex-row justify-between items-center sm:items-start bg-white shadow-lg rounded-lg p-4"
        >
          <div class="w-full sm:w-1/2">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
            <span v-for="ingredient in item.ingredients" :key="ingredient" class="mt-1 text-sm text-gray-500">{{ ingredient }}</span>
            <p class="mt-2 text-sm font-medium text-gray-900">{{ item.supplier_name }}</p>
            <p class="mt-2 text-sm font-medium text-gray-900">{{ item.price }}$</p>
          </div>

          <div class="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
              <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center" @error="handleImageError" />
            </div>

            <div class="mt-4 flex items-center justify-between space-x-4">
              <button 
                @click="decreaseQuantity(item)" 
                class="px-3 py-1 bg-gray-300 rounded-md hover:bg-primeColor-900"
              >-</button>
              <span class="text-lg">{{ item.quantity || 0 }}</span>
              <button 
                @click="increaseQuantity(item)" 
                class="px-3 py-1 bg-gray-300 rounded-md hover:bg-primeColor-900"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchWithAuth } from '@/utility/auth';
import { useRoute } from 'vue-router';
import { eventCart } from '@/utility/cart';

const route = useRoute();
const id = route.params.supplierId;
const menu = ref([]);
const supplier_name = ref("");
const cartID = localStorage.getItem('cart_id');
const quantities = ref({}); // Store quantities

const fetchMenu = async () => {
  try {
    const response = await fetchWithAuth(`https://localhost:443/api/supplier/${id}/menu`);
    menu.value = response;
    supplier_name.value = response[0]?.supplier_name || ""; // Ensure supplier name is set
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
};

const increaseQuantity = async (item) => {
  item.quantity = (item.quantity || 0) + 1; // Update the quantity directly
  await updateCart(item, item.quantity); // Update cart on the server
};

const decreaseQuantity = async (item) => {
  if (item.quantity > 0) {
    item.quantity--; // Update the quantity directly
    await updateCart(item, item.quantity); // Update cart on the server
  }
};

const updateCart = async (item, quantity) => {
  try {
    if (quantity > 0) {
      await fetchWithAuth('https://localhost:443/api/cart/additem', {
        method: 'POST',
        body: JSON.stringify({
          product_id: item.ID,
          quantity: quantity,
          cart_id: parseInt(cartID, 10),
          price: item.price
        })
      });
    } else {
      await fetchWithAuth('https://localhost:443/api/cart/removeItem', {
        method: 'POST',
        body: JSON.stringify({
          cart_id: parseInt(cartID, 10),
          product_id: item.ID
        })
      });
    }
    eventCart.refreshCart(); // Trigger refresh event
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

const handleImageError = (event) => {
  event.target.src = 'https://cdn.profoto.com/cdn/05238cd/globalassets/tips-and-tricks/profoto-c1-plus-food-photography-anders-hannola.jpg?width=2840&quality=75&format=jpg'; // Placeholder image
};

onMounted(() => {
  fetchMenu();
});

onBeforeUnmount(() => {
  // Cleanup logic if necessary
});
</script>
