import * as http from 'http';
import { isNullOrEmpty, isNullOrWhitespace, isNullOrUndefined, emptyString } from '@delta-framework/core';
import { SubscribtionsRepository } from './Secrets';

// todo logging:
export const runHost = (subscribtions: SubscribtionsRepository, port: number = 10003) => {

    const server = http.createServer((request, response) => {
      if(isNullOrEmpty(request.url)) return;
      console.log(request.url);
      if(request.url.indexOf('/secret/') === 1) return;

      const parts = request.url
        .split('/')
        .filter(isNullOrWhitespace);
      if(parts[1] !== 'secret') return returnResponse(response, 404);

      const subscribtion = subscribtions.getSecrets(parts[0]);
      if(isNullOrUndefined(subscribtion)) return returnResponse(response, 404);
      const secret = subscribtion[parts[2]];
      if(isNullOrUndefined(secret)) return returnResponse(response, 404);

      return returnResponse(response, 200, secret);
    });

    server.listen(port, (err) => {
      if (err) return console.log('something bad happened', err)
      console.log(`server is listening on ${port}`)
    });
};

const returnResponse = (response:http.ServerResponse, status: number, value?: object | null): void => {
  response.statusCode = status;
  response.write(isNullOrUndefined(value) ? emptyString : JSON.stringify(value));
}