<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { useAuthStore } from '@/utility/auth';
  import userIcon from '@/assets/userIcon.png'
  import router from '@/router/router';
  import eventBus from '@/utility/cart';

function openCart() {
  eventBus.openCart.value = true;
}
  // import Cart from '@/views/Cart.vue';

  // import { onMounted } from 'vue';
  // import { isLoggedin, getAccessToken } from '@/utility/auth';
  // import { useRouter } from 'vue-router'

  // const router = useRouter()
  const authStore = useAuthStore();
  // console.log(authStore.isAuthenticated)


  const navigation = [
    { name: 'Log in', href: '/login', current: true },
    { name: 'Sign up', href: '/sginup', current: false },
  ]


  // Logout method using fetch
  const logout = async () => {
   try {
    // Sending a POST request to your backend server's logout route
    const response = await fetch('https://localhost:8080/logout', {
      method: 'GET', // or 'GET' depending on your backend implementation
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        'Authorization': `Bearer ${authStore.accessToken}`, // Include the access token
      },
      credentials: 'include', // To send cookies with the request
    });

    if (!response.ok) {
      if(response.status == 401){
        console.log("you are not authorized")
      }
      console.log("fk eeror")
      // If the response status is not in the 200-299 range, throw an error
    }

    // Update your auth state
    authStore.logout()
    // authStore.setLoggedIn(false); 
    // authStore.setAccessToken(null)

    // console.log(authStore.accessToken)
    // console.log(authStore.isLoggedIn)


    location.reload();
    router.push({ name: 'home'})
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>

<template>
    <Disclosure as="nav" class="bg-gray-100" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primeColor-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <router-link :to="{name:'home'}">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-16 w-auto" src="../assets/logo.png" alt="Waleed" />
            </div>
          </router-link>
            <!-- <div class="hidden sm:ml-6 sm:block mt-1.5">
            <div class="flex items-center space-x-8">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ?  'text-black-300 hover:bg-primeColor-900 hover:text-white': 'text-black-300 hover:bg-primeColor-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium self-end mt-2']" :aria-current="item.current ? 'page' : undefined" style="text-decoration: none">
                  {{ item.name }}
                </a>
            </div>
            </div> -->
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div class="hidden sm:ml-6 sm:block mb-2">
            <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-8">
              <router-link v-for="item in navigation" :key="item.name" :to="{ path: item.href}" :class="[item.current ?  'text-black-300 hover:bg-primeColor-900 hover:text-white': 'text-black-300 hover:bg-primeColor-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium self-end mt-2']" :aria-current="item.current ? 'page' : undefined" style="text-decoration: none">
                <a>
                  {{ item.name }}
                </a>
              </router-link>
            </div>
            </div>
            
            <!-- Profile dropdown -->
            <Menu v-if="authStore.isAuthenticated" as="div" class="relative ml-3">
              <div>
                <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="userIcon" alt="" />
                </MenuButton>
              </div>
              
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'text-black-300 hover:bg-primeColor-900 hover:text-white' : '', 'block px-4 py-2 text-sm text-gray-700']" style="text-decoration: none;">Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link :to="{name:'myorders'}" style="text-decoration: none;">
                        <a href="#" :class="[active ? 'text-black-300 hover:bg-primeColor-900 hover:text-white' : '', 'block px-4 py-2 text-sm text-gray-700']" style="text-decoration: none;">My Orders</a>
                      </router-link>
                    </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" @click.prevent="logout" :class="[active ? 'text-black-300 hover:bg-primeColor-900 hover:text-white' : '', 'block px-4 py-2 text-sm text-gray-700']" style="text-decoration: none;">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <div v-if="authStore.isAuthenticated" @click="openCart" class="inline-flex items-center cursor-pointer ml-4">
                <img 
                  src="@/assets/cart-icon.png" 
                  alt="Cart Logo" 
                  class="h-8 w-8" 
                />
              </div>

          </div>
        </div>
      </div>
      
  
      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ?  'text-black-300 hover:bg-primeColor-900 hover:text-white': 'text-black-300 hover:bg-primeColor-900 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined" style="text-decoration: none">{{ item.name }}</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
    

  </template>
  
