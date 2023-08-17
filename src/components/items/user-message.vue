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
            class="user-message p-4 flex flex-col 
                sm:max-w-[60%] min-w-1/3 w-fit self-end ml-auto">
            <h1 v-if="props.message.withIcon"
                class="user-message__user-name w-fit text-secondary">
                {{  getText().userName }}
            </h1>
            <p 
                class="user-message__messages w-fit">
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

.show-enter-active, .show-leave-active {
    transition: opacity .8s ease-in-out;
}

.show-enter-from, .show-leave-to {
    opacity: 0;
}

.show-enter-to, .show-leave-from {
    opacity: 1;
}
</style>