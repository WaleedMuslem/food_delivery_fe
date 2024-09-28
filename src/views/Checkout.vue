<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Confirm Your Order</h2>
  

            <!-- Success Alert -->
            <div v-if="showSuccessAlert" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        Purchase successful! Thank you for your order.
      </div>


      <!-- Display Address -->
      <div class="mb-6" v-if="address">
        <h3 class="text-xl font-semibold mb-2">Shipping Address</h3>
        <div class="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p><strong>Street:</strong> {{ address.street }}</p>
          <p><strong>City:</strong> {{ address.city }}</p>
          <p><strong>ZIP Code:</strong> {{ address.zip }}</p>
          <p><strong>Floor:</strong> {{ address.floor }}</p>
          <p><strong>Apartment:</strong> {{ address.apartment }}</p>
        </div>
      </div>
  
      <!-- Display Cart Products -->
      <div class="mb-6" v-if="cart.length">
        <h3 class="text-xl font-semibold mb-2">Your Cart</h3>
        <div class="p-4 border border-gray-200 rounded-md bg-gray-50">
          <ul>
            <li
              v-for="product in cart"
              :key="product.id"
              class="flex justify-between items-center mb-4"
            >
              <div>
                <p class="font-medium">{{ product.name }} * {{ product.quantity }}</p>
                <p class="text-sm text-gray-600">{{ product.price }} USD</p>
              </div>
              <p class="font-bold">{{ product.total_price }} USD</p>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Display Total Price -->
      <div class="mb-6" v-if="cart.length">
        <h3 class="text-xl font-semibold mb-2">Total:</h3>
        <p class="text-lg font-bold">{{ total }} USD</p>
      </div>
  
      <!-- Loading or Error States -->
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</div>
  
      <!-- Confirm Button -->
      <button
        class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        @click="confirmPurchase"
        :disabled="isLoading || !cart.length"
      >
        Confirm Order
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { fetchWithAuth } from '@/utility/auth';
  import eventBus from '@/utility/cart';

  
  
  // State variables
  const address = ref(null)
  const cart = ref([])
  const errorMessage = ref('')
  const showSuccessAlert = ref(false)
  const isLoading = ref(true)
  import { eventCart } from '@/utility/cart';
  const cartID = localStorage.getItem('cart_id');
  const total = computed(() => {
  const sum = cart.value.reduce((acc, product) => acc + product.total_price, 0);
  return parseFloat(sum.toFixed(2));  // Round to 2 decimal places
});

  
  // Fetch the data when the component is mounted
  const fetchAddressAndCart = async () => {
    try {
      // Fetch address
      const addressResponse = await fetchWithAuth('https://localhost:8080/address', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        address.value = addressResponse;

  
      // Fetch cart
      const cartResponse = await fetchWithAuth('https://localhost:8080/cart/getCart', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

    //   console.log(cartResponse)
      cart.value = cartResponse.Items;
    //   console.log(cart.value)

    } catch (error) {
      errorMessage.value = error.message || 'An error occurred while fetching data.'
    } finally {
      isLoading.value = false
    }
  }
  
  // Confirm Order
  const router = useRouter()
//   const confirmOrder = async () => {
//     // Simulate order confirmation process
// await fetchWithAuth('')
//     // Redirect to order success page
//     router.push({ name: 'orderSuccess' }) // Replace with your success page route
//   }

const confirmPurchase = async () => {
  try {
    const purchaseResponse = await fetchWithAuth('https://localhost:8080/cart/checkout', {
      method: 'POST',
      body: JSON.stringify({
        cart_id: parseInt(cartID,10),
        }) 
    })
    console.log(purchaseResponse)

    localStorage.setItem('cart_id',purchaseResponse);

    showSuccessAlert.value = true // Display the success message

    // After a delay, redirect to the home page
    setTimeout(() => {
        eventCart.refreshCart(); // Trigger refresh event
        // fetchCartData()
        router.push({ name: 'home' });

    }, 2000)
  } catch (error) {
    console.error('Error confirming purchase:', error)
    alert('An error occurred while confirming your purchase.')
  }

  eventBus.openCart.value = false;
}

// async function fetchCartData() {
//     try {
//       const response = await fetchWithAuth('https://localhost:8080/cart/getCart');  // Adjust the URL to match your backend API endpoint
//       // console.log(response.Items)
//       products.value = response.Items;  // Assuming the response contains an array of cart itemsc

//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//     }
//   }
  
  // Fetch data when the component is mounted
  onMounted(fetchAddressAndCart)
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  