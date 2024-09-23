<script setup>
import NavBar from './components/NavBar1.vue';
import Cart from './views/Cart.vue';
// import {getAccessToken, isLoggedin, setAccessToken, setLoggedin } from '@/utility/auth'; // Adjust the path as needed

</script>

<template>

<NavBar/>
<Cart/>


  <router-view/>

</template>

<style>

</style>
