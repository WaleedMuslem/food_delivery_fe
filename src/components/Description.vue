<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7" :style="{ color: 'rgb(64, 196, 245)' }">Fast & Fresh Delivery</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Delivering Freshness to Your Doorstep</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">Enjoy a seamless food delivery experience with a variety of cuisines, fast delivery, and fresh ingredients, right to your home. Quality guaranteed, every time.</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div v-for="feature in features" :key="feature.name" class="relative pl-16">
              <dt class="text-base font-semibold leading-7 text-gray-900">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg" :style="{ backgroundColor: 'rgb(64, 196, 245)' }">
                  <img :src="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import TruckIcon from '@/assets/TruckIcon.png'
  import ClockIcon from '@/assets/ClockIcon.jpg'
  import ShieldCheckIcon from '@/assets/ShieldCheckIcon.jpg'
  import StarIcon from '@/assets/StarIcon.jpg'


//   import { TruckIcon, ClockIcon, ShieldCheckIcon, StarIcon } from '@heroicons/vue/24/outline'
  
  const features = [
    {
      name: 'Fast Delivery',
      description: 'Your food is delivered quickly while maintaining the freshness and quality you expect.',
      icon: TruckIcon,
    },
    {
      name: 'Timely Service',
      description: 'Order tracking ensures you know exactly when your meal will arrive, on time, every time.',
      icon: ClockIcon,
    },
    {
      name: 'Safe Packaging',
      description: 'Our packaging keeps your food secure, so it reaches you in perfect condition.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Top Rated Chefs',
      description: 'We partner with top-rated chefs to bring gourmet dishes to your door.',
      icon: StarIcon,
    },
  ]
  </script>
  