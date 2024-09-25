<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Supplier items</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="supplier in suppliers" :key="supplier.id" class="group relative">
          <router-link
              :to="{ name: 'itemsBySupplier', params: { supplierId: supplier.id }}"
              class="block"
            >
          <!-- Supplier Image -->
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 sm:h-80 relative">
            <img :src="supplier.image" :alt="supplier.name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            
            <!-- Closed Overlay -->
            <div v-if="isSupplierClosed(supplier)" class="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center text-white text-xl font-semibold">
              Closed
            </div>
          </div>

          <!-- Supplier Details -->
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {{ supplier.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ supplier.workingHours.opening }} - {{ supplier.workingHours.closing }}
              </p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ supplier.type.type }}</p>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchWithAuth } from '@/utility/auth'

const suppliers = ref([])

const fetchSuppliers = async () => {
  try {
    const response = await fetchWithAuth('https://localhost:8080/suppliers') // Replace with your actual API endpoint
    suppliers.value = response
  } catch (error) {
    console.error('Error fetching suppliers:', error)
  }
}

// Helper function to determine if the supplier is closed
const isSupplierClosed = (supplier) => {
  const now = new Date()
  const currentHour = now.getHours()
  const openingHour = parseInt(supplier.workingHours.opening.split(':')[0])
  const closingHour = parseInt(supplier.workingHours.closing.split(':')[0])

  // If current time is outside of the supplier's working hours, return true (closed)
  return currentHour < openingHour || currentHour >= closingHour
}

onMounted(() => {
  fetchSuppliers()
})
</script>
