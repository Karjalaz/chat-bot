import { ref, computed, reactive } from 'vue';
import engLines from './../assets/json/eng-lines.json';
import ruLines from './../assets/json/ru-lines.json';

const botInit = ref(false);

const language = ref('eng');

const languageChosen = ref(false);

const text = computed(() => (language.value == 'eng') ? engLines : ruLines);

const messageHistory = reactive ({
    items: []
});

export const getBotData = () => {
    const initBot = () => {
        botInit.value = true
        messageHistory.items.push({
            id: 0,
            from: 'bot',
            text: text.value.helloText
        });
    };

    const isBotInit = () => botInit.value;

    const killBot = () => botInit.value = false;

    const setLangRus = () => { 
        language.value = 'rus';
     };

    const setLangEng = () => {
        language.value = 'eng';
    }

    const isLangDefined = () => languageChosen.value;

    const chosenLanguage = () => language.value;

    const defineLanguage = () => languageChosen.value = true;

    const getText = () => text.value;

    const setMessageHistory = (history) => messageHistory.items = history;

    const getMessageHistory = () => messageHistory.items

    const addMessage = (message) => messageHistory.items.push(message)

    return {
        initBot,
        isBotInit,
        killBot,
        setLangEng,
        setLangRus,
        isLangDefined,
        chosenLanguage,
        defineLanguage,
        getText,
        setMessageHistory,
        getMessageHistory,
        addMessage
    }
}