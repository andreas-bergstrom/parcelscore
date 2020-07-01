FROM node:14.4.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .