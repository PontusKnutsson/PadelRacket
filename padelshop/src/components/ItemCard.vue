<template>
    <div class="card">
        <img :src="props.imageSrc" :alt="props.imageAltText">
        <slot></slot>
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
        height: 100px;
        width: 50px;

        img {
            width: 100%;
            height: 70px;
        }
    }
</style>
