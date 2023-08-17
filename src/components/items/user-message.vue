<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { getLanguageInfo } from './../../composable/language-state.js';

const props = defineProps({
    message: Object
});

const {
    getText
} = getLanguageInfo();

const messageVisible = ref(false);

onMounted(() => {
    console.log(props.message);
    setTimeout(() => {
        messageVisible.value = true;
    }, props.message.timeout);
})
</script>

<template>
    <Transition name="show" mode="out-in">
        <div v-if="messageVisible"
            class="user-message p-4 flex flex-col me-2 ml-auto mt-2">
            <h1 v-if="props.message.withIcon"
                class="user-message__user-name text-secondary text-end">
                {{  getText().userName }}
            </h1>
            <p 
                class="bot-message__messages text-end">
                {{ props.message.text }}
            </p>
        </div>
    </Transition>
</template>

<style scoped>
.user-message {
    border: solid 2px rgb(252,176,69); 
    border-radius: 6px;
}

.user-message {
    max-width: 60%;
}

.show-enter-active {
    transition: opacity 1s ease-in-out;
}

.show-leave-active {
    transition: opacity 1s ease;
}

.show-enter-from {
    opacity: 0;
}
.show-leave-to {
    opacity: 0;
}

.show-enter-to {
    opacity: 1;
} 

.show-leave-from {
    opacity: 1;
}
</style>