FROM node:10.15.3-alpine as builder
WORKDIR /survey-web
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 3002
CMD [ "npm", "start" ]