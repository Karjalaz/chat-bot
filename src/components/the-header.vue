<script setup>
import lines from './../assets/json/eng-lines.json';
</script>

<template>
    <div class="header flex flex-row justify-between text-white align-middle 
        items-center py-3 px-3 rounded hover:animate-squish delay-300">
        <img 
            class="header__img"
            src="./../assets/img/icon-robot-white.svg"
            alt="Robot icon">
        <h1 class="header__text font-bold text-lg text-center">
            {{  lines.botName }}
        </h1> 
        <p class="header__close font-bold text-xl m-0 py-4 cursor-pointer">
            x
        </p>
    </div>
</template>

<style scoped>
.header__img {
    width: 48px;
    height: 48px;
}

.header {
    background: rgb(131,58,180);
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
}
</style>