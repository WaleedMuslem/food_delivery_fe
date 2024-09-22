<script setup>
import { ref } from 'vue'
import loginBackground from '../assets/loginBackground.jpg' // Import the background image
import { useRouter } from 'vue-router'


// Reactive form data
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: ''
})

// Initialize the router
const router = useRouter()

// Reactive error message
const errorMessage = ref('')

// Function to handle form submission
const handleSubmit = async () => {
  try {
    const response = await fetch('https://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    if (!response.ok) {
      const errorData = await response.text()

      // console.log("here : ",errorData)
      errorMessage.value = errorData || 'Failed to sign up. Please try again.' // Set the error message
      return
    }

    errorMessage.value = '' // Clear the error message on success


    router.push({ name: 'login'})


  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = error
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-cover bg-center" :style="{ backgroundImage: `url(${loginBackground})` }">
    <div class="border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-4xl bg-white">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Sign Up</h2>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded" role="alert">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <input
              v-model="formData.first_name"
              type="text"
              id="first-name"
              autocomplete="given-name"
              class="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <input
              v-model="formData.last_name"
              type="text"
              id="last-name"
              autocomplete="family-name"
              class="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              v-model="formData.email"
              type="email"
              id="email"
              autocomplete="email"
              class="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>Log in


        <div class="sm:col-span-4">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input
              v-model="formData.password"
              type="password"
              id="password"
              autocomplete="password"
              class="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
          <div class="mt-2">
            <input
              v-model="formData.phone"
              type="tel"
              id="phone"
              autocomplete="tel"
              placeholder="123-456-7890"
              class="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div class="mt-10 flex justify-start items-center">
        <button
          @click="handleSubmit"
          type="button"
          class="inline-flex items-center px-4 py-2 bg-primeColor-900 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 mr-3"
        >
          Sign Up
        </button>
        <router-link :to="{ name: 'login'}">
           <a class=" hover:text-indigo-800 text-sm" style="text-decoration: none;">Already have an account?</a>
          </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
