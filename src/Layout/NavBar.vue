<template>
  <div v-if="ProfileDetailsState" class="flex absolute z-30 right-0 top-20">
    <div
      class="bg-[#ffffff] flex flex-col gap-2 h-38 w-[130px] pl-2 py-2 border shadow-sm shadow-black rounded-md cursor-pointer"
    >
      <h1 class="font-bold text-sm pl-1">My Account</h1>
      <div class="pl-1 py-1 hover:bg-[#e2e8f0] rounded-sm">
        <p>Profile</p>
      </div>
      <div class="pl-1 py-1 hover:bg-[#e2e8f0] rounded-sm">
        <p>My Order</p>
      </div>
      <div
        @click="handleSignOut"
        class="pl-1 py-1 hover:bg-[#e2e8f0] rounded-sm"
      >
        <p>Logout</p>
      </div>
    </div>
  </div>
  <div
    v-if="!isLoginPage && !isSignUpPage"
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        <h1
          class="text-white bg-green-700 rounded-full font-normal text-sm flex items-center justify-center text-center h-5 w-5 absolute left-5 top-[-12px]"
        >
          {{ increaseCount.count }}
        </h1>
      </div>

      <button
        v-if="!isLoggedIn"
        class="bg-green-700 text-white px-4 rounded-lg"
      >
        <RouterLink to="/login">Login</RouterLink>
      </button>
      <div
        @click="handleProfileOpening"
        v-if="isLoggedIn"
        class="bg-[#dcfbe7] rounded-full p-2 text-[#398058]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <!-- <button
        @click="handleSignOut"
        v-if="isLoggedIn"
        class="bg-green-700 text-white px-4 rounded-lg"
      >
        logout
      </button> -->
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { useStore } from "@/stores/store";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const increaseCount = useStore();
    return {
      increaseCount,
    };
  },
  name: "Test",
  components: {},
  created() {},
  data() {
    return {
      isLoggedIn: false,
      isLoginPage: false,
      isSignUpPage: false,
    };
  },

  props: {},
  methods: {
    checkCurrentRoute() {
      const currentPath = this.$route.path;
      this.isLoginPage = currentPath === "/login";
      this.isSignUpPage = currentPath === "/signup";
    },
    handleOpeningCartModal() {
      const openCartModal = useStore();
      openCartModal.openCartModal();
    },
    handleBrowseCategory() {
      const openBrowseCategory = useStore();
      openBrowseCategory.openBrowseCategory();
    },
    authenTicateChange() {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleSignOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false;
          router.push("/login");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    },

    handleProfileOpening() {
      const openProfile = useStore();
      openProfile.openProfileModal();
    },
  },
  mounted() {
    this.authenTicateChange();
  },
  computed: {
    ProfileDetailsState() {
      const store = useStore();
      return store.profileModal;
    },
  },
  watch: {
    $route() {
      this.checkCurrentRoute();
    },
  },
};
</script>

<style lang="scss" scoped></style>
