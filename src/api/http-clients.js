import axios from 'axios';

const openWeatherHttpClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

function processResponse(response) {
    let result = response.data;
    result.success = true;
    return result;
}

function processError(error) {
    let result = {
        success: false,
        error: {}
    };
    if (error.response) {
        result.error.status = error.response.status;
    }
    result.error.message = error.message;
    
    return result;
}

export {
    openWeatherHttpClient,
    processError,
    processResponse
}

