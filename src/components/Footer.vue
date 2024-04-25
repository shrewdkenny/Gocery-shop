<template>
  <div>
    <div
      class="mt-8 bg-[#f3f4f6] flex flex-col justify-center px-5 items-center py-10"
    >
      <img
        src="https://online-grocery-store-web.vercel.app/logo.png"
        alt=""
        class="w-40"
      />
      <p class="text-[#717886] text-sm mt-3 flex text-center leading-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
        Incidunt consequuntur amet culpa cum itaque neque.
      </p>
      <ul
        class="flex mt-10 lg:gap-10 lg:text-lg text-[#6a717d] text-sm gap-2 cursor-pointer"
      >
        <li>About</li>
        <li>Careers</li>
        <li>History</li>
        <li>Services</li>
        <li>Projects</li>
        <li>Blog</li>
      </ul>
      <div class="flex gap-10 mt-10 text-xl text-[#6a717f] cursor-pointer">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-github"></i>
        <i class="fa-solid fa-basketball"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
