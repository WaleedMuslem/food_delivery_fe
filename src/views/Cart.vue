<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="closeCart">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500" @click="closeCart">
                            x
                          </button>
                        </div>
                      </div>
  
                      <div class="mt-8">
                        <div class="flow-root">
                          <ul role="list" class="-my-6 divide-y divide-gray-200">
                            <li v-for="product in products" :key="product.id" class="flex py-6">
                              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img :src="product.image" :alt="product.image" class="h-full w-full object-cover object-center" />
                              </div>
  
                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a :href="product.href">{{ product.name }}</a>
                                    </h3>
                                    <p class="ml-4">{{ product.total_price }} $</p>
                                  </div>
                                  <p class="mt-1 text-sm text-gray-500">{{ product.price }} $</p>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                  <p class="text-gray-500">Qty {{ product.quantity }}</p>
  
                                  <div class="flex">
                                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="removeProduct(product.product_id,product.cart_id)">Remove</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Amount</p>
                        <p>{{cartTotal}} $</p>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                      <div class="mt-6">
                        <a href="#" class="flex items-center justify-center mt-5 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600">Checkout</a>
                      </div>
                      <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{{ ' ' }}
                          <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="closeCart">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import eventBus from '@/utility/cart';
  import { fetchWithAuth } from '@/utility/auth'

  
  const open = ref(false);
  const products = ref([]);  // Change to ref for reactivity
  const cartTotal = ref(0);  // Store cart subtotal
  
  watch(eventBus.openCart, (newValue) => {
    open.value = newValue; // Update local state based on event bus state
  });
  
  // Function to close the cart
  function closeCart() {
    open.value = false; // Close the dialog locally
    eventBus.openCart.value = false; // Update the event bus state
  }

  // Function to calculate the cart total
function calculateCartTotal() {
  cartTotal.value = products.value.reduce((total, product) => {
    return total + product.total_price;
  }, 0);
}
  
  // Fetch cart data from backend API
  async function fetchCartData() {
    try {
      const response = await await fetchWithAuth('https://localhost:8080/cart/getCart');  // Adjust the URL to match your backend API endpoint
      // console.log(response.Items)
      products.value = response.Items;  // Assuming the response contains an array of cart itemsc

      calculateCartTotal();

      console.log(products.value)
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }

  async function removeProduct(productId,cart_id) {
  try {
    const response = await fetchWithAuth(`https://localhost:8080/cart/removeItem`,{
            method: 'POST',                  // Set the HTTP method (POST, PUT, etc.)
            body: JSON.stringify({
                  cart_id: cart_id,    // Add your actual cart_id value here
                  product_id: productId  // Add your actual product_id value here
              })   // Stringify the body data
        });
        
    // Check if the response is okay and if it has a body
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    fetchCartData();  // Refresh the cart after removing the item
  } catch (error) {
    console.error('Error removing product:', error);
  }
}
  
  // Fetch cart data when the component is mounted
  onMounted(() => {
    fetchCartData();
  });
  </script>
  