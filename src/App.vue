<script setup>
import NavBar from './components/NavBar1.vue';
import Cart from './views/Cart.vue';
import { useAuthStore } from './utility/auth';

const authStore = useAuthStore()
</script>

<template>

<NavBar/>
<Cart v-if="authStore.isAuthenticated"/>


  <router-view/>

</template>

<style>

</style>
