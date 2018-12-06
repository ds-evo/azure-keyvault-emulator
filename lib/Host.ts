import * as http from 'http';
import { isNullOrEmpty, isNullOrWhitespace, isNullOrUndefined, emptyString } from '@delta-framework/core';
import { getSubscribtionsRepository } from './Subscribtions';
import { setDaemonName, setProcessId } from './Process';

const portNumber = 10003;

const runHttpHost = () => new Promise((resolve, reject) => {

    const server = http.createServer(async (request, response) => {
        if (isNullOrEmpty(request.url)) return returnResponse(response, 404);
            console.log(request.url);

        const parts = request.url
          .split('/')
          .filter(part => !isNullOrWhitespace(part));

        if (parts[1] !== 'secret') {
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

        console.info(`http://localhost:${portNumber}/{subscribtionName}/secret/{secretKey}`);
        console.log();
        resolve();
    });
});

const returnResponse = (response: http.ServerResponse, status: number, value?: object | null): void => {

    console.info(`Returning response code ${status}`);

    response.statusCode = status;
    response.write(isNullOrUndefined(value) ? emptyString : JSON.stringify(value));
    response.end();
};

const runEmulator = async () => {

    setDaemonName();
    await setProcessId(process.pid);
    await runHttpHost();
};

runEmulator();