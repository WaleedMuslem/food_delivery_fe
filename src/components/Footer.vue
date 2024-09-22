<template>
    <footer class="bg-gray-900 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Column 1: Logo -->
          <div class="flex items-center mb-6 lg:col-span-1">
            <img :src="logo" alt="Company Logo" class="h-20 mr-4" />
            <h1 class="text-2xl font-semibold"></h1>
          </div>
  
          <!-- Column 2: Company Mission -->
          <div class="ml-6">
            <h3 class="text-xl font-semibold mb-4">Our Mission</h3>
            <p class="text-sm">
              Delivering the best quality food right to your door with utmost convenience.
            </p>
          </div>
  
          <!-- Column 3: Quick Links -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-blue-400">Home</a></li>
              <li><a href="#" class="hover:text-blue-400">Menu</a></li>
              <li><a href="#" class="hover:text-blue-400">About Us</a></li>
              <li><a href="#" class="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
  
          <!-- Column 4: Resources -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Resources</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-blue-400">Blog</a></li>
              <li><a href="#" class="hover:text-blue-400">FAQs</a></li>
              <li><a href="#" class="hover:text-blue-400">Help Center</a></li>
              <li><a href="#" class="hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
  
          <!-- Column 5: Contact Info -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
            <ul class="space-y-2 text-sm">
              <li>Email: <a href="mailto:info@fooddelivery.com" class="hover:text-blue-400">info@waleeddelivery.com</a></li>
              <li>Phone: <a href="tel:+123456789" class="hover:text-blue-400">+123 456 789</a></li>
              <li>Address: 123 Main St, Budapest, 1215</li>
            </ul>
          </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="mt-8 text-center text-sm text-gray-400">
          © 2024 Waleed Delivery. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import logo from '@/assets/logo.png'
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>
  