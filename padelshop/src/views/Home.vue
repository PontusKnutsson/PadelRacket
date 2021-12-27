<template>
  <div class="home">
    <!-- <div v-for="(racket, index) in airtable.rackets" :key="index">
      {{racket.fields.RacketName}}
      {{racket.fields.Price}}
      {{racket.fields.ImgContent}}
    </div> -->
    <ItemCard :imageSrc="racket.fields.ImgConent" :imageAltText="racket.fields.RacketName" v-for="(racket, index) in airtable.rackets" :key="index">
      {{racket.fields.RacketName}}<br />
      {{racket.fields.Price}}
    </ItemCard>
    <!-- <img alt="Racket logo" src="https://cocky-kowalevski-3f8a74.netlify.app/head-graphene-360-alpha-pro.jpg"> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ItemCard from "@/components/ItemCard.vue"

import { GetPadelRacket } from "@/API/AirTableAPICaller"
import { AirTableRecord } from "@/Models/AirTableRecord"
import PadelRacket from "@/Models/AirTablePadelRacket"

export default defineComponent({
  name: 'Home',
  components: {
    ItemCard
  },
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
