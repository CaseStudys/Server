FROM node:14 as base

WORKDIR /home/node/app

COPY package.json ./

RUN npm i
RUN npm install cros
RUN npm install nodemon
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build