<template>
  <div class="home">
    <!-- <div v-for="(racket, index) in airtable.rackets" :key="index">
      {{racket.fields.RacketName}}
      {{racket.fields.Price}}
      {{racket.fields.ImgContent}}
    </div> -->
    <div class="cards">
      <ItemCard :imageSrc="racket.fields.PreviewImg" :imageAltText="racket.fields.RacketName" v-for="(racket, index) in airtable.rackets" :key="index">
        <div class="card__heading"><strong>{{racket.fields.RacketName}}</strong></div>
        <div>{{racket.fields.Price}}SEK</div>
      </ItemCard>
    </div>
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
        const filteredResponse = resp.records.filter(racket => racket.fields.RacketName != "" && racket.fields.RacketName != undefined && racket.fields.RacketName != null);
        console.log(filteredResponse);
        airtable.rackets = filteredResponse;
      });
    }

    return {
      airtable
    }
  },
});
</script>

<style lang="scss" scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    justify-content: center;
  }

  .card__heading {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
