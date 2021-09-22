<template>
  <div id="dashboard">
    <br />
    <h3 class="font-medium">Dashboard</h3>
    <br />
    <!-- <form @submit.prevent="createProduct">
      <div>
        <label>Id</label>
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter Id"
          v-model="id"
        /> -->
    <!-- <select class="border-2 border-yellow-400 p-1 rounded-md" v-model="id">
          <option
            v-for="label in sortedDataByRow"
            :key="label.id"
            :value="label.id"
          >
            {{ label.id }}
          </option>
        </select> -->
    <!-- <label>Qty</label>
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter qty"
          v-model="value"
        />
      </div>
      <br />
      <label>Transaction Type:</label>
      <select
        v-model="transaction"
        class="border-2 border-yellow-400 p-1 rounded-md"
      >
        <option v-for="label in selection" :value="label.label" :key="label.id">
          {{ label.label }}
        </option>
      </select>
      <br />
      <button
        class="border-2 border-blue-400 p-1 rounded-md m-4"
        type="submit"
        name="action"
      >
        Create
      </button>
    </form> -->
    <br />
    <!-- <div class="overflow-auto h-60">
      <table class="table-auto border-separate border border-green-800 m-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Transactions</th>
            <th>Qty</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productData in sortedData" :key="productData.key">
            <td>
              <br />
              <transaction :transaction="productData" />
            </td>
            <td>
              <br />
              <sku :sku="productData" />
            </td>
            <td>
              <br />
              <value :value="productData" />
            </td>
            <td>
              <br />
              <date :date="productData" />
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <br />
    Report
    <br />
    <div class="overflow-y-auto h-80">
      <table
        class="table-fixed focus:border-separate border border-green-800 m-auto"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th v-for="info in mockDate" :key="info">
              {{ info.day }}
            </th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          <!-- <draggable> -->
          <tr v-for="items in sortedData" :key="items.id">
            <td>
              {{ items.name }}
            </td>
            <td v-for="(day, index) in mockDate" :key="index">
              {{
                getResultByDate(day.day, items.id)
                  ? getResultByDate(day.day, items.id)
                  : 0
              }}
            </td>
            <td>
              {{ getBalance(items.id) ? getBalance(items.id) : 0 }}
            </td>
          </tr>
          <!-- </draggable> -->
        </tbody>
      </table>
    </div>
    <br />
    <!-- Total Product In Stock:{{ sumData }} -->
  </div>
</template>

<script>
// import Date from "../components/Date.vue";
// import Sku from "../components/Sku.vue";
// import Transaction from "../components/Transaction.vue";
// import Value from "../components/Value.vue";
import dayjs from "dayjs";
// import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    // Transaction,
    // Sku,
    // Date,
    // Value,
    // draggable: VueDraggableNext
  },
  data() {
    return {
      name: null,
      id: null,
      value: null,
      transaction: "receive",
      selection: [
        { id: 1, label: "receive" },
        { id: 2, label: "sales" },
      ],
      result: {},
      resultByDate: {},
      dataMocked: null,
      sumValPerDay: null,
      sortedData: null,
      itemsList: null,
      mockedDate: null,
    };
  },
  async mounted() {
    // await this.$store.dispatch("getTransactions");
    await this.$store.dispatch("getDataItems");
    this.itemsData();
    this.mockDate(30);
    this.sortedItemsByRow();
    this.mockData(10);
    this.computedDataPerMonth();
    this.computedDataPerDay();
  },
  methods: {
    createProduct() {
      this.$store.dispatch("createProduct", {
        id: this.id,
        value: this.value,
        transaction: this.transaction,
      });
      this.id = null;
      this.value = null;
      this.transaction = "receive";
    },
    getBalance(id) {
      return this.result[id];
    },
    getResultByDate(date, id) {
      if (
        this.resultByDate[date] === undefined ||
        this.resultByDate[date][id] === undefined
      ) {
        return 0;
      } else {
        return this.resultByDate[date][id].value;
      }
    },
    // log(event) {
    //   console.log(event);
    // },
    randomDate(start, end) {
      const ts =
        start.valueOf() + Math.random() * (end.valueOf() - start.valueOf());
      return dayjs(ts).toISOString();
    },
    randomValue(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    mockData(qty) {
      let dataArr = [];
      for (let i = 0; i < qty; i++) {
        dataArr.push({
          id: this.itemsList[Math.floor(Math.random() * this.itemsList?.length)]
            .id,
          transaction:
            this.selection[Math.floor(Math.random() * this.selection?.length)]
              .label,
          value: this.randomValue(10, 500),
          timestamp: this.randomDate(dayjs("2021,1,2"), dayjs("2021,1,31")),
        });
      }
      this.dataMocked = dataArr;
      return dataArr;
    },
    computedDataPerMonth() {
      let data = this.dataMocked;
      const result = data?.reduce((prev, cur) => {
        if (cur.transaction === "sales") {
          cur.value = -cur.value;
        }
        let key = cur["id"];
        if (!prev[key]) {
          prev[key] = 0;
        }
        prev[key] += cur.value;
        return prev;
      }, {});
      this.result = result;
      return result;
    },
    computedDataPerDay() {
      let data = this.dataMocked;
      let lastValue = data?.reduce((prev, cur) => {
        cur.timestamp = cur.timestamp.split("T")[0];
        if (!prev[cur.timestamp]) {
          prev[cur.timestamp] = {};
        }
        if (!prev[cur.timestamp][cur.id]) {
          prev[cur.timestamp][cur.id] = { value: cur.value };
        } else {
          prev[cur.timestamp][cur.id].value += cur.value;
        }
        return prev;
      }, {});
      const sortedVal = Object.keys(lastValue)
        .sort()
        .reduce((obj, key) => {
          obj[key] = lastValue[key];
          return obj;
        }, {});
      this.resultByDate = sortedVal;
      return sortedVal;
    },
    sortedItemsByRow() {
      let coppyData = this.itemsList;
      let sortedData = coppyData?.sort((a, b) => {
        return a.row > b.row ? 1 : -1;
      });
      this.sortedData = sortedData;
      return sortedData;
    },
    itemsData() {
      this.itemsList = this.$store.state.dataItems;
      return this.$store.state.dataItems;
    },
    mockDate(day) {
      let dateArr = [];
      for (let i = 1; i <= day; i++) {
        dateArr.push({
          day: dayjs(`2021-01-${i}`).format("YYYY-MM-DD"),
        });
      }
      this.mockDate = dateArr;
      return dateArr;
    },
  },
};
</script>

<style>
th,
td {
  @apply border border-green-600;
}
th {
  @apply sticky top-0 bg-red-200;
}
input {
  @apply border-2 border-green-300 rounded-md;
}
</style>
