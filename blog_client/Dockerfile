FROM node:alpine as build
WORKDIR /app
COPY package.json ./
RUN npm i -g npm@latest
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build ./app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
