<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{category_type}} items</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <div v-for="item in menu" :key="item.ID" class="group relative flex flex-col sm:flex-row justify-between items-center sm:items-start bg-white shadow-lg rounded-lg p-4">
          
          <!-- Item Info -->
          <div class="w-full sm:w-1/2">
            <h3 class="text-lg font-semibold text-gray-900">
                {{ item.name }}
            </h3>
            <span v-for="ingredient in item.ingredients" :key="ingredient" class="mt-1 text-sm text-gray-500">
              {{ ingredient }},
            </span>
            <p class="mt-2 text-sm font-medium text-gray-900">{{ item.supplier_name }}</p>
            <p class="mt-2 text-sm font-medium text-gray-900">{{ item.price }}$</p>
          </div>

          <!-- Item Image -->
          <div class="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
              <img :src="item.image || 'https://via.placeholder.com/150'" :alt="item.image" class="h-full w-full object-cover object-center" />
            </div>

            <!-- Quantity Selector -->
            <div class="mt-4 flex items-center justify-between space-x-4">
              <button 
                @click="decreaseQuantity(item.ID, item.price)" 
                class="px-3 py-1 bg-gray-300 rounded-md hover:bg-primeColor-900"
              >-</button>
              <span class="text-lg">{{ item.quantity || 0 }}</span>
              <button 
                @click="increaseQuantity(item.ID, item.price)" 
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
import { ref, onMounted } from 'vue'
import { fetchWithAuth } from '@/utility/auth'
import { useRoute } from 'vue-router'
import { eventCart } from '@/utility/cart';
// import {fetchCartData} from '@/views/Cart.vue'

const route = useRoute()
const id = route.params.categoryId
const menu = ref([])
const category_type = ref("")
const cartID = localStorage.getItem('cart_id');


// Quantities object to track the number of items added to the cart
const quantities = ref({})

// Fetch menu data from the API
const fetchMenu = async () => {
  try {
    const response = await fetchWithAuth(`https://localhost:443/api/menu/category/${id}`)
    // console.log(response)
    menu.value = response
    // console.log(menu[0].ID)
    category_type.value = menu.value[0].type
    // console.log(category_type)
    // console.log(menu)
  } catch (error) {
    console.error('Error fetching menu:', error)
  }
}

// Function to increase quantity of an item
const increaseQuantity = async (id, price) => {
  if (!quantities.value[id]) {
    quantities.value[id] = 0
  }
  quantities.value[id]++

  try {
    // Send API request to add item to the cart
    await fetchWithAuth('https://localhost:443/api/cart/additem', {
      method: 'POST',
      body: JSON.stringify({
        product_id: id,
        quantity: quantities.value[id],
        cart_id: parseInt(cartID,10),
        price: price
      })
    })
    console.log(`Item ${id} added to cart.`)
    eventCart.refreshCart(); // Trigger refresh event
    await fetchMenu()

    // await fetchCartData()
  } catch (error) {
    console.error('Error adding item to cart:', error)
  }
}

// Function to decrease quantity of an item
const decreaseQuantity = async (id, price) => {
  if (quantities.value[id] > 0) {
    quantities.value[id]--

    try {

      if (quantities.value[id] == 0){
        const response = await fetchWithAuth(`https://localhost:443/api/cart/removeItem`,{
            method: 'POST',                  // Set the HTTP method (POST, PUT, etc.)
            body: JSON.stringify({
              cart_id: parseInt(cartID,10),
              product_id: id  // Add your actual product_id value here
              })   // Stringify the body data
        });
        eventCart.refreshCart(); // Trigger refresh event
        await fetchMenu()
      } else{
      // Send API request to remove item from the cart
      await fetchWithAuth('https://localhost:443/api/cart/additem', {
        method: 'POST',
        body: JSON.stringify({
          product_id: id,
          quantity: quantities.value[id],
          cart_id: parseInt(cartID,10),
          price: price
        })
      })
      console.log(`Item ${id} removed from cart.`)
      eventCart.refreshCart(); // Trigger refresh event
      await fetchMenu()
    }
  } 
  catch (error) {
    console.error('Error removing item from cart:', error)
  }
}}

// Fetch menu on component mount
onMounted(() => {
  fetchMenu()
})
</script>
