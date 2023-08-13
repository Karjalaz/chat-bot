<script setup>
import { ref } from 'vue';
import ChatBotPage from './../pages/chat-bot-page.vue';
import TheHeader from './the-header.vue';

const botInit = ref(false);
</script>

<template>
    <the-header/>
    <div v-if="botInit">
        <chat-bot-page/>
    </div>
    <div>
        Test
    </div>
</template>