<template>
  <div id="transaction">
    {{ transaction.id }}
  </div>
</template>

<script>

export default {
  props: {
    transaction: {
      type: Object,
    },
  },
  mounted() {
    this.data = this.transaction.value;
  },
};
</script>

<style></style>
