<template>
  <div class="home">
    <div v-for="(racket, index) in airtable.rackets" :key="index">
      {{racket.RacketName}}
      {{racket.Price}}
      {{racket.ImgContent}}
    </div>
    <img alt="Racket logo" src="https://cocky-kowalevski-3f8a74.netlify.app/head-graphene-360-alpha-pro.jpg">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { GetPadelRacket } from "@/API/AirTableAPICaller"
import { AirTableRecord } from "@/Models/AirTableRecord"
import PadelRacket from "@/Models/AirTablePadelRacket"

export default defineComponent({
  name: 'Home',
  setup() {
    const airtable = reactive({
      rackets: [] as AirTableRecord<PadelRacket>[]
    });

    PadelRackets();

    async function PadelRackets() {
      const padelRacket = await GetPadelRacket().then(resp => {
        airtable.rackets = resp.records.filter(racket => racket.fields.RacketName != "");
      });
    }

    return {
      airtable
    }
  },
});
</script>
