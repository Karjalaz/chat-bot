import { ref, computed, reactive } from 'vue';
import { getMessageData } from './message-history';
import { getLanguageInfo } from './language-state';

const {
    addBotMessage,
    addUserMessage,
    addUserOptions,
    getMessages 
} = getMessageData();

const {
    getText
} = getLanguageInfo();

const botInit = computed(() => messageHistory.items.length > 0);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const text = getText();

const messageHistory = reactive({
    items: getMessages()
});

const chatVisible = ref(false);

export const getBotData = () => {
    const initBot = () => {
        if (!botInit.value) {        
            addBotMessage(text.helloText, 0, true);
            addBotMessage(text.questionText[getRandomInt(3)], 1000, false);
            addUserOptions(text.userInteractions);
        }
    };

    const isBotInit = () => botInit.value;

    const isChatVisible = () => chatVisible.value;

    const setChatVisible = (value) => chatVisible.value = value;

    return {
        initBot,
        isBotInit,
        setChatVisible,
        isChatVisible
    }
}