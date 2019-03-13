FROM node:8.15-alpine

WORKDIR /backend

COPY package*.json /backend

RUN npm install

COPY . /backend/

CMD ["node", "server.js"]