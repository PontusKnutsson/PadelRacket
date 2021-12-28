<template>
  <Topbar />
  <div class="content">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Topbar from "@/components/Topbar.vue";

export default defineComponent({
  components: {
    Topbar
  },
})
</script>


<style lang="scss">

body {
  margin: 0;
}
.content {
  margin: auto;
  margin-top: 70px;
  width: 800px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
