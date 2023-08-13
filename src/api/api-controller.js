import { processResponse, processError } from './http-clients.js';

class ApiController {

    constructor(unit, apiKey, language, client) {
        this.measurementUnit = unit;
        this.apiKey = apiKey;
        this.language = language;
        this.client = client;
    }

    __callGetMethod(path, args) {
        return this.client.get(
            path, 
            { params: args }
        )
        .then(async response => processResponse(response))
        .catch(error => processError(error));
    }
}

export default ApiController;