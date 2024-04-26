<template>
  <div class="bg-[#ffff] flex justify-center w-full h-screen">
    <div
      class="bg-[#f1f9f5] w-[100%] lg:w-[35%] lg:h-[55%] h-[100%] lg:mt-[80px] md:py-10 border flex flex-col items-center px-5 cursor-pointer"
    >
      <img
        src="https://online-grocery-store-web.vercel.app/logo.png"
        alt=""
        class="w-48 mt-10"
      />
      <h1 class="mt-2 text-3xl font-extrabold">Sign In to Account</h1>
      <p class="text-[#6b7280] text-sm tracking-wide">
        Enter your Email and Password to Sign In
      </p>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        class="my-5 w-[90%] px-5 py-2 rounded-md bg-[#ffff] placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 outline-black"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-[90%] px-5 py-2 rounded-md bg-[#ffff] placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 outline-black"
      />
      <button
        @click="createUser"
        class="w-[90%] px-5 py-2 rounded-md bg-green-600 my-5 text-white"
      >
        Sign in
      </button>
      <p class="px-5">
        Don't have an account?
        <span class="text-blue-500 cursor-pointer"
          ><RouterLink to="/signup"
            >Click here to create new account</RouterLink
          >
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
      email: "",
      password: "",
    };
  },
  props: {},
  methods: {
    async createUser() {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((response) => {
          if (response.ok) {
            console.log("account created");
          }
        })
        .catch((error) => {
          console.log("account not created", error);
        });
    },

    // async loginUser() {
    //   const userData = {
    //     email: this.email,
    //     password: this.password,
    //   };
    //   try {
    //     const response = await fetch(
    //       "https://backendgrocery.000webhostapp.com/api/v1/auth/local/login/",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //       }
    //     );

    //     if (response.ok) {
    //       console.log(response.json(), "Login successful");
    //     } else {
    //       throw new Error("Login failed");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error.message);
    //   }
    // },
  },
  // mounted() {
  //   this.loginUser();
  // },
};
</script>
