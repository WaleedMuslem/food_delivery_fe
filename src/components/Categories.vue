<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Categories</h2>

      <div class="mt-6 overflow-x-auto scroll-hidden ms-overflow-hidden">
        <div class="flex space-x-6">
          <div v-for="category in categories" :key="category.category_id" class="group relative min-w-[250px]">
            <router-link
              :to="{ name: 'supplierByCategory', params: { categoryId: category.category_id }}"
              class="block"
            >
              <div class="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <!-- Category Image -->
                <img :src="category.category_image" :alt="category.category_name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />

                <!-- Overlay with category details -->
                <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div>
                    <h3 class="text-white text-lg font-semibold">{{ category.category_name }}</h3>
                    <p class="text-sm text-gray-300">Shop now</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchWithAuth, useAuthStore } from '@/utility/auth'

const categories = ref([])
const authStore = useAuthStore()

const fetchCategories = async () => {
  try {
    const response = await fetchWithAuth('https://localhost:8080/categories')
    console.log(response)
    categories.value = response
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  console.log(authStore.isLoggedIn)
}

onMounted(() => {
  fetchCategories()
})
</script>
<style scoped>
/* Hide scrollbar for Chrome, Safari, and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.ms-overflow-hidden {
  overflow: -ms-hidden;
}

/* Hide scrollbar for Firefox */
.scroll-hidden {
  scrollbar-width: none;
}

/* Custom scrollbar styles (if needed) */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>