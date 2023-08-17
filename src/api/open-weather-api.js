import { openWeatherHttpClient } from './http-clients.js';
import ApiController from './api-controller.js';

class OpenWeather extends ApiController {
    getCurrentWeatherByCoords(latitude, longitude) {
        return super.__callGetMethod(
            '/weather',
            {
                lat: latitude,
                lon: longitude,
                units: this.measurementUnit,
                appid: this.apiKey,
                lang: this.language
            }
        );
    }
    
    getCurrentWeatherByCityName(cityName, countryCode = null) {
        return super.__callGetMethod(
            '/weather',
            {
                q: (cityName && countryCode) ? `${cityName},${countryCode}` : cityName,
                units: this.measurementUnit,
                appid: this.apiKey,
                lang: this.language
            }
        );
    }
}

const ruClient = new OpenWeather('metric', import.meta.env.VITE_OPEN_WEATHER_API_KEY, 'ru', openWeatherHttpClient);
const engClient = new OpenWeather('metric', import.meta.env.VITE_OPEN_WEATHER_API_KEY, 'eng', openWeatherHttpClient);

export {
    ruClient,
    engClient
}