<script setup>
</script>

<template>
  <div class="spacer"></div>
  <div class="scroller relative">
    <!-- Mask and SVG Path -->
    <div class="mask">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        direction="ltr"
        width="1170.3420917895942"
        height="563.4353875975255"
        viewBox="2.4520409461004533 -147.91825503096914 1170.3420917895942 563.4353875975255"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- SVG Path -->
        <path
          d="M0,0 Q39.0828,-8.5215 70.8766,-12.1781 T140.9222,-18.3346 219.6787,-22.2333 301.6083,-24.2267..."
          stroke-linecap="round"
          fill="none"
          pointer-events="all"
          stroke="black"
        />
      </svg>
    </div>

    <!-- Background Image -->
    <div class="image">
      <img src="../assets/landing.jpg" alt="Your Image" />
    </div>

    <!-- Text and Shapes -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <!-- Headline -->
      <div class="text-center space-y-6">
        <h1 class="text-4xl md:text-6xl font-bold text-blue-500">
          Fast & Fresh Food Delivery
        </h1>
        <p class="text-lg text-gray-700 max-w-lg mx-auto">
          Get your favorite meals delivered at your doorstep, hot and fresh. 
        </p>
        <!-- Call-to-Action Button -->
        <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600">
          Order Now
        </button>
      </div>
    </div>

    <!-- Decorative Shapes -->
    <div class="absolute top-10 right-10 w-20 h-20 bg-blue-500 opacity-50 rounded-full z-0"></div>
    <div class="absolute bottom-16 left-16 w-32 h-32 bg-white opacity-30 rounded-full z-0"></div>
  </div>
  <div class="spacer"></div>
</template>

<style scoped>
.scroller {
  display: grid;
}
.scroller > * {
  grid-area: 1 / 1;
  width: 100%;
}

.mask {
  z-index: 2;
  mix-blend-mode: lighten;
  background: white;
}

img, svg {
  width: 100%;
  height: 100%;
}

path {
  stroke-width: 100;
  stroke-dasharray: 5700;
  stroke-dashoffset: 5700;
  animation: draw 3s linear forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.spacer {
  height: 90vh;
}
</style>
