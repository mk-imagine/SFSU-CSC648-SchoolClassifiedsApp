FROM node:17

WORKDIR /server
COPY package.json .
RUN npm install
RUN npm install --global nodemon
COPY . .
EXPOSE 8080
CMD [ "nodemon", "index.js" ]

