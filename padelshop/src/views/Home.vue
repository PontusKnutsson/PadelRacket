<template>
  <div class="home">
    <!-- <div v-for="(racket, index) in airtable.rackets" :key="index">
      {{racket.fields.RacketName}}
      {{racket.fields.Price}}
      {{racket.fields.ImgContent}}
    </div> -->

    <input type="search" class="racket-search" placeholder="Sök bland racken" @input="FilterRackets">

    <div class="cards__none" v-if="airtable.filteredRackets.length == 0"><h2>Inga rack kunde hittas!</h2></div>

    <div class="cards">
      <transition-group name="card-animation" tag="p" appear>
        <ItemCard :imageSrc="racket.fields.PreviewImg" :imageAltText="racket.fields.RacketName" v-for="(racket, index) in airtable.filteredRackets" :key="index" @click="GoToRacketPage(index)">
          <div class="card__heading"><strong>{{racket.fields.RacketName}}</strong></div>
          <div>{{racket.fields.Price}}SEK</div>
        </ItemCard>
      </transition-group>
    </div>

    <!-- <div v-html="swishQR"></div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ItemCard from "@/components/ItemCard.vue"

import { GetPadelRacket } from "@/API/AirTableAPICaller"
import { AirTableRecord } from "@/Models/AirTableRecord"
import PadelRacket from "@/Models/AirTablePadelRacket"
import { GetRackets, SetRackets } from "@/_store/RacketStore"

import { GetSwishQRCode } from "@/API/GetSwishQRCode";

export default defineComponent({
  name: 'Home',
  components: {
    ItemCard
  },
  setup() {
    const airtable = reactive({
      rackets: [] as AirTableRecord<PadelRacket>[],
      filteredRackets: [] as AirTableRecord<PadelRacket>[]
    });

    const swishQR = ref("");

    PadelRackets();
    SwishQRCode();

    async function PadelRackets() {
      if (GetRackets() == undefined || GetRackets()?.length == 0){
          GetPadelRacket().then(resp => {
            const filteredResponse = resp.records.filter(racket => racket.fields.RacketName != "" && racket.fields.RacketName != undefined && racket.fields.RacketName != null);
            console.log(filteredResponse);
            // airtable.rackets = filteredResponse;
            SetRackets(filteredResponse);
            airtable.filteredRackets = filteredResponse;
          });
      }
      else {
        airtable.filteredRackets = GetRackets();
      }
    }

    async function SwishQRCode() {
      GetSwishQRCode().then(resp => {
        // console.log(resp);
        // var xml = (new XMLSerializer).serializeToString(resp);
        // swishQR.value = "data:image/svg+xml;charset=utf-8,"+xml;
        // console.log(resp);
        swishQR.value = resp;
      });
    }

    function FilterRackets(event: Event) {
      const searchValue = (event.target as HTMLInputElement).value;
      if (searchValue === "" || searchValue == undefined) {
        airtable.filteredRackets = GetRackets();
      }
      else {
        airtable.filteredRackets = GetRackets().filter(racket => racket.fields.RacketName.toUpperCase().includes(searchValue.toUpperCase()));
      }
    }

    function GoToRacketPage(index: number){
      const racketId = airtable.filteredRackets[index].id;
      console.log(`Index: ${index}, RacketId: ${racketId}`)
    }

    return {
      airtable,
      swishQR,
      FilterRackets,
      GoToRacketPage
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
    margin-top: 20px;

    &__none {
      margin-top: 20px;
      transition: all ease .5s;
      text-align: center;
    }
  }

  .card-animation-enter-active, .card-animation-leave-active {
    opacity: 0.5;
  }

  .card-animation-enter,
  .card-animation-leave-to {
    opacity: 0;
  }

  .card__heading {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .racket-search {
    width: 100%;
    border-radius: 5px;
    height: 36px;
    border: 1px solid hsla(0,0%,41.2%,.68);
    outline: none;
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    // pointer-events: none;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    opacity: .3;
    pointer-events: all;
  }
</style>
