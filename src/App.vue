<script setup>
import Scrol from './components/Scrol.vue';
import NavBar from './components/NavBar1.vue';
// import {getAccessToken, isLoggedin, setAccessToken, setLoggedin } from '@/utility/auth'; // Adjust the path as needed

</script>

<template>

<NavBar/>

  <!-- <Scrol/> -->
  <router-view/>

</template>

<style>

</style>
