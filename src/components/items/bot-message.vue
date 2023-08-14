<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
    message: String
});

const animationAppeared = ref(false);
const text = ref('...');

onMounted(() => {
    animationAppeared.value = true;
    setTimeout(() => {
        text.value = props.message;
    }, 1500);
});
</script>

<template>
    <div
        class="bot-message flex flex-row items-center justify-between mt-2">
        <div class="bot-message__text p-4">
            <p 
                class="bot-message__messages"
                :class="{'animate-bounce': !animationAppeared}">
                {{ text }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.bot-message__text {
    border: solid 2px rgb(131,58,180); 
    border-radius: 6px;
}

.bot-message {
    max-width: 60%;
}

.show-enter-active {
    transition: max-width 1s ease;
}

.show-leave-active {
    transition: max-width 1s ease;
}

.show-enter-from {
    max-width: 0;
}
.show-leave-to {
    max-width: 0;
}

.show-enter-to {
    max-width: 60%;
} 

.show-leave-from {
    max-width: 60%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>