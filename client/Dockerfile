# Docker for client
FROM node:11

RUN pwd
ADD . /app
WORKDIR /app

RUN npm install
CMD [ "npm", "run", "build"]