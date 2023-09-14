FROM node:18.16.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i --only=production

COPY . .

CMD [ "node", "server.js" ]