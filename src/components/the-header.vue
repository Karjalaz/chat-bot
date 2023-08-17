<script setup>
import lines from '@/assets/json/eng-lines.json';
import { getBotData } from '@/composable/bot-state.js';
import { getMessageData } from '@/composable/message-history';

const { 
    isBotInit,
    showAlert
} = getBotData();

const {
    clearMessages
} = getMessageData();
</script>

<template>
    <div class="header main-gradient flex flex-row justify-between text-white align-middle 
        items-center py-3 px-3 rounded hover:animate-squish delay-300
        xl:px-12">
        <img 
            class="header__img"
            src="./../assets/img/icon-robot-white.svg"
            alt="Robot icon">
        <h1 class="header__text font-bold text-center cursor-default">
            {{  lines.botName }}
        </h1> 
        <h1 
            class="header__close font-bold m-0 p-4 cursor-pointer"
            :class="{'invisible': !isBotInit()}"
            @click="showAlert()">
            x
        </h1>
    </div>
</template>

<style scoped>
.header__img {
    width: clamp(3rem, 2.722rem + 1.481vw, 4.5rem);
    height: clamp(3rem, 2.722rem + 1.481vw, 4.5rem);
}

.header {
    z-index: 2;
}
</style>