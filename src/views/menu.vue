<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Suppliers</h2>
  
        <!-- Adjusted grid classes to show 3 cards per line on larger screens -->
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div v-for="item in menu" :key="item.ID" class="group relative flex flex-col sm:flex-row justify-between items-center sm:items-start bg-white shadow-lg rounded-lg p-4">
            
            <!-- Supplier Info (on the left) -->
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
  
            <!-- Supplier Image (on the right) -->
            <div class="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <img :src="item.image" :alt="item.image" class="h-full w-full object-cover object-center" />
              </div>
  
              <!-- Quantity Selector -->
              <div class="mt-4 flex items-center justify-between space-x-4">
                <button 
                  @click="decreaseQuantity(item.ID)" 
                  class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                >-</button>
                <span class="text-lg">{{ quantities[item.ID] || 0 }}</span>
                <button 
                  @click="increaseQuantity(item.ID)" 
                  class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
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
  
  const route = useRoute()
  const categoryId = route.params.categoryId
  const menu = ref([])
  
  // Quantities object to track the number of items added to the cart
  const quantities = ref({})
  
  // Fetch menu data from the API
  const fetchMenu = async () => {
    try {
      const response = await fetchWithAuth(`https://localhost:8080/menu/category/${categoryId}`)
      menu.value = response
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }
  
  // Function to increase quantity of an item
  const increaseQuantity = (id) => {
    if (!quantities.value[id]) {
      quantities.value[id] = 0
    }
    quantities.value[id]++
  }
  
  // Function to decrease quantity of an item
  const decreaseQuantity = (id) => {
    if (quantities.value[id] > 0) {
      quantities.value[id]--
    }
  }
  
  onMounted(() => {
    fetchMenu()
  })
  </script>
  