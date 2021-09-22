<template>
  <div id="report">
    Report
    <br />
    <table class="table-auto border-separate border border-green-800 m-auto">
      <thead>
        <tr>
          <th>Row</th>
          <th>Name</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="items in sortedData" :key="items">
          <td>
            {{ items.row }}
          </td>
          <td>
            {{ items.name }}
          </td>
          <td>
            {{ items.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getDataItems");
  },
  computed: {
    itemsData() {
      return this.$store.state.dataItems;
    },
    sortedData() {
      let coppyData = this.itemsData;
      return coppyData?.sort((a, b) => {
        return a.row > b.row ? 1 : -1;
      });
    },
  },
};
</script>

<style></style>
