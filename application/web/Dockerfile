FROM node:14

WORKDIR /web

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=0 ./web/nginx.conf /etc/nginx/conf.d

COPY --from=0 ./web/build /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]