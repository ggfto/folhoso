FROM node:18.17.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --omit=dev --only=production --build-from-source --python=/usr/bin/python3

COPY . .

CMD [ "node", "server.js" ]