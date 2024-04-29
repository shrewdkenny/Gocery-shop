import "./assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import App from "./App.vue";
import router from "./router";
const firebaseConfig = {
  apiKey: "AIzaSyBRVm9S_AOA3I_NOaYW0sM8lHWJ11_THKU",
  authDomain: "grocery-shop-3492e.firebaseapp.com",
  projectId: "grocery-shop-3492e",
  storageBucket: "grocery-shop-3492e.appspot.com",
  messagingSenderId: "894549271553",
  appId: "1:894549271553:web:5ef9eb97470bc505db4c00",
};

const app = createApp(App);
// Initialize Firebase
initializeApp(firebaseConfig);
app.use(createPinia());
app.use(router);

app.mount("#app");
