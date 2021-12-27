<template>
    <div class="card">
        <img :src="props.imageSrc" :alt="props.imageAltText">
        <div class="card__info">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
        
        return {
            props
        }
    },
})
</script>

<style lang="scss" scoped>
    .card {
        display: inline-block;
        min-height: 300px;
        width: 200px;
        box-shadow: -10px 8px 15px lightgray, /*left and bottom*/
            10px 8px 15px lightgray; /*right and bottom*/

        img {
            width: 100%;
        }

        &__info {
            color: lightgray;
        }
    }
</style>
