<script setup>
import lines from './../assets/json/eng-lines.json';
import { getBotData } from './../composable/bot-state.js';

const { 
    isBotInit,
    killBot
} = getBotData();
</script>

<template>
    <div class="header main-gradient flex flex-row justify-between text-white align-middle 
        items-center py-3 px-3 rounded hover:animate-squish delay-300">
        <img 
            class="header__img"
            src="./../assets/img/icon-robot-white.svg"
            alt="Robot icon">
        <h1 class="header__text font-bold text-lg text-center cursor-default">
            {{  lines.botName }}
        </h1> 
        <p 
            class="header__close font-bold text-xl m-0 p-4 cursor-pointer"
            :class="{'invisible': !isBotInit()}"
            @click="killBot()">
            x
        </p>
    </div>
</template>

<style scoped>
.header__img {
    width: 48px;
    height: 48px;
}
</style>