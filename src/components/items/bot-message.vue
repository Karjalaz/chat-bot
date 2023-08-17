<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { getLanguageInfo } from '@/composable/language-state.js';

const props = defineProps({
    message: Object
});

const {
    getText
} = getLanguageInfo();

const messageVisible = ref(false);

onMounted(() => {
    setTimeout(() => {
        messageVisible.value = true;
    }, props.message.timeout);
})
</script>

<template>
    <Transition name="show" mode="out-in">
        <div v-if="messageVisible"
            class="bot-message flex flex-row items-center">
            <img 
                class="bot-message__avatar p-2"
                :class="{'invisible': !props.message.withIcon}"
                src="./../../assets/img/icon-robot.svg"
                alt="robot avatar">
            <div
                class="bot-message__text p-4 flex flex-col ml-2"
                key="text">
                <h1 v-if="props.message.withIcon"
                    class="bot-message__bot-name text-primary">
                    {{  getText().botName }}
                </h1>
                <p 
                    class="bot-message__messages">
                    {{ props.message.text }}
                </p>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.bot-message__text {
    border: solid 2px rgb(131,58,180); 
    border-radius: 6px;
}

.bot-message__avatar {
    border: solid 2px rgb(131,58,180); 
    border-radius: 26px;
    background-color: rgba(131,58,180,.2);
    width: 64px;
    height: 64px;
}

.show-enter-active, show-leave-active {
    transition: opacity .8s ease-in-out;
}

.show-enter-from, .show-leave-to {
    opacity: 0;
}

.show-enter-to, .show-leave-from {
    opacity: 1;
} 
</style>