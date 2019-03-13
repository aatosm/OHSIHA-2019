FROM node:8.15-alpine

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install

COPY . /frontend

CMD ["npm", "start"]