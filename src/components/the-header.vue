<script setup>
import lines from '@/assets/json/eng-lines.json';
import { getBotData } from '@/composable/bot-state.js';
import { getMessageData } from '@/composable/message-history';

const { 
    isBotInit,
    showAlert,
    isBotTyping
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
        <div class="header__text flex flex-col text-center">
            <h1 class="header__title font-bold cursor-default">
                {{  lines.botName }}
            </h1> 
            <p v-if="isBotTyping()"
                class="header__type-text animate-bounce">
                {{ lines.botTypingText }}
            </p>
        </div>
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