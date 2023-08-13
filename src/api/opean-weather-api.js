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
    
    getCurrentWeatherByCityName(cityName, countryCode) {
        return super.__callGetMethod(
            '/weather',
            {
                q: (cityName && countryCode) ? `${cityName},${countryCode}` : cityName,
                units: this.measurementUnit,
                appid: this.apiKey,,
                lang: this.language
            }
        );
    }
}

export default new OpenWeather('metric', process.env.VUE_APP_OPEN_WEATHER_API_KEY, openWeatherHttpClient);