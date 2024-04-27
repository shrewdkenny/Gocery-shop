<template>
  <!-- Spinner -->
  <div
    v-if="loadingCategoryProducts"
    class="flex justify-center items-center"
  >
    <img src="@/assets/doublespin.gif" alt="" class="w-20" />
  </div>
  <div
    @click="selectCategory(category)"
    v-for="category in categories"
    :key="category.id"
    class="group bg-[#f0fdf4] rounded-lg flex flex-col gap-2 items-center py-2 lg:w-[200px] hover:bg-[#4ca44b]"
  >
    <img
      :src="`https://backendgrocery.000webhostapp.com${category.icon}`"
      alt=""
      class="transition-transform group-hover:scale-110 ease-in-out duration-300 w-20"
    />
    <h1 class="text-[#2c6335] font-semibold group-hover:text-white text-md">
      {{ category.name }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "Test",
  emits: ["category-selected"],
  props: ["categories"],
  created() {},
  data() {
    return {
      categories: [],
    };
  },
  props: ["category"],
  methods: {
    async getCategory() {
      await fetch("https://backendgrocery.000webhostapp.com/api/v1/categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data.data;
        })
        .catch((error) => {
          console.log("error fetching category", error);
        });
    },
    selectCategory(category) {
      this.$emit("category-selected", category);
    },
  },
  mounted() {
    this.getCategory();
  },
  computed: {
    loadingCategoryProducts() {
      return this.categories.length === 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
