<template>
  <div>
    <nav class="fixed z-50 w-full py-4 transition-all duration-300 ease-in-out bg-white shadow-md">
      <div
        class="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between max-w-[1440px] mx-auto px-6 xl:px-20">
        <!-- <div
        class="flex flex-col items-center justify-center w-20 h-20 text-gray-500 bg-gray-100 rounded-md"
      >
        <i class="text-4xl bx bx-code-curly"></i>
        <p class="text-sm font-semibold text-indigo-500 uppercase">BP</p>
      </div> -->

        <a href="#" class="flex flex-col text-slate-500">
          <span class="text-2xl font-semibold"><span class="text-3xl font-black text-indigo-500">V</span>oltage</span>
          <span class="-mt-2.5 pl-[6px] text-xl font-semibold"><span
              class="font-black text-indigo-500">W</span>atch</span></a>

        <form class="flex flex-col items-center w-full gap-4 space-x-4 sm:w-auto sm:gap-0 sm:flex-row">
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
              <v-select v-model="user_station_id" :options="stations" :reduce="(station) => station.id" label="city"
                :clearable="false" />


            </client-only>
          </label>
          <label>
            <client-only>
              <DatePicker v-model="infDatetime" :clearable="false"></DatePicker>
            </client-only>
          </label>
        </form>
      </div>
    </nav>
    <main class="relative max-w-[1440px] bg-gray-50 mx-auto px-6 xl:px-20 pt-72 sm:pt-40 pb-14 space-y-4 sm:space-y-6">
      <h1 class="text-3xl font-black text-slate-900">
        {{ getCurrentStation?.city }}
      </h1>
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1">
          <h4 class="text-2xl font-bold text-indigo-900">Nombre de coupures</h4>



          <div class="flex flex-wrap items-center gap-3">
            <p class="font-black text-6xl text-pink-500">

              {{ nthLastMonthsCut }}
            </p>

          </div>
        </div>
        <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1">
          <h4 class="text-2xl font-bold text-indigo-900">Nombre de signaux de voltages</h4>



          <div class="flex flex-wrap items-center gap-3">
            <p class="font-black text-6xl text-pink-500">

              {{ voltageEventsCount }}
            </p>
          </div>
        </div>
        <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1">
          <h4 class="text-2xl font-bold text-indigo-900">Nombre de signaux de fréquences</h4>



          <div class="flex flex-wrap items-center gap-3">
            <p class="font-black text-6xl text-pink-500">

              {{ frequencyEventsCount }}
            </p>
          </div>
        </div>
        <div
          class="p-4 space-y-2 transition-all duration-300 ease-in-out bg-white border rounded-md hover:-translate-y-1">
          <h4 class="text-2xl font-bold text-indigo-900">Nombre total de stations</h4>



          <div class="flex flex-wrap items-center gap-3">
            <p class="font-black text-6xl text-pink-500">

              {{ stations.length }}
            </p>

          </div>
        </div>
      </div>
      <client-only>
        <!-- <BarChart :data="chartData" /> -->
        <LineChart :data="chartDataLine" />
      </client-only>

    </main>
    <footer class="mx-auto  mt-10 w-full max-w-[1440px] px-6 xl:px-20 border-t">
      <p class="my-5 text-sm leading-6 text-center text-slate-500">
        © 2023 Voltage Watch - hackaton. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script>
import fetch from "isomorphic-fetch";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
const stationsUrl = "http://localhost:5000/stations";
const eventUrl = "http://localhost:5000/events";

