<template>
  <div class="home">
    <img alt="Racket logo" src="https://cocky-kowalevski-3f8a74.netlify.app/head-graphene-360-alpha-pro.jpg">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  setup() {
    const axiosInstance = axios.create({
      baseURL: "/.netlify/functions",
      timeout: 10000
    });

    axiosInstance.get("airtable_function").then(resp => {
      console.log(resp.data);
    });
  },
});
</script>
