import { ref } from 'vue';

const botInit = ref(false);

const language = ref('eng');

const languageChosen = ref(false);

export const getBotData = () => {
    const initBot = () => botInit.value = true;

    const isBotInit = () => botInit.value;

    const killBot = () => botInit.value = false;

    const setLangRus = () => { 
        language.value = 'rus';
        languageChosen.value = true;
     };

    const setLangEng = () => {
        language.value = 'eng';
        languageChosen.value = true;
    }

    const isLangDefined = () => languageChosen.value;

    const chosenLanguage = () => language.value;

    const defineLanguage = () => languageChosen.value = true;

    return {
        initBot,
        isBotInit,
        killBot,
        setLangEng,
        setLangRus,
        isLangDefined,
        chosenLanguage,
        defineLanguage
    }
}