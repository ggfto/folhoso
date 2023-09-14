FROM node:18.17.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

CMD [ "node", "server.js" ]