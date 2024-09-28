<template>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded" role="alert">
        <p>{{ errorMessage }}</p>
      </div>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h2 class="text-xl font-bold mb-4 text-center">Enter Your Address</h2>
        <form @submit.prevent="handleSubmit">

          <div class="mb-4">
            <label for="street" class="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              v-model="formData.street"
              id="street"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <input
              v-model="formData.city"
              id="city"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="mb-4">
            <label for="zip" class="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              v-model="formData.zip"
              id="zip"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="floor" class="block text-sm font-medium text-gray-700">Floor</label>
            <input
              v-model="formData.floor"
              id="floor"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="flat" class="block text-sm font-medium text-gray-700">Apartment</label>
            <input
              v-model="formData.apartment"
              id="apartment"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <router-link :to="{name:'checkout'}"></router-link>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p v-if="errorMessage" class="mt-2 text-red-500 text-center">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { fetchWithAuth } from '@/utility/auth';
  
  // Reactive form data
  const formData = ref({
    floor: '',
    apartment: '',
    street: '',
    city: '',
    zip_code: ''
  })
  
  // Reactive error message
  const errorMessage = ref('')
  
  // Initialize the router
  const router = useRouter()
  
  // Function to handle form submission
  const handleSubmit = async () => {

    errorMessage.value = '' // Clear the error message
  
    try {
      const response = await fetchWithAuth('https://localhost:8080/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      })
  
      if (!response.ok) {

      }
  
      errorMessage.value = '' // Clear the error message on success
      router.push({ name: 'checkout' }) // Replace 'nextPage' with the name of the page to navigate to after submission
  
    } catch (error) {
      console.error('Error:', error)
      errorMessage.value = error.message || 'An error occurred while submitting the address.'
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  