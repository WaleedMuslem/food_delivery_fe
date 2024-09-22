
<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Suppliers</h2>
  
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="supplier in suppliers" :key="supplier.id" class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 sm:h-80">
              <img :src="supplier.image" :alt="supplier.image" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ supplier.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ supplier.workingHours.opening }} - {{supplier.workingHours.closing }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ supplier.type.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { fetchWithAuth } from '@/utility/auth' // Assuming the function is in a utils folder

const suppliers = ref([])

const fetchSuppliers = async () => {
  try {
    const response = await fetchWithAuth('https://localhost:8080/suppliers') // Replace with your actual API endpoint
    suppliers.value = response
  } catch (error) {
    console.error('Error fetching suppliers:', error)
  }
}

onMounted(() => {
  fetchSuppliers()
})
  </script>