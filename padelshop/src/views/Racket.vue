<template>
    <div class="racket-info">
        <div class="racket-info__slideshow-images">
            <img class="racket-info__slideshow-images--image" :class="{ 'racket-info__slideshow-images--image-active': imgData.active }" :src="imgData.url" 
            v-for="(imgData, index) in images.list" :key="index">
            <div class="racket-info__slideshow-images--arrow" @click="PrevImage"><span>❮</span></div>
            <div class="racket-info__slideshow-images--arrow racket-info__slideshow-images--arrow-right" @click="NextImage"><span>❯</span></div>
        </div>
        <div>
            {{racket.fields.RacketName}} - {{racket.fields.Price}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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
        const currentImageIndex = ref(0);

        if (racket != undefined){
            const fullViewImages = racket?.fields?.FullImg?.split(",");
            for (var i=0; i<fullViewImages.length; i++) {
                const isAcitve = i==0;
                const slideshowImage = { url: fullViewImages[i], active: isAcitve} as SlideshowImage;
                images.list.push(slideshowImage);
            }
        }

        function NextImage() {
            const currentImage = images.list[currentImageIndex.value];
            let nextImage = undefined;
            if (currentImageIndex.value != images.list.length-1) {
                nextImage = images.list[currentImageIndex.value++]
            }
            else {
                nextImage = images.list[0];
                currentImageIndex.value = 0;
            }
            // const nextImage = currentImageIndex.value != images.list.length-1 ? images.list[currentImageIndex.value++] : images.list[0];
            currentImage.active = false;
            nextImage.active = true;
        }

        function PrevImage() {
            const currentImage = images.list[currentImageIndex.value];
            let nextImage = undefined;
            if (currentImageIndex.value != 0){
                nextImage = images.list[currentImageIndex.value--];
            }
            else {
                nextImage = images.list[images.list.length-1];
                currentImageIndex.value = images.list.length-1; 
            }

            // const nextImage = currentImageIndex.value != 0 ? images.list[currentImageIndex.value--] : images.list[images.list.length-1];
            currentImage.active = false;
            nextImage.active = true;
        }

        return {
            racket,
            images,
            NextImage,
            PrevImage
        }
    },
})
</script>

<style lang="scss" scoped>
    .racket-info {
        max-width: 500px;
        margin: auto;

        &__slideshow-images {
            position: relative;

            &--image {
                width: 100%;
                display: none;

                &-active {
                    display: block;
                }
            }

            &--arrow {
                cursor: pointer;
                position: absolute;
                top: 0;
                width: auto;
                color: white;
                font-weight: bold;
                font-size: 18px;
                transition: 0.6s ease;
                user-select: none;
                display: flex;
                align-items: center;
                height: 100%;
                padding-left: 10px;

                &-right {
                    right: 0;
                    padding-left: 0;
                    padding-right: 10px;

                    &:hover {
                        box-shadow: inset -16px 0px 19px -18px black !important;
                    }
                }

                &:hover {
                    box-shadow: inset 16px 0px 19px -18px black;;
                }
            }
        }
    }
</style>
