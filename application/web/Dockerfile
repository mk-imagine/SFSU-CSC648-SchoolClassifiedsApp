FROM alpine:3.15 as builder

RUN apk add --update --no-cache curl nodejs npm

WORKDIR /app

COPY package.json .
RUN npm install

# Copy source code
COPY . .

# Build
RUN npm run build


FROM nginx

# install bash so we can run the mustache template script
RUN apt-get install -y bash

COPY deploy/nginx /etc/nginx/conf.d

# copy built code from build-stage
COPY --from=builder /app/build /var/www/html

RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
