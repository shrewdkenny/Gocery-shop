<template>
  <img src="@/assets/spinner.gif" alt="">


  <div class="bg-[#ffff] flex justify-center w-full h-screen">
    <div
      class="bg-[#f1f9f5] w-[100%] lg:w-[35%] lg:h-[55%] h-[100%] lg:mt-[80px] md:py-10 border flex flex-col items-center px-5 cursor-pointer"
    >
      <img
        src="https://online-grocery-store-web.vercel.app/logo.png"
        alt=""
        class="w-48 mt-10"
      />
      <h1 class="mt-2 text-3xl font-extrabold">Create an Account</h1>
      <p class="text-[#6b7280] text-sm text-[13px] lg:tracking-wide">
        Enter your Email and Password to Create an account
      </p>
      <input
        v-model="username"
        type="text"
        placeholder="username"
        class="my-5 w-[90%] px-5 py-2 rounded-md bg-[#ffff] placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 outline-black"
      />
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        class="w-[90%] px-5 py-2 rounded-md bg-[#ffff] placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 outline-black"
      />
      <input
        v-model="password"
        type="password"
        placeholder="password"
        class="w-[90%] mt-3 px-5 py-2 rounded-md bg-[#ffff] placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 outline-black"
      />
      <button
        @click="createUser"
        class="w-[90%] px-5 py-2 rounded-md bg-green-600 my-5 text-white"
      >
        Create an Account
      </button>
      <p class="px-5">
        Already have an account?
        <span class="text-blue-500 cursor-pointer"
          ><RouterLink to="/login">Click here to Sign In</RouterLink>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  props: {},
  methods: {
    async createUser() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await fetch(
        "https://backendgrocery.000webhostapp.com/api/v1/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("account created");
          }
        })
        .catch((error) => {
          console.log("account not created", error);
        });
    },
  },
  mounted() {
    this.createUser();
  },
};
</script>

<style lang="scss" scoped></style>
