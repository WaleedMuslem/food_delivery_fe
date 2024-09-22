<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Categories</h2>

      <div class="mt-6 overflow-x-auto scroll-hidden ms-overflow-hidden">
        <div class="flex space-x-6">
          <div v-for="category in categories" :key="category.category_id" class="group relative min-w-[250px]">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img :src="category.category_image" :alt="category.category_name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-base font-semibold text-gray-800">
                  <a>
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ category.category_name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">Explore options</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ category.category_count }} items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchWithAuth } from '@/utility/auth' // Assuming the function is in a utils folder

const categories = ref([])

const fetchCategories = async () => {
  try {
    const response = await fetchWithAuth('https://localhost:8080/categories') // Replace with your actual API endpoint
    categories.value = response
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
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
  overflow: -ms-hidden; /* IE and Edge */
}

/* Hide scrollbar for Firefox */
.scroll-hidden {
  scrollbar-width: none; /* Firefox */
}

/* Optional: Custom scrollbar styles (if needed) */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>
