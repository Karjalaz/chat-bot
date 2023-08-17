<script setup>
import chatBotPage from './chat-bot-page.vue';
import theHeader from '@/components/the-header.vue';
import choseLanguage from './chose-language.vue';
import { getBotData } from '@/composable/bot-state.js';
import { getLanguageInfo } from '@/composable/language-state.js';
import { getMessageData } from '@/composable/message-history.js';
import theAlert from '@/components/the-alert.vue';

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
    <div class="flex h-full w-full self-center flex-col">
        <the-header class="header"/>
        <the-alert></the-alert>
        <Transition 
            name="show" 
            mode="out-in" appear>
            <chose-language v-if="!isLangDefined()"/>
            <div v-else-if="isBotInit()" 
                class="page h-full">
                <chat-bot-page/>
            </div>
            <div v-else 
                class="button-area flex flex-col justify-center h-full
                    sm:px-4">
                <h1 class="text-black text-center font-semibold
                    mt-auto mb-auto hover:animate-bounce delay-300 cursor-default">
                    {{ text.initText }}
                </h1>
                <button 
                    class="button-area__button text-white font-bold
                    w-full px-6 py-4 hover:animate-squish delay-800 active
                    sm:mb-6 xl:text-xl"
                    @click="openChat()">
                    {{ text.initButtonText }}
                </button>
            </div>
        </Transition>
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