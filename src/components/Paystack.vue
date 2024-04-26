<template>
  <div>
    <button
      @click="initializePayment"
      class="h-[50px] w-[100%] rounded-none lg:w-[100%] bg-[#2c6335] text-white font-normal py-2 px-7 lg:rounded mt-10 mb-5"
    >
      Checkout {{ computedSubtotal }}
    </button>
  </div>
</template>

<script>
import { useStore } from "@/stores/store";
export default {
  props: {
    amount: {
      type: Number,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    initializePayment() {
      if (typeof window.PaystackPop !== "undefined") {
        const handler = window.PaystackPop.setup({
          key: "pk_test_45bea0e6f89e6dca5b5776a0715d360a3e72f1ee",
          email: "shrewdkenny@gmail.com",
          amount: this.amount * 100,
          currency: "NGN",
          callback: (response) => this.handlePaymentResponse(response),
          onClose: () => this.handleClose(),
        });

        if (handler.openIframe instanceof Function) {
          try {
            handler.openIframe();
          } catch (err) {}
        } else {
        }
      } else {
        console.error("Paystack SDK not loaded");
      }
    },

    handlePaymentResponse(response) {
      if (response && response.status === "success") {
        const store = useStore();
        store.cartItem = [];
        store.count = 0;
        store.closeCartModal();
      }
      this.callback(response);
    },
    handleClose() {},
  },
  computed: {
    computedSubtotal() {
      const store = useStore();
      return store.cartSubTotal;
    },
  },
};
</script>
