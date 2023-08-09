FROM node:12.20-alpine3.12

WORKDIR /app

ADD . .

RUN apk add --no-cache make gcc g++ python3
RUN npm install

ENTRYPOINT node_modules/.bin/ng serve --disableHostCheck --host 0.0.0.0
