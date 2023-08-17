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

const botInit = computed(() => getMessages().length > 0);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const text = getText();

const otherOption = ref(false);

function getWeatherInfo() {

}

export const getBotData = () => {
    const initBot = () => {
        if (!botInit.value) {        
            addBotMessage(text.helloText, 0, true);
            addBotMessage(text.questionText[getRandomInt(3)], 1000, false);
            addUserOptions(text.userInteractions, null, 1100);
        }
    };

    const isBotInit = () => botInit.value;

    const choseInteraction = (_text, _type = null) => {
        addUserMessage(_text, _type, 1000);
        addBotMessage(text.botAnswers.find(it => it.type == _type).text, 1500);
        addUserOptions(text[_type+'Variants'], _type, 2000);
    }

    const choseOption = (_text, _type) => {
        console.log(_text);
        console.log(_type);
        
        if (_text == text.otherTextVariant) {
            otherOption.value = true;
            return;
        }

        otherOption.value = false;

        if (_type == 'weather') {
            //todo
            getWeatherInfo();
            return;
        }

        botReaction(_type);
    }

    const botReaction = (_text, _type) => {
        addUserMessage(_text, _type, 1000);
        addBotMessage(text.botSuccessReaction.find(it => it.type == _type).reaction, 1500);
        addUserOptions(text.userInteractions, null, 1600);
        otherOption.value = false;
    } 

    const isOtherOption = () => otherOption.value;

    const removeOtherOption = () => otherOption.value = false;

    return {
        initBot,
        isBotInit,
        choseInteraction,
        choseOption,
        isOtherOption,
        botReaction,
        removeOtherOption
    }
}