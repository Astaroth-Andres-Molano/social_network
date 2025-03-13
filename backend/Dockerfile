#imagen base de Node.js
FROM node:18-alpine

WORKDIR /app

# Copia de package.json 
COPY package*.json ./

#Instalación de las dependencias del proyecto
RUN npm install

# Copia del código
COPY . .

#Puerto
EXPOSE 5000

#Comando de inicio
CMD ["npm", "start"]
