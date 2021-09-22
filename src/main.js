import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "firebase/firestore";
import './index.css'

var firebaseConfig = {
    apiKey: "AIzaSyCACOMcyd4PLEzAlXe6Wa-jGokXoYXF39M",
    authDomain: "store-manager-fbc98.firebaseapp.com",
    projectId: "store-manager-fbc98",
    storageBucket: "store-manager-fbc98.appspot.com",
    messagingSenderId: "741424231495",
    appId: "1:741424231495:web:67ad1293984193225c6d62",
    measurementId: "G-VHLNTRCQP8"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("autoSignIn", user);
  }
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
});
