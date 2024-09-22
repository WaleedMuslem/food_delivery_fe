

 <script setup>
import { ref } from 'vue'
// import {getAccessToken, isLoggedin, setAccessToken, setLoggedin } from '@/utility/auth'; // Adjust the path as needed
import loginBackground from '../assets/loginBackground.jpg' // Import the background image
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/utility/auth';



// Reactive form data
const formData = ref({
  email: '',
  password: ''
})

const router = useRouter()
const authStore = useAuthStore();



// Reactive error message
const errorMessage = ref('')

// Function to handle form submission
const handleSubmit = async () => {
  try {
    const response = await fetch('https://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    if (!response.ok) {
      const errorData = await response.text()

      // console.log("here : ",errorData)
      errorMessage.value = errorData || 'Failed to log in. Please try again.' // Set the error message
      return
    }

    const loginData = await response.json();
    authStore.setAccessToken(loginData.access_token)
    authStore.setLoggedIn(true); 
    console.log(authStore.getAccessToken); // Log the stored token

    // setAccessToken(loginData.access_token);
    // setLoggedin()
    // console.log(isLoggedin())
    // console.log(getAccessToken())
    // console.log('Success:', loginData)
    errorMessage.value = '' // Clear the error message on success
    router.push({ name: 'home'})
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = error
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-cover bg-center" :style="{ backgroundImage: `url(${loginBackground})` }">
    <div class="border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-4xl bg-white">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Log in</h2>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded" role="alert">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        

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
        </div>

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
      </div>

      <div class="mt-10 flex justify-start items-center">
        <button
          @click="handleSubmit"
          type="button"
          class="inline-flex items-center px-4 py-2 bg-primeColor-900 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 mr-3"
        >
          Log in
        </button>
        <router-link :to="{ name: 'sginup'}">
            <a class=" hover:text-indigo-800 text-sm" style="text-decoration: none;">Don't have an account?</a>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
