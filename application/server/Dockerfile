FROM node:lts-alpine
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3100
CMD [ "node", "index.js" ]