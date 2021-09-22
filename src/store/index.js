import { createStore } from "vuex";
import firebase from "firebase";
import router from "@/router";
import { db } from "../main";

export default createStore({
  state: { user: null, data: null, dataItems: null },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setDataItems(state, payload) {
      state.dataItems = payload;
    },
  },
  actions: {
    async userLogin({ commit }, payload) {
      try {
        let res = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        alert("Login Complete");
        commit("setUser", res);
        router.push("/Dashboard");
      } catch (error) {
        alert(error.message);
      }
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },
    async userSignOut({ commit }) {
      await firebase.auth().signOut();
      alert("Logout Complete");
      commit("setUser", null);
      router.push("/");
    },
    async createProduct(_, payload) {
      await db.collection("transactions").add({
        id: payload.id,
        value: +payload.value,
        transaction: payload.transaction,
        timestamp: new Date().toISOString(),
      });
      alert("Created transaction");
    },
    getTransactions({ commit }) {
      var memberRef = db.collection("transactions");

      memberRef.onSnapshot(
        (snapshotChange) => {
          let data = [];
          snapshotChange.forEach((doc) => {
            let dateFormat = new Date(doc.data().timestamp).toLocaleString();
            if (doc.data().transaction === "sales") {
              data.push({
                key: doc.id,
                id: doc.data().id,
                value: -doc.data().value,
                user: doc.data().user,
                sku: doc.data().sku,
                transaction: doc.data().transaction,
                date: dateFormat,
              });
            } else {
              data.push({
                key: doc.id,
                id: doc.data().id,
                value: +doc.data().value,
                user: doc.data().user,
                sku: doc.data().sku,
                transaction: doc.data().transaction,
                date: dateFormat,
              });
            }
          });
          commit("setData", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getDataItems({ commit }) {
      let memberRef = db.collection("items");

      await new Promise((resolve, reject) => {
        memberRef.onSnapshot(
          (snapshotChange) => {
            let data = [];
            snapshotChange.forEach((doc) => {
              data.push({
                key: doc.id,
                id: doc.data().id,
                name: doc.data().name,
                row: doc.data().row,
              });
            });
            commit("setDataItems", data);
            resolve();
          },
          (error) => {
            reject(error);
            console.log(error);
          }
        );
      });
    },
    // async updateProduct(_, payload) {
    //   console.log(payload);
    //   try {
    //     await db
    //       .collection("adminAuth")
    //       .doc(firebase.auth().currentUser.uid)
    //       .collection("product")
    //       .doc(payload.key)
    //       .update({
    //         value: payload.value,
    //         timestamp: Date.now(),
    //       });
    //     alert("Updated");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async register(_, payload) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        alert("Successfully registered! Please login.");
        router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  modules: {},
});
