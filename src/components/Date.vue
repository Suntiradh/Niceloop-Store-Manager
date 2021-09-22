<template>
  <div>
    {{ date.date }}
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
    },
  },
};
</script>

<style></style>
