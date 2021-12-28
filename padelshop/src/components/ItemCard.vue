<template>
    <div class="card">
        <img :src="imageSrc" @error="OnImgError()">
        <div class="card__info">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        imageAltText: {
            type: String,
            required: true
        }
    },
    setup(props) {
        
        const imgError = ref(false);
        const imgSrc = computed(() => !imgError.value ? props.imageSrc : require(`@/assets/no_image.jpg`));

        function OnImgError() {
            console.log("OnImgError called");
            imgError.value = true;
        }

        return {
            imgSrc,
            OnImgError
        }
    },
})
</script>

<style lang="scss" scoped>
    .card {
        display: inline-block;
        width: 200px;
        height: 265px;
        // box-shadow: -10px 8px 15px lightgray, /*left and bottom*/
        //     10px 8px 15px lightgray; /*right and bottom*/
        border-radius: 10px;
        overflow: hidden;
        margin: 0 11px;
        box-shadow: 0 7px 14px rgb(0 0 0 / 10%);
        transition: all ease .25s;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px -15px rgb(0 0 0 / 20%);
            cursor: pointer;
        }

        img {
            width: 100%;
            height: 200px;
        }

        &__info {
            background-color: #DEDEDE;
            padding: 5px;
            margin-top: -4px;
            height: 65px;

            &--heading {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
