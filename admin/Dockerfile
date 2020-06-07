FROM node:10.15.3-alpine as builder
WORKDIR /admin
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]