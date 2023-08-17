<script setup>
import { getLanguageInfo } from './../composable/language-state';
import { getMessageData } from './../composable/message-history';
import { getBotData } from './../composable/bot-state';
import botMessage from '../components/items/bot-message.vue';
import optionsMessage from '../components/items/options-message.vue';
import userMessage from '../components/items/user-message.vue';
import { ref } from 'vue';

const {
    getText
} = getLanguageInfo();
const {
    getMessages
} = getMessageData();

const { 
    isOtherOption,
    botReaction
} = getBotData();

const text = getText();
const messages = getMessages();

const optionalAnswer = ref(null);

function sendMessage() {
    let type = messages[messages.length - 1].type;
    botReaction(optionalAnswer.value, type);
    optionalAnswer.value = '';
}
</script>

<template>
    <div class="chat-bot flex flex-col w-full h-full pb-8">
        <div class="chat-bot__messages h-auto overflow-scroll p-2">
            <ul class="flex flex-col">
                <li v-for="message in messages" :key="message.id">
                    <bot-message v-if="message.from=='bot'" :message="message"/>
                    <options-message v-if="message.from=='options'" :message="message"/>
                    <user-message v-if="message.from=='user'" :message="message"/>
                </li>
            </ul>
        </div>
        <Transition name="slide">
            <div 
                v-if="isOtherOption()"
                id="textInput"
                class="chat-bot__input-area flex flex-row mt-auto">
                <input 
                    id="input"
                    class="chat-bot__input w-full h-full p-4" 
                    :placeholder="text.inputPlaceholder"
                    v-model="optionalAnswer">
                <button 
                    class="text-lg w-1/6 mx-2 my-1 hover:animate-squish"
                    @click="sendMessage()">
                    >
                </button>
            </div>
        </Transition>
    </div>
</template>

<style>
.max-h-full {
    height: calc(100% - 84px);
    max-height: calc(100% - 84px)
}
.chat-bot__input {
   border: solid 2px rgb(131,58,180); 
   border-radius: 8px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.chat-bot__messages::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chat-bot__messages {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.chat-bot__input-area {
    max-height: 100px;
}
.slide-enter-active, .slide-leave-active {
    transition: max-height 1s ease;
}

.slide-enter-from, .slide-leave-to {
    max-height: 0;
}

.slide-leave-from, .slide-enter-to {
    max-height: 100px;
}
</style>