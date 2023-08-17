<script setup>
import { getLanguageInfo } from '@/composable/language-state';
import { getBotData } from '@/composable/bot-state';
import { ref, onMounted } from 'vue';
import { getMessageData } from '@/composable/message-history.js';

const { getText } = getLanguageInfo();
const { clearMessages } = getMessageData();
const {
    alertVisibility,
    closeAlert
} = getBotData();

function close() {
    closeAlert();
    clearMessages();
}

onMounted(() => {
    console.log(getText().botName);
})
</script>

<template>
    <Transition name="show">
        <div v-if="alertVisibility()"
            class="alert w-full h-full flex justify-center items-center">
            <div class="alert__window mx-4 flex flex-col bg-white p-3 rounded
                md:p-6 xl:w-1/5">
                <h1 class="alert__header font-bold text-center">
                    {{ getText().alertTitle }}
                </h1>
                <p class="alert__text mt-2 text-center">
                    {{ getText().youSureToExitText }}
                </p>
                <div class="alert__options flex flex-row justify-between">
                    <h1 
                        class="px-6 cursor-pointer"
                        @click="close()">
                        V
                    </h1>
                    <h1 
                        class="px-6 cursor-pointer"
                        @click="closeAlert()">
                        X
                    </h1>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.alert {
    position: absolute;
    z-index: 3;
    background-color: rgba(0, 0, 0, .5);
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