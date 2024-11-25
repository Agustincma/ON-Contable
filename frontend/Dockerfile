# Etapa 1: Construcción de la aplicación React
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Configuración de producción con Nginx
FROM nginx:stable

# Copiar los archivos de la build de React
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto de Nginx
EXPOSE 80
