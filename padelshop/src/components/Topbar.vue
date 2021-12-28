<template>
    <div class="topbar">
        <div class="topbar__left"></div>
        <div class="topbar__name">RecPadel</div>
        <div class="topbar__right"></div>
    </div>
</template>

<style lang="scss" scoped>
    .topbar {
        position: fixed;
        height: 50px;
        background-color: #339196;
        display: flex;
        justify-content: space-between;
        top: 0;
        left: 0;
        right: 0;

        &__name {
            align-self: center;
            color: white;
            font-weight: 600;
        }
    }
</style>
