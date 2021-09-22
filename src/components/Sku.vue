<template>
    <span
      v-if="sku.transaction == `receive`"
      style="background-color: green"
    >
      {{ sku.transaction }}
    </span>
    <span style="background-color: red" v-else>{{
      sku.transaction
    }}</span>
</template>

<script>
export default {
props: {
    sku: {
        type: Object
    },
}
}
</script>

<style>

</style>