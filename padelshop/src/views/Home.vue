<template>
  <div class="home">
    <img alt="Racket logo" src="https://cocky-kowalevski-3f8a74.netlify.app/head-graphene-360-alpha-pro.jpg">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetPadelRacket } from "@/API/AirTableAPICaller"

export default defineComponent({
  name: 'Home',
  setup() {
    // const axiosInstance = axios.create({
    //   baseURL: "/.netlify/functions",
    //   timeout: 10000
    // });

    // axiosInstance.get("airtable_function").then(resp => {
    //   console.log(resp.data);
    // });
    PadelRackets();

    async function PadelRackets() {
      const padelRacket = await GetPadelRacket().then(resp => {
        console.log("Inside home with resp: " + resp)
      });
    }

  },
});
</script>
