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
          ><RouterLink to="/signup"> create an account</RouterLink>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
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
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log(auth.currentUser);
        Swal.fire({
          position: "top-center",
          html: "<div style='font-size: 14px; font-family: sans-serif;'>Login successful</div>",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/");
        // const store = useStore();
        // store.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