export default {
  components: { DatePicker },
  name: "voltage",
  async asyncData() {
    let user_station_id;
    let infDatetime;
    let stations = [];
    await fetch(stationsUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("data stations =>", data);
        stations = data;

        // user_station_id = 105;
        infDatetime = new Date()
        user_station_id = data[0].id;
      });

    return {
      user_station_id,
      stations,
      infDatetime,
    };
  },
  data() {
    return {
      voltages: [],
      frequencies: [],
      // user_station_id: 0,
    };
  },
  computed: {
    chartDataLine() {
      return {
        labels: this.voltages.map(volt => volt.timestamp),
        datasets: [
          {
            label: "Voltages",
            fill: false,
            tension: 0.1,
            borderColor: "rgba(255, 99, 132, 1)",
            data: this.voltages.map(volt => volt.value || 0),
          },
          {
            label: "Frequencies",
            fill: false,
            tension: 0.1,
            borderColor: "rgba(100, 255, 0, 1)",
            data: this.frequencies.map(freq => freq.value || 58),
          },
        ],
      };
    },
    // chartData() {
    //   return {
    //     labels: [1, 2, 3, 4, 5],
    //     datasets: [
    //       {
    //         label: "",
    //         data: [2, 1, 16, 3, 2],
    //         backgroundColor: "rgba(20, 255, 0, 0.3)",
    //         borderColor: "rgba(100, 255, 0, 1)",
    //         borderWidth: 2,
    //       },
    //     ],
    //   };
    // },
    nthLastMonthsCut() {
      return this.voltages.filter(volt => !volt.value).length
    },
    voltageEventsCount() {
      return this.voltages.length
    },
    frequencyEventsCount() {
      return this.frequencies.length
    },
    // stationID() {
    //   return this.stations.find(station => station.)
    // },
    getCurrentStation() {
      return this.stations.find(
        (station) => station.id === this.user_station_id
      );
    },
  },

  created() {
    console.log("creation says => ", this.infDatetime)
  },

  mounted() {
    // console.log("winboy", this.user_station_id);
    let timestamp = new Date(this.infDatetime.getTime())
      timestamp = new Date(timestamp.setDate(timestamp.getDate() + 1));    fetch(`${eventUrl}/?measure=voltage&stationId=${this.user_station_id}&timestamp_lte=${(timestamp).toISOString()}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data voltage =>", data);
        this.voltages = data;
        console.log("voltage => ", JSON.stringify(this.voltages))
      });
    
    fetch(`${eventUrl}/?measure=frequency&stationId=${this.user_station_id}&timestamp_lte=${timestamp.toISOString()}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data frequency =>", data);
        this.frequencies = data;
      });
  },
  watch: {
    user_station_id() {
      // console.log("winboy", this.user_station_id);
      let timestamp = new Date(this.infDatetime.getTime())
      timestamp = new Date(timestamp.setDate(timestamp.getDate() + 1));      
      fetch(`${eventUrl}/?measure=voltage&stationId=${this.user_station_id}&timestamp_lte=${timestamp.toISOString()}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("data voltage =>", data);
          this.voltages = data;
          console.log("voltage => ", JSON.stringify(this.voltages))
        });

      fetch(`${eventUrl}/?measure=frequency&stationId=${this.user_station_id}&timestamp_lte=${timestamp.toISOString()}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("data frequency =>", data);
          this.frequencies = data;
        });
    },
    infDatetime() {

      let timestamp = new Date(this.infDatetime.getTime())
      timestamp = new Date(timestamp.setDate(timestamp.getDate() + 1));
      fetch(`${eventUrl}/?measure=voltage&stationId=${this.user_station_id}&timestamp_lte=${timestamp.toISOString()}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("data voltage =>", data);
          this.voltages = data;
          console.log("voltage => ", JSON.stringify(this.voltages))
        });

      fetch(`${eventUrl}/?measure=frequency&stationId=${this.user_station_id}&timestamp_lte=${timestamp.toISOString()}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("data frequency =>", data);
          this.frequencies = data;
        });
    }
  }
};
</script>

<style>
.vs__dropdown-toggle {
  @apply w-full h-10 px-2 text-base border-none rounded-md text-slate-500 ring-1 ring-gray-200 placeholder-slate-400;
}
</style>
