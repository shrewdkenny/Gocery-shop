import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("Store", {
  state: () => ({
    modal: false,
    cartModal: false,
    BrowseCategory: false,
    quantity: 1,
    cartItem: [],
    count: 0,
    profileModal: false,
  }),
  actions: {
    openProfileModal() {
      this.profileModal = !this.profileModal;
    },
    openBrowseCategory() {
      this.BrowseCategory = !this.BrowseCategory;
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },

    openCartModal() {
      this.cartModal = true;
    },
    closeCartModal() {
      this.cartModal = false;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity <= 1) {
        return null;
      } else {
        this.quantity--;
      }
    },
    addToCart(item) {
      this.cartItem.push(item);
      this.count++;
    },
    resetQty() {
      this.quantity = 1;
    },
    removeFromCart(itemId) {
      this.cartItem = this.cartItem.filter((item) => item.id !== itemId);
      this.count--;
    },
  },
  computed: {
    cartSubTotal() {
      return this.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});
