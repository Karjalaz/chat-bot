<script setup>
import { ref } from 'vue';
import ChatBotPage from './../pages/chat-bot-page.vue';

const botInit = ref(false);
</script>

<template>
    <div v-if="botInit">
        <chat-bot-page/>
    </div>
    <div>
        Test
    </div>
</template>