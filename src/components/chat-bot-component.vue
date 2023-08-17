<script setup>
import chatBotPage from './../pages/chat-bot-page.vue';
import theHeader from './the-header.vue';
import choseLanguage from './chose-language.vue';
import { getBotData } from './../composable/bot-state.js';
import { getLanguageInfo } from './../composable/language-state.js';

const { 
    isBotInit,
    initBot
} = getBotData();

const {
    isLangDefined,
    getText
} = getLanguageInfo();

const text = getText();

function openChat() {
    initBot();
}
</script>

<template>
    <chose-language v-if="!isLangDefined()"/>
    <div v-else class="container flex h-full flex-col mb-2">
        <the-header class="header"/>
        <div v-if="isBotInit()" 
            class="page h-full">
            <chat-bot-page/>
        </div>
        <div v-else class="button-area flex flex-col justify-center h-full">
            <h2 class="text-black text-center text-lg font-semibold
                mt-auto mb-auto hover:animate-bounce delay-300 cursor-default">
                {{ text.initText }}
            </h2>
            <button 
                class="button-area__button text-white font-bold mb-6
                w-full px-6 py-4 hover:animate-squish delay-800 active mx-2"
                @click="openChat()">
                {{ text.initButtonText }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.header {
    z-index: 2;
}

.page {
    height: calc(100% - 84px);
}
</style>