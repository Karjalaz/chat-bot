<script setup>
import { getLanguageInfo } from './../composable/language-state';
import { getMessageData } from './../composable/message-history';
import botMessage from '../components/items/bot-message.vue';

const {
    getText
} = getLanguageInfo();
const {
    getMessages
} = getMessageData();

const text = getText();
const messages = getMessages();
</script>

<template>
    <div class="chat-bot flex flex-col w-full h-full">
        <div class="chat-bot__messages p-2">
            <ul>
                <li v-for="message in messages" :key="message.id">
                    <bot-message v-if="message.from=='bot'" :message="message"/>
                </li>
            </ul>
        </div>
        <div class="chat-bot__input-area w-full mt-auto mb-6 px-6">
            <input 
                class="chat-bot__input w-full p-4" 
                :placeholder="text.inputPlaceholder">
        </div>
    </div>
</template>

<style>
.chat-bot__input {
   border: solid 2px rgb(131,58,180); 
   border-radius: 8px;
}
</style>