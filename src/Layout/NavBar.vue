<template>
  <div
    class="flex gap-3 lg:flex justify-between px-2 lg:px-8 py-5 border-b-2 sticky bg-[#ffffff] cursor-pointer mt-2"
  >
    <div class="flex gap-[40px]">
      <RouterLink to="/">
        <img
          src="https://online-grocery-store-web.vercel.app/logo.png"
          alt=""
          width="120px"
      /></RouterLink>

      <div
        class="hidden lg:flex gap-2 bg-slate-200 px-16 py-2 rounded-3xl cursor-pointer"
        @click="handleBrowseCategory"
      >
        <svg
          class="w-[20px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
        <button>Category</button>
      </div>
      <div class="hidden lg:flex relative">
        <input
          type="text"
          placeholder="Search"
          class="border px-14 rounded-2xl placeholder:text-lg"
        />
        <svg
          class="h-6 w-6 absolute top-3 left-[22px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
    <div class="flex gap-3 lg:gap-6">
      <div class="flex gap-2 relative">
        <div class="text-3xl flex items-center" @click="handleOpeningCartModal">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>

        <h1
          class="text-white bg-green-700 rounded-full font-normal text-sm flex items-center justify-center text-center h-5 w-5 absolute left-5 top-[-12px]"
        >
          {{ increaseCount.count }}
        </h1>
      </div>

      <button class="bg-green-700 text-white px-4 rounded-lg">
        <RouterLink to="/login">Login</RouterLink>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/stores/store";
export default {
  setup() {
    const increaseCount = useStore();
    return {
      increaseCount,
    };
  },
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    handleOpeningCartModal() {
      const openCartModal = useStore();
      openCartModal.openCartModal();
    },
    handleBrowseCategory() {
      const openBrowseCategory = useStore();
      openBrowseCategory.openBrowseCategory();
    },
  },
};
</script>

<style lang="scss" scoped></style>
