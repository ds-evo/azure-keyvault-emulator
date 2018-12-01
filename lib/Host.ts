import * as http from 'http';
import { isNullOrEmpty, isNullOrWhitespace, isNullOrUndefined, emptyString } from '@delta-framework/core';
import { SubscribtionsRepository } from './Subscribtions';

// todo logging:
export const runHost = (subscribtions: SubscribtionsRepository, port = 10003) => {

    const server = http.createServer((request, response) => {
      if (isNullOrEmpty(request.url)) return returnResponse(response, 404);
      console.log(request.url);
      if (request.url.indexOf('/secret/') === -1) return returnResponse(response, 404);

      const parts = request.url
        .split('/')
        .filter(isNullOrWhitespace);
      if (parts[1] !== 'secret') return returnResponse(response, 404);

      const secret = subscribtions.getSecret(parts[0], parts[2]);
      if (isNullOrUndefined(secret)) return returnResponse(response, 404);

      return returnResponse(response, 200, secret);
    });

    server.listen(port, (err) => {
      if (! isNullOrUndefined(err)) {
          console.error('Something bad happened', err);
          process.exit(-1);
      }

      console.info('Started Azure KeyVault emulator');
      console.info(`http://localhost:${port}/{subscribtionName}/secret/{secretKey}`);
      console.log();
    });
};

const returnResponse = (response: http.ServerResponse, status: number, value?: object | null): void => {

  console.info(`Returning response code ${status}`);

  response.statusCode = status;
  response.write(isNullOrUndefined(value) ? emptyString : JSON.stringify(value));
  response.end();
};