<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const axiosInstance = axios.create({
      baseURL: "/netlify/functions",
      timeout: 10000
    });

    axiosInstance.get("airtable_function").then(resp => {
      console.log(resp.data);
    });
  },
});
</script>
