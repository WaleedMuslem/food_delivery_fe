import { defineStore } from 'pinia';

export const availableStore = defineStore('availableStore', {
  state: () => ({
    isClosed: false,
  }),
  actions: {
    setClose(status) {
      this.isClosed = status; // This is correct.
    }
  },
  getters: {
    // You can simply keep this as it is if you need to access the isClosed state through a getter
    getIsClosed: (state) => state.isClosed,
  },
});
