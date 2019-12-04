FROM node:10-alpine

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

EXPOSE 3000

CMD ["npm", "run", "start"]