# Stage 1
FROM node:lts-alpine AS build
WORKDIR /web
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:stable-alpine
COPY --from=0 ./web/build /usr/share/nginx/html
EXPOSE 3080
CMD ["nginx", "-g", "daemon off;"]