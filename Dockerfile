FROM node:12.20-alpine3.12 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN apk add --no-cache make gcc g++ python3
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY --from=build /app/dist/PortalApp /usr/share/nginx/html

ENTRYPOINT ["/entrypoint.sh"]
