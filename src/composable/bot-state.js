import { ref, computed, reactive, watch } from 'vue';
import { getMessageData } from './message-history';
import { getLanguageInfo } from './language-state';
import { ruClient, engClient } from '@/api/open-weather-api';

const {
    addBotMessage,
    addUserMessage,
    addUserOptions,
    getMessages 
} = getMessageData();

const {
    getText,
    chosenLanguage
} = getLanguageInfo();

const botInit = computed(() => getMessages().length > 0);

const alert = ref(false);

const botTyping = ref(false);

function startBotAnswer(timeout = 0) {
    setTimeout(() => {
        botTyping.value = true;
    }, timeout);
}

function endBotAnswer(timeout = 0) {
    setTimeout(() => {
        botTyping.value = false;
    }, timeout);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const text = getText();

const otherOption = ref(false);

function formatTemperature(temp) {
    let roundedTemp = Math.round(temp);
    if (roundedTemp > 0)
        return `+${roundedTemp}°C`;
    else 
        return `${roundedTemp}°C`;
}

const apiClient = computed(() => (chosenLanguage() == 'eng') ? engClient : ruClient);

function getLocation() {
    getLocationInfo();
}

function sendBotInitMessages(message) {
    startBotAnswer();
    endBotAnswer(1800);

    addBotMessage(message, 0, true);
    addBotMessage(text.questionText[getRandomInt(3)], 1000, false);
    addUserOptions(text.userInteractions, null, 1100);

}

async function getWeatherInfoByLocal(local) {
    let weather = await apiClient.value.getCurrentWeatherByCityName(local);
    if (weather.success) {
        console.log(weather);
        sendWeatherInfo(weather);
    } else {
        sendBotInitMessages(text.botCityNotFoundError);
    }
}

const geoLocation = reactive({
    lon: null,
    lat: null
});

const locationReceived = ref(null);

const locationSuccessCallback = (position) => {
    geoLocation.lat = position?.coords?.latitude ?? null;
    geoLocation.lon = position?.coords?.longitude ?? null;
    locationReceived.value = true;
};
  
const locationErrorCallback = (error) => {
    geoLocation.lat = null;
    geoLocation.lon = null;
    locationReceived.value = false;
};

async function getLocationInfo() {
    navigator
        .geolocation
        .getCurrentPosition(
            locationSuccessCallback, 
            locationErrorCallback
        );
}

function sendWeatherInfo(weather) {
    let city = weather.name;
    let temperature = formatTemperature(weather.main.temp);
    let feelsLike = formatTemperature(weather.main.feels_like);
    let description = (weather.weather[0]?.description ?? '')
    let capitalizedDescription = '';
    if (description.length > 0)
        capitalizedDescription = description.charAt(0).toUpperCase()
            + description.slice(1);
    
    
    let template = text.botSuccessReaction.find(it => it.type == 'weather');
    template = template.reaction;

    sendBotInitMessages(
        `${template.beforeCity} ${city}: ${template.afterCity} ${temperature}, `
        + `${template.afterTemperature} ${feelsLike}. ${capitalizedDescription}.` 
    );
}

watch(locationReceived, async (newValue) => {
    if (newValue) {
        let weather = await apiClient
            .value
            .getCurrentWeatherByCoords(geoLocation.lat, geoLocation.lon);
        if (weather.success) {
            sendWeatherInfo(weather);
        }
    } else {
        sendBotInitMessages(text.botGeolocationError);
    }
});

export const getBotData = () => {
    const initBot = () => {
        if (!botInit.value) {  
            sendBotInitMessages(text.helloText);
        }
    };

    const isBotInit = () => botInit.value;

    const choseInteraction = (_text, _type = null) => {
        addUserMessage(_text, _type, 800);
        startBotAnswer(800);

        addBotMessage(text.botAnswers.find(it => it.type == _type).text, 1000);
        addUserOptions(text[_type+'Variants'], _type, 1500);

        endBotAnswer(1500);
    }

    const choseOption = (_text, _type) => {
        if (_text == text.otherTextVariant) {
            otherOption.value = true;

            return;
        }

        if (_type == 'weather') {
            addUserMessage(_text, _type, 0);
            getLocation();

            otherOption.value = false;
            return;
        }

        botReaction(_text, _type);
    }

    const botReaction = (_text, _type) => {
        addUserMessage(_text, _type, 0);
        if (_type == 'weather') {
            getWeatherInfoByLocal(_text);
        } else {
            startBotAnswer();

            addBotMessage(
                text.botSuccessReaction.find(it => 
                    it.type == _type
                ).reaction, 
                1000
            );
            addUserOptions(text.userInteractions, null, 1100);

            endBotAnswer(1100);
        }
        otherOption.value = false;
    } 

    const isOtherOption = () => otherOption.value;

    const removeOtherOption = () => otherOption.value = false;

    const alertVisibility = () => alert.value;

    const showAlert = () => alert.value = true;

    const closeAlert = () => alert.value = false;

    const isBotTyping = () => botTyping.value;

    return {
        initBot,
        isBotInit,
        choseInteraction,
        choseOption,
        isOtherOption,
        botReaction,
        removeOtherOption,
        alertVisibility,
        showAlert,
        closeAlert,
        startBotAnswer,
        endBotAnswer,
        isBotTyping
    }
}