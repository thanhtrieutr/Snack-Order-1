# Docker for client
FROM node:11

RUN pwd
WORKDIR /usr/src/app

ADD . /usr/src/app

WORKDIR /usr/src/app/client
RUN npm install
RUN npm rebuild node-sass

CMD [ "npm", "run", "build"]