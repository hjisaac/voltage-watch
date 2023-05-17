<template>
  <div>
    <nav
      class="fixed z-50 w-full py-4 transition-all duration-300 ease-in-out bg-white shadow-md"
    >
      <div
        class="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between max-w-[1440px] mx-auto px-6 xl:px-20"
      >
        <!-- <div
        class="flex flex-col items-center justify-center w-20 h-20 text-gray-500 bg-gray-100 rounded-md"
      >
        <i class="text-4xl bx bx-code-curly"></i>
        <p class="text-sm font-semibold text-indigo-500 uppercase">BP</p>
      </div> -->

        <a href="#" class="flex flex-col text-slate-500">
          <span class="text-2xl font-semibold"
            ><span class="text-3xl font-black text-indigo-500">V</span
            >oltage</span
          >
          <span class="-mt-2.5 pl-[6px] text-xl font-semibold"
            ><span class="font-black text-indigo-500">W</span>atch</span
          ></a
        >

        <form
          class="flex flex-col items-center w-full gap-4 space-x-4 sm:w-auto sm:gap-0 sm:flex-row"
        >
          <!-- <label class="relative w-full md:w-96">
          <span
            class="absolute left-2 top-[56%] -translate-y-2/4 text-slate-500 text-xl"
            ><i class="bx bx-search"></i
          ></span>

          <input
            type="text"
            class="w-full pl-8 pr-6 text-sm border-none rounded-md sm:text-base text-slate-500 ring-1 ring-gray-200 placeholder-slate-400"
            placeholder="Recherche"
          />
        </label> -->
          <label class="relative w-full md:w-96">
            <client-only>
              <v-select
                v-model="tension_id"
                :options="tensions"
                :reduce="(tension) => tension.value"
                label="name"
              />
            </client-only>
          </label>
        </form>
      </div>
    </nav>
    <main
      class="h-[1000px] relative max-w-[1440px] bg-gray-50 mx-auto px-6 xl:px-20 pt-72 sm:pt-40 pb-14 space-y-4 sm:space-y-6"
    >
      <h1 class="text-3xl font-black text-slate-900">
        {{ getCurrentZone?.name }}
      </h1>
      <client-only>
        <BarChart :data="chartData" />
        <LineChart :data="chartDataLine" />
      </client-only>
      <div class="grid gap-4 sm:grid-cols-2">
        <!-- <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1"
        >
          <h4 class="text-2xl font-bold text-indigo-900">Godwin Aguiah</h4>

          <p class="flex items-center">
            <i class="text-2xl text-pink-500 bx bx-link"></i>
            <a
              href="#"
              class="text-indigo-600 transition-all duration-300 ease-in-out cursor-pointer hover:underline"
              >godwinaguiah.me</a
            >
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="px-3 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out bg-white border-2 rounded-full group hover:border-indigo-500 hover:bg-indigo-500 hover:bg-indigo-50 hover:text-white"
            >
              <span
                class="text-pink-500 transition-all duration-300 ease-in-out group-hover:text-white"
                >#</span
              >
              Frontend
            </button>

            <button
              type="button"
              class="px-3 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out bg-white border-2 rounded-full group hover:border-indigo-500 hover:bg-indigo-500 hover:bg-indigo-50 hover:text-white"
            >
              <span
                class="text-pink-500 transition-all duration-300 ease-in-out group-hover:text-white"
                >#</span
              >
              Design
            </button>
          </div>
        </div>

        <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1"
        >
          <h4 class="text-2xl font-bold text-indigo-900">Herval Noumonvi</h4>

          <p class="flex items-center">
            <i class="text-2xl text-pink-500 bx bx-link"></i>
            <a
              href="#"
              class="text-indigo-600 transition-all duration-300 ease-in-out cursor-pointer hover:underline"
              >hervalnoumonvi.me</a
            >
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="px-3 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out bg-white border-2 rounded-full group hover:border-indigo-500 hover:bg-indigo-500 hover:bg-indigo-50 hover:text-white"
            >
              <span
                class="text-pink-500 transition-all duration-300 ease-in-out group-hover:text-white"
                >#</span
              >
              Backend
            </button>

            <button
              type="button"
              class="px-3 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out bg-white border-2 rounded-full group hover:border-indigo-500 hover:bg-indigo-500 hover:bg-indigo-50 hover:text-white"
            >
              <span
                class="text-pink-500 transition-all duration-300 ease-in-out group-hover:text-white"
                >#</span
              >
              Frontend
            </button>
          </div>
        </div> -->
      </div>
    </main>
    <footer class="mx-auto w-full max-w-[1440px] px-6 xl:px-20 border-t">
      <p class="my-5 text-sm leading-6 text-center text-slate-500">
        © 2023 Voltage Watch - hackaton. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script>
import fetch from "isomorphic-fetch"
const stationsUrl = "http://localhost:5000/stations";
const eventUrl = "http://localhost:5000/events";

export default {
  name: "voltage",
  data() {
    return {
      voltages : [],
      frequencies: [],
      tensions: [
        {
          name: "Bénin",
          value: "benin1",
        },
        {
          name: "Canada",
          value: "canada1",
        },
        {
          name: "Brazil",
          value: "brazil1",
        },
        {
          name: "Suisse",
          value: "suisse1",
        },
      ],
      tension_id: "",
    };
  },
  computed: {
    chartDataLine() {
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data Set 1",
            fill: false,
            tension: 0.1,
            borderColor: "rgba(255, 99, 132, 1)",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "Data Set 2",
            fill: false,
            tension: 0.1,
            borderColor: "rgba(100, 255, 0, 1)",
            data: [65, 59, 80, 81, 56, 55, 40].reverse(),
          },
        ],
      };
    },
    chartData() {
      return {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: "",
            data: [2, 1, 16, 3, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            borderColor: "rgba(100, 255, 0, 1)",
            borderWidth: 2,
          },
        ],
      };
    },
    getCurrentZone() {
      return this.tensions.find((zone) => zone.value === this.tension_id);
    },
  },
  mounted() {
    this.tension_id = this.tensions[0].value;

    fetch(eventUrl).then(response => response.json()).then(data => {
      console.log("data =>", data)
    })
  },
};
</script>

<style>
.vs__dropdown-toggle {
  @apply w-full h-10 px-2 text-base border-none rounded-md text-slate-500 ring-1 ring-gray-200 placeholder-slate-400;
}
</style>
