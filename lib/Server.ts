import * as http from 'http';
import { isNullOrEmpty, isNullOrWhitespace, isNullOrUndefined, emptyString } from '@delta-framework/core';
import { getSubscribtionsRepository } from './Subscribtions';

/** One port higher than the other emulators already present in the SDK from Microsoft */
const portNumber = 10003;

/**
 * Host an HttpServer to emulate Azure KeyVault responses
 */
export const hostHttpServer = () => new Promise((resolve, reject) => {

    const server = http.createServer(async (request, response) => {
        if (isNullOrEmpty(request.url)) return returnResponse(response, 404);
            console.log(request.url);

        const parts = request.url
          .split('/')
          .filter(part => !isNullOrWhitespace(part));

        if (parts[1] !== 'secrets') {
          console.warn('Invalid url requested');
          return returnResponse(response, 404);
        }

        const subscribtions = await getSubscribtionsRepository();
        const secret = await subscribtions.getSecret(parts[0], parts[2]);
        if (isNullOrUndefined(secret)) return returnResponse(response, 404);

        return returnResponse(response, 200, secret);
    });

    server.listen(portNumber, err => {
        if (! isNullOrUndefined(err)) reject(err);

        console.info(`http://localhost:${portNumber}/{subscribtionName}/secrets/{secretKey}`);
        console.log();

    });

    [ 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((eventType) => {
        process.on(eventType as any, () => resolve());
    });
});

/**
 * Return a http response and end the transaction
 * @param response Node http.ServerResponse
 * @param status Status code to use
 * @param value Response value (converts to json)
 */
const returnResponse = (response: http.ServerResponse, status: number, value?: object | null): void => {

    console.info(`Returning response code ${status}`);

    response.statusCode = status;
    response.write(isNullOrUndefined(value) ? emptyString : JSON.stringify(value));
    response.end();
};