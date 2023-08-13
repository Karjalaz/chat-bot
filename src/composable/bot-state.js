import { ref } from 'vue';

const botInit = ref(false);

export const getBotData = () => {
    const initBot = () => botInit.value = true;

    const isBotInit = () => botInit.value;

    const killBot = () => botInit.value = false;

    return {
        initBot,
        isBotInit,
        killBot
    }
}