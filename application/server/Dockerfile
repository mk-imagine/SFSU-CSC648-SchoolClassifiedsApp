FROM node:17.7.1

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]