<template>
  <div class="about">
    <form @submit.prevent="login">
      <div>
        <label> Email: </label>
        <input type="email" placeholder="Email address..." v-model="email" />
      </div>
      <div class="my-2">
        <label class="font-medium"> Password: </label>
        <input type="password" placeholder="Password..." v-model="password" />
      </div>
      <div>
        <button class="border-2 border-green-400 p-1 rounded-md" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
