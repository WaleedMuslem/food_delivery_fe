<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchWithAuth } from '@/utility/auth';

// Get the orderId from the route
const route = useRoute();
const orderId = route.params.orderId;

// Reactive state to store the order details
const order = ref(null);
const address = ref(null)


// Fetch the order details from the backend
const fetchOrderDetails = async () => {
  try {
    const response = await fetchWithAuth(`https://localhost:8080/orders/${orderId}`); // Adjust the API endpoint accordingly
    order.value = response; // Store the order details in the reactive variable
    console.log(order)
  } catch (error) {
    console.error('Failed to fetch order details:', error);
  }
};
const fetchAddressAndCart = async () => {
    try {
      // Fetch address
      const addressResponse = await fetchWithAuth('https://localhost:8080/address', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        address.value = addressResponse;

    } catch (error) {
        console.log(error)
    }
  }

// Fetch the order details when the component is mounted
onMounted(() => {
  fetchOrderDetails();
  fetchAddressAndCart();
});
</script>

<template>
  <div class="container mt-5" style="margin-bottom: 40rem;" v-if="order">
    <h2 class="mb-4">Order Details</h2>
    <div class="card">
      <div class="card-header">
        Order #{{ order[0].order_id }}
      </div>
      <div class="card-body">
        <h5 class="card-title">Order Date: {{ order[0].created_at }}</h5>
        <p class="card-text"><strong>Status:</strong>
          <span :class="{
            'badge bg-success': order[0].status === 'Delivered',
            'badge bg-warning': order[0].status === 'Pending',
            'badge bg-danger': order[0].status === 'Cancelled'
          }">
            {{ order[0].status }}
          </span>
        </p>

        <h5 class="mt-4">Items Ordered</h5>
        <ul class="list-group mb-4">
          <li
            v-for="product in order[0].products"
            :key="product.product_id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ product.product_name }}
            <span>${{ product.total_price.toFixed(2) }}</span>
          </li>
        </ul>

        <h5 class="mt-4">Delivery Address</h5>
        <p>{{ address.street }}</p>


        <h5 class="mt-4">Order Summary</h5>
        <table class="table table-bordered">
          <!-- <tr>
            <th>Subtotal</th>
            <td>${{ order.subtotal }}</td>
          </tr>
          <tr>
            <th>Tax</th> -->
            <!-- <td>${{ order }}</td> -->
          <!-- </tr> -->
          <tr>
            <th>Total</th>
            <td>${{ order[0].total_amount }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles */
</style>
