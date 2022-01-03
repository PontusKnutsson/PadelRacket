<template>
    <div class="racket-info">
        <div class="racket-info__slideshow-images">
            <img class="racket-info__slideshow-images--image" :class="{ 'racket-info__slideshow-images--image': imgData.active }" :src="imgData.url" 
            v-for="(imgData, index) in images.list" :key="index">
        </div>
        <img :src="racket.fields.PreviewImg">
        <div>
            {{racket.fields.RacketName}} - {{racket.fields.Price}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { GetRackets } from "@/_store/RacketStore"

import { SlideshowImage } from "@/Models/SlideshowImage"

export default defineComponent({
    setup() {
        const route = useRoute();
        const racketId = route.params.id;
        let racket = GetRackets()?.find(racket => racket.id == racketId);
        const images = reactive({
            list: [] as SlideshowImage[]
        });

        if (racket != undefined){
            const fullViewImages = racket?.fields?.FullImg?.split(",");
            for (var i=0; i<fullViewImages.length; i++) {
                const isAcitve = i==0;
                const slideshowImage = { url: fullViewImages[i], active: isAcitve} as SlideshowImage;
                images.list.push(slideshowImage);
            }
        }


        return {
            racket,
            images
        }
    },
})
</script>

<style lang="scss" scoped>
    .racket-info {
        
        &__slideshow-images {
            position: relative;

            &--image {
                width: 100%;

                &-hidden {
                    display: none;
                }
            }


        }
    }
</style>
