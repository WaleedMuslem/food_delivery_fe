<script setup>
import { ref, onMounted } from 'vue';

const headlines = ref([
  "Discover and get great food.",
  "Order from top restaurants.",
  "Fast delivery at your doorstep.",
]);

const displayedText = ref([]);
const currentIndex = ref(0);
const typingSpeed = 70; // Time delay between each letter (in milliseconds)
const pauseBetweenHeadlines = 2000; // Pause before switching headlines

// Function to type out the current headline
function typeHeadline() {
  const currentHeadline = headlines.value[currentIndex.value].split('');
  displayedText.value = [];

  let charIndex = 0;

  const typeInterval = setInterval(() => {
    if (charIndex < currentHeadline.length) {
      displayedText.value.push(currentHeadline[charIndex]);
      charIndex++;
    } else {
      clearInterval(typeInterval); // Stop typing when finished
      setTimeout(deleteHeadline, pauseBetweenHeadlines); // Start deleting after pause
    }
  }, typingSpeed); // Typing speed in milliseconds
}

// Function to delete the current headline
function deleteHeadline() {
  const deleteInterval = setInterval(() => {
    if (displayedText.value.length > 0) {
      displayedText.value.pop(); // Remove last letter
    } else {
      clearInterval(deleteInterval); // Stop deleting when finished
      currentIndex.value = (currentIndex.value + 1) % headlines.value.length; // Switch to the next headline
      setTimeout(typeHeadline, typingSpeed); // Start typing the next headline after a short delay
    }
  }, typingSpeed); // Deleting speed
}

onMounted(() => {
  typeHeadline(); // Start typing on page load
});
</script>

<template>
    <div class="landing">
      <div class="container mx-auto">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="headline-container" style="min-height: 80px;">
              <h1 class="landing-title">
                <span v-for="(char, index) in displayedText" :key="index">
                  <span v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: typingSpeed * index } }">
                    {{ char }}
                  </span>
                </span>
              </h1>
            </div>
            <router-link :to="{name: 'order'}">
            <!-- <button class="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-blue-400 w-full sm:w-auto">
              Order Now
            </button> -->
            <button class="mt-5 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600">
                Order Now
            </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  
  
  
  
  

  <style scoped>
  .landing {
      height: 70vh;
      background: url('../assets/landing.jpg') no-repeat right center/cover;
      display: flex;
      align-items: center;
  }
  
  .landing-title {
      color: rgb(0, 0, 0);
      font-size: 3rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgb(30,185,240);
      transition: opacity 0.5s ease-in-out;
  }
  
  /* You can remove the order-button styles here */
  </style>
  