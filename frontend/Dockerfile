# Paso 1: Construir la aplicación de React
FROM node:18-alpine as build

WORKDIR /app

# Copiar los archivos de dependencias y los archivos de la aplicación
COPY package*.json ./
RUN npm install
COPY . .

# Construir la aplicación de React
RUN npm run build

# Paso 2: Usar la imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos de React al contenedor de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80


