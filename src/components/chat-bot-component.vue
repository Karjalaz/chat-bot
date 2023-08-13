<script setup>
import { computed } from 'vue';
import chatBotPage from './../pages/chat-bot-page.vue';
import theHeader from './the-header.vue';
import engLines from './../assets/json/eng-lines.json';
import ruLines from './../assets/json/ru-lines.json';
import choseLanguage from './chose-language.vue';
import { getBotData } from './../composable/bot-state.js';

const { 
    isBotInit,
    initBot,
    isLangDefined,
    chosenLanguage
} = getBotData();

const text = computed(() => (chosenLanguage() == 'eng') ? engLines : ruLines);
</script>

<template>
    <chose-language v-if="!isLangDefined()"/>
    <div v-else class="container h-full flex flex-col">
        <the-header class="header"/>
        <div v-if="isBotInit()" class="page">
            <chat-bot-page/>
        </div>
        <div v-else class="button-area flex flex-col justify-center h-full">
            <h2 class="text-black text-center text-lg font-semibold
                mt-auto mb-auto hover:animate-bounce delay-300 cursor-default">
                {{ text.initText }}
            </h2>
            <button 
                class="button-area__button text-white font-bold mb-6
                w-full px-6 py-4 hover:animate-squish delay-800 active"
                @click="initBot()">
                {{ text.initButtonText }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.header {
    z-index: 2;
}
</style>