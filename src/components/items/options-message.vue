<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { getLanguageInfo } from './../../composable/language-state.js';

const props = defineProps({
    message: String
});

const {
    getText
} = getLanguageInfo();

const animationAppeared = ref(false);
const text = ref('...');

onMounted(() => {
    setTimeout(() => {
        animationAppeared.value = true;
    }, 500);

    setTimeout(() => {
        text.value = props.message;
    }, 1500);
})
</script>

<template>
    <div
        class="options-message flex flex-row items-center mt-2">
        
    </div>
</template>

<style scoped>

</style>