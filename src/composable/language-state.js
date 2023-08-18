import { ref, computed } from 'vue';
import engLines from './../assets/json/eng-lines.json';
import ruLines from './../assets/json/ru-lines.json';

const language = ref('eng');

const languageChosen = ref(false);

const text = computed(() => (language.value == 'eng') ? engLines : ruLines);

export const getLanguageInfo = () => {

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

    return {
        setLangEng,
        setLangRus,
        isLangDefined,
        chosenLanguage,
        defineLanguage,
        getText
    }
}