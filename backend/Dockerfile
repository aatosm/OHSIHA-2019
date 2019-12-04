FROM node:10-alpine

WORKDIR /backend

COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 80

CMD ["npm", "run", "start"]