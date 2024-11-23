FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3005

CMD ["npm", "start"]
