<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <span v-if="!this.$store.state.user">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </span>
    <span v-if="this.$store.state.user">
      <router-link to="/dashboard">Dashboard</router-link>
      |
      <router-link to="/report">Report</router-link> |
    </span>
    <button class="border-2 border-red-400 p-1 rounded-md" v-if="this.$store.state.user !== null" @click="userLogOut">
      Logout
    </button>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    userLogOut() {
      this.$store.dispatch("userSignOut");
    },
  },
};
</script>

<style>
body {
  @apply bg-gradient-to-r from-purple-300 to-green-100;
}
#app {
  @apply font-sans antialiased grayscale text-center text-gray-700;
}
#nav {
  @apply p-8;
}
#nav a {
  @apply font-bold text-gray-700;
}
#nav a.router-link-exact-active {
  @apply text-green-500;
}
</style>
