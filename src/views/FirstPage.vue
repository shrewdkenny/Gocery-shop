<template>
  <NavBar />
  <div class="body lg:px-10 px-4 sm:relative">
    <!-- Cart -->
    <div
      v-if="cartModalState"
      @click="handleClosingOfCartModal"
      class="fixed z-10 inset-0 bg-black overflow-y-auto bg-opacity-75 flex justify-end cursor-pointer"
    >
      <div
        class="bg-white px-4 py-6 w-[100%] lg:w-[25%] max-h-[100vh] flex flex-col"
        @click.stop
      >
        <div class="flex bg-[#2c6335] justify-between px-2">
          <h1 class="text-white p-2 font-extrabold text-xl">My Cart</h1>
          <div @click="handleClosingOfCartModal" class="text-4xl text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        <!--products coming from modal -->
        <div class="flex flex-col mt-2 overflow-y-auto">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-10 items-center p-2 mb-5"
          >
            <img
              :src="`https://backendgrocery.000webhostapp.com${item.images}`"
              alt=""
              class="w-20 h-20 border"
            />
            <div class="w-2/3">
              <h1 class="font-extrabold text-[15px] tracking-tight">
                {{ item.name }}
              </h1>
              <p class="text-gray-500 font-semibold text-xs">
                Quantity: {{ item.quantity }}
              </p>
              <p class="text-gray-500 font-extrabold text-xl">
                {{ item.totalPrice }}
              </p>
            </div>
            <button @click="removeFromCart(item.id)" class="w-1/3 text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- products coming from modal end -->

        <div class="flex flex-col">
          <div class="flex justify-between font-extrabold text-xl">
            <h1>Subtotal</h1>
            ₦{{ cartSubTotal }}
          </div>
        </div>
        <Paystack
          :amount="Number(cartSubTotal)"
          :embed="true"
          :callback="handlePaymentCallback"
          :close="handleClose"
          :cart-subtotal="cartSubTotal"
        />
      </div>
    </div>
    <div class="mt-5 lg:mt-5 flex justify-center lg:gap-4">
      <div
        class="flex justify-between bg-cover bg-center w-[100%] h-[25vh] lg:h-[50vh] px-2 items-center cursor-pointer"
        :style="{ 'background-image': 'url(' + currentImage + ')' }"
      >
        <div class="text-white text-3xl" @click="imageSlideForward">
          <i class="fa-solid fa-circle-arrow-left"></i>
        </div>
        <div class="text-white text-3xl" @click="imageSlideForward">
          <i class="fa-solid fa-circle-arrow-right"></i>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h1 class="text-2xl text-[#4ca44b] font-extrabold">Shop by Category</h1>
    </div>

    <!-- Shop By Category -->

    <div
      class="grid grid-cols-3 lg:flex lg:flex-row mt-3 justify-between gap-4"
    >
      <Category @category-selected="navigateToCategoryLink" />
    </div>

    <!-- Our Popular Products -->

    <h1 class="text-2xl text-[#4ca44b] font-extrabold mt-10">
      Our Popular Products
    </h1>
    <div
      class="grid grid-cols-1 gap-3 justify-between lg:flex lg:flex-wrap lg:gap-5 mt-5"
    >
      <div
        v-for="popularProduct in popularProducts"
        :key="popularProduct.id"
        class="border flex flex-col lg:gap-5 gap-2 items-center lg:h-[350px] lg:w-[300px] py-4 lg:py-1 rounded-xl hover:transition-transform hover:scale-105 hover:ease-in-out hover:duration-300 hover:shadow-lg shadow-black"
      >
        <img
          :src="`https://backendgrocery.000webhostapp.com${popularProduct.images}`"
          alt=""
          class="w-[150px] h-[150px] lg:mt-5"
        />
        <h1 class="font-extrabold text-sm lg:text-lg flex text-center">
          {{ popularProduct.name }}
        </h1>
        <div class="flex gap-5">
          <h2 class="font-bold">₦{{ popularProduct.selling_price }}</h2>
          <h3 class="text-gray-500 font-semibold line-through">
            ₦{{ popularProduct.mrp }}
          </h3>
        </div>

        <button
          @click="handleModalOpening(popularProduct)"
          class="border border-gray-200 p-3 rounded-lg text-[#2c6335] text-sm font-bold"
        >
          Add to cart
        </button>
      </div>
    </div>

    <!-- We Deliver Image -->
    <img src="https://online-grocery-store-web.vercel.app/banner.png" alt="" />

    <!-- Footer -->
    <Footer />
  </div>

  <!-- MODAL -->
  <div
    @click="closeModal"
    v-if="modalState"
    class="fixed z-10 inset-0 bg-black bg-opacity-75 flex justify-center items-center cursor-pointer"
  >
    <div
      @click.stop
      class="w-full h-[100%] bg-white rounded-lg flex flex-row lg:h-[400px] lg:w-[55%] px-2"
    >
      <div class="flex flex-col lg:flex-row lg:gap-5 lg:w-[100%]">
        <div
          class="bg-[#e2e8f0] rounded-lg w-[320px] flex items-center justify-center my-4 mt-20 lg:mt-10 mx-5 lg:my-5"
        >
          <img
            :src="`https://backendgrocery.000webhostapp.com${selectedProduct.images}`"
            alt=""
          />
        </div>

        <div class="flex flex-col gap-1 lg:my-10 justify-center items-center">
          <h1 class="font-extrabold text-2xl lg:text-xl">
            {{ selectedProduct.name }}
          </h1>
          <p class="text-lg lg:text-sm text-[#868c97]">
            {{ selectedProduct.description }}
          </p>
          <div class="flex gap-2 mt-3">
            <h2 class="font-extrabold text-4xl lg:text-2xl tracking-tight">
              ₦{{ selectedProduct.selling_price }}
            </h2>
            <h3
              class="text-gray-500 text-3xl lg:text-2xl font-extrabold line-through tracking-tight flex items-center"
            >
              ₦{{ selectedProduct.mrp }}
            </h3>
          </div>
          <div class="flex gap-3 mt-7">
            <div class="border flex gap-8 px-3 items-center">
              <div class="" @click="handleDecreaseQty">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </div>
              <h1 class="">{{ stateOfQuantity }}</h1>
              <div @click="handleIncreaseQty">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
            <h1 class="font-extrabold text-3xl">=</h1>
            <h2 class="flex text-xl font-bold items-center">
              {{ calculateSubtotal() }}
            </h2>
          </div>
          <button
            class="bg-[#2c6335] lg:w-[100%] w-[62%] mt-2 py-2 rounded-md text-white"
            @click="addToCart"
          >
            add to cart
          </button>
          <p class="mt-3">Category: {{ selectedProduct.category.name }}</p>
        </div>
        <div
          class="text-gray-500 text-lg lg:ml-[137px] lg:relative mt-1 absolute right-2"
          @click="closeModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/stores/store";
