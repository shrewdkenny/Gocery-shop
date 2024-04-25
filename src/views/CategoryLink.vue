<template>
  <NavBar />
  <div class="h-full">
    <div class="bg-[#398058]">
      <h1 class="text-white font-bold text-2xl p-5 flex justify-center">
        {{ selectedCategory ? selectedCategory.name : "Category Name" }}
      </h1>
    </div>
    <div
      class="flex flex-row mt-5 px-2 lg:px-28 lg:gap-5 gap-2 md:max-w-[100vw] overflow-x-auto"
    >
      <Category @category-selected="updatePopularProducts" />
    </div>

    <!-- Our popular products -->
    <div class="flex flex-col lg:px-10 px-5">
      <h1 class="text-2xl text-[#4ca44b] font-extrabold mt-20">
        Our Popular Products
      </h1>

      <div class="grid grid-cols-2 lg:flex lg:flex-wrap gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="mt-5 border flex flex-col lg:gap-5 gap-2 items-center lg:h-[350px] lg:w-[300px] py-1 px-2 rounded-xl hover:transition-transform hover:scale-105 hover:ease-in-out hover:duration-300 hover:shadow-lg shadow-black"
        >
          <img
            :src="`https://backendgrocery.000webhostapp.com${product.images}`"
            alt=""
            class="w-[150px] h-[150px] mt-5"
          />
          <h1 class="font-extrabold text-sm lg:text-lg flex text-center">
            {{ product.name }}
          </h1>
          <h2 class="font-bold">${{ product.selling_price }}</h2>
          <button
            class="border border-gray-200 p-3 rounded-lg text-[#2c6335] text-sm font-bold"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import NavBar from "../Layout/NavBar.vue";

export default {
  name: "CategoryLink",
  components: {
    Category,
    NavBar,
  },
  props: ["categoryId"],
  data() {
    return {
      popularProducts: [],
      selectedCategory: null,
    };
  },
  methods: {
    updatePopularProducts(category) {
      this.selectedCategory = category;
      this.fetchPopularProducts(category.id);
    },
    async fetchPopularProducts(categoryId) {
      try {
        const response = await fetch(
          `https://backendgrocery.000webhostapp.com/api/v1/products?category_id=${categoryId}`
        );
        const data = await response.json();
        this.popularProducts = data.data;
      } catch (error) {
        console.error("Error fetching popular products", error);
      }
    },
  },
  mounted() {
    // Fetch popular products only if categoryId is provided in the route params
    if (this.$route.params.categoryId) {
      this.fetchPopularProducts(this.$route.params.categoryId);
    }
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) return [];
      return this.popularProducts.filter(
        (product) => product.category.id === this.selectedCategory.id
      );
    },
  },
};
</script>
