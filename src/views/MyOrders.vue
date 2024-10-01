<script setup>
import { ref, onMounted } from 'vue';
import { fetchWithAuth } from '@/utility/auth';

// Define a reactive variable to store the orders
const orders = ref([]);

// Fetch the orders when the component is mounted
const fetchOrders = async () => {
  try {
    const response = await fetchWithAuth('https://localhost:443/api/orders'); // Adjust the API endpoint accordingly
    orders.value = response; // Store the orders in the reactive variable
    orders.value.sort((a, b) => b.order_id - a.order_id);
    console.log(orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
};

// Function to format the date and time
const formatDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date.toLocaleString())
      return date.toLocaleString();
};

// Fetch the orders when the component is mounted
onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Orders</h2>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items Ordered</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the orders and display them -->
          <tr v-for="order in orders" :key="order.order_id">
            <td>#{{ order.order_id }}</td>
            <td>{{  formatDate(order.created_at) }}</td>
            <td>
              <!-- Join product names to display as a comma-separated list -->
              {{ order.products.map(product => product.product_name).join(', ') }}
            </td>
            <td>${{ order.total_amount.toFixed(2) }}</td>
            <td>
              <span
                :class="{
                  'badge bg-success': order.status === 'Delivered',
                  'badge bg-warning': order.status === 'Pending',
                  'badge bg-danger': order.status === 'Cancelled'
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td>
                <router-link :to="{name:'orderdetails', params: { orderId: order.order_id }}">
                     <a class="btn btn-primary">details</a>
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