import Footer from "../components/Footer.vue";
import Category from "../components/Category.vue";
import NavBar from "../Layout/NavBar.vue";
import Paystack from "../components/Paystack.vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";

export default {
  name: "Test",
  components: {
    Footer,
    Category,
    NavBar,
    Paystack,
  },
  data() {
    return {
      images: [
        "https://res.cloudinary.com/dvytn4u6i/image/upload/v1710679727/vegetable_grocery_facebook_cover_design_template_354609_59_transformed_1_b981bd8a32.png",
        "https://res.cloudinary.com/dvytn4u6i/image/upload/v1710680061/flat_design_supermarket_sale_facebook_cover_23_2149362989_bc1b508301.jpg",
      ],
      currentImageIndex: 0,
      slideShow: null,
      popularProducts: [],
      selectedProduct: null,
      cartItems: [],
    };
  },
  methods: {
    navigateToCategoryLink(category) {
      this.$router.push({
        name: "CategoryLink",
        params: { categoryId: category.id },
        query: { categoryName: category.name },
      });
    },

    async getPopularProducts() {
      await fetch("https://backendgrocery.000webhostapp.com/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
          this.popularProducts = data.data;
        })
        .catch((error) => {
          console.log("error fetching popular products", error);
        });
    },
    async modalDetails() {
      await fetch("https://backendgrocery.000webhostapp.com/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
          this.selectedProduct = data.data;
        })
        .catch((error) => {
          console.log("error fetching product details", error);
        });
    },

    imageSlideForward() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
    imageSlideBackward() {
      if (this.currentImageIndex) {
        return (this.currentImageIndex =
          (this.currentImageIndex - 1) % this.images.length);
      }
    },
    startSlideShow() {
      this.slideShow = setInterval(() => {
        this.imageSlideForward();
      }, 3000);
    },
    handleModalOpening(product) {
      const store = useStore();
      this.selectedProduct = product;
      store.openModal();
    },
    closeModal() {
      const store = useStore();
      store.closeModal();
    },
    handleClosingOfCartModal() {
      const store = useStore();
      store.closeCartModal();
    },
    handleIncreaseQty() {
      const store = useStore();
      store.increaseQuantity();
    },
    handleDecreaseQty() {
      const store = useStore();
      store.decreaseQuantity();
    },
    calculateSubtotal() {
      const store = useStore();
      const { selling_price } = this.selectedProduct;
      const subtotal = selling_price * store.quantity;
      return `₦${subtotal.toFixed(2)}`;
    },

    addToCart() {
      const store = useStore();
      const { id, name, selling_price, images } = this.selectedProduct;
      const totalPrice = this.calculateSubtotal();
      store.addToCart({
        id,
        name,
        price: selling_price,
        totalPrice: totalPrice,
        images,
        quantity: store.quantity,
      });
      store.resetQty();
      this.closeModal();
    },
    removeFromCart(itemId) {
      const store = useStore();
      store.removeFromCart(itemId);
    },
    handlePaymentResponse(response) {
      console.log("Payment response:", response);
    },
    handlePaymentCallback(response) {
      console.log("Payment callback:", response);
    },
    handleClose() {
      console.log("closed");
    },
  },
  mounted() {
    this.getPopularProducts();
    this.startSlideShow();
    this.modalDetails();
  },
  computed: {
    cartModalState() {
      const store = useStore();
      this.cartItems = store.cartItem;
      return store.cartModal;
    },
    modalState() {
      const store = useStore();
      return store.modal;
    },
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    stateOfQuantity() {
      const store = useStore();
      return store.quantity;
    },
    cartSubTotal() {
      let subtotal = 0;
      for (const item of this.cartItems) {
        subtotal += item.price * item.quantity;
      }

      return subtotal.toFixed(2);
    },
  },
};
</script>
