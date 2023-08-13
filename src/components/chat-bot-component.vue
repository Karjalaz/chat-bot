<script setup>
import { ref } from 'vue';
import ChatBotPage from './../pages/chat-bot-page.vue';
import TheHeader from './the-header.vue';
import lines from './../assets/json/eng-lines.json';
import { getBotData } from './../composable/bot-state.js';

const { 
    isBotInit,
    initBot
} = getBotData();
</script>

<template>
    <div class="container h-full flex flex-col">
        <the-header class="header"/>
        <div v-if="isBotInit()" class="page">
            <chat-bot-page/>
        </div>
        <div v-else class="button-area flex flex-col justify-center h-full">
            <h2 class="text-black text-center text-lg font-semibold
                mt-auto mb-auto hover:animate-bounce delay-300 cursor-default">
                {{ lines.initText }}
            </h2>
            <button 
                class="button-area__button text-white font-bold mb-6
                w-full px-6 py-4 hover:animate-squish delay-800"
                @click="initBot()">
                {{ lines.initButtonText }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.header {
    z-index: 2;
}
</style>