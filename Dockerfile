FROM node:14 as base

WORKDIR /home/node/app

COPY package.json ./

RUN npm i
RUN npm install cros
RUN npm install nodemon
RUN npm install --global yarn

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build