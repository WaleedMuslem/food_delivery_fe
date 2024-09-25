// stores/auth.js
import router from '@/router/router';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    isLoggedIn: false,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setLoggedIn(status) {
      this.isLoggedIn = status;
    },
    logout() {
      this.accessToken = null;
      this.isLoggedIn = false;
    }
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    isAuthenticated: (state) => state.isLoggedIn,
  },
  persist: {
    enabled: true, // Enable persistence
    strategies: [
      {
        key: 'auth',
        storage: sessionStorage,
      },
    ],
  },
});

// Function to refresh the access token
// export async function refreshAccessToken() {
//   try {
//       const response = await fetch('https://localhost:8080/refresh', {
//           method: 'POST',
//           credentials: 'include', // Ensure cookies are included in the request
//       });

//       if (response.status == 401) {
//         router.push({name:'login'})
//       }
//       const data = await response.json();

//       // Access Pinia store and set the new access token
//       const authStore = useAuthStore();
//       authStore.setAccessToken(data.accessToken);
//   } catch (error) {
//       console.error('Failed to refresh access token', error);
//       throw error;
//   }
// }

export async function refreshAccessToken() {
  try {
    const response = await fetch('https://localhost:8080/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push({ name: 'login' });  // Redirect to login
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();

    // Access Pinia store and set the new access token
    const authStore = useAuthStore();
    authStore.setAccessToken(data.accessToken);

  } catch (error) {
    console.error('Failed to refresh access token', error);
    const authStore = useAuthStore();
    authStore.logout();
    router.push({ name: 'login' });  // Ensure redirect if an error occurs
    throw error;
  }
}


// Function to make authenticated requests
export async function fetchWithAuth(url, options = {}) {
  const authStore = useAuthStore();
  const token = authStore.getAccessToken;
  console.log(token)
  const headers = {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : undefined,
  };


  try {
      const response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include', // Ensure cookies are included in the request
      });

      if (response.status === 401) {
          // Token may be expired, attempt to refresh it
          await refreshAccessToken();

          // Retry the request with the new access token
          return fetch(url, {
              ...options,
              headers: {
                  ...headers,
                  'Authorization': `Bearer ${authStore.getAccessToken()}`,
              },
              credentials: 'include',
          });
      }

      if (!response.ok) {
          throw new Error('Request failed');
      }

      if (response.headers.get('content-length') !== '0') {
        return response.json();
    } else {
      return response;

    }

  } catch (error) {
      console.error('Fetch failed', error);
      throw error;
  }
}
