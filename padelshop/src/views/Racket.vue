<template>
    <div>
        {{racket.fields.RacketName}} - {{racket.fields.Price}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { GetRackets } from "@/_store/RacketStore"

export default defineComponent({
    setup() {
        const route = useRoute();
        const racketId = route.params.id;
        let racket = GetRackets()?.find(racket => racket.id == racketId);

        return {
            racket
        }
    },
})
</script>
