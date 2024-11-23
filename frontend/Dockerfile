FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 5173
