FROM node:18-alpine


WORKDIR /gateway

COPY package*.json .

RUN npm install


COPY . .

CMD [ "npm","start" ]