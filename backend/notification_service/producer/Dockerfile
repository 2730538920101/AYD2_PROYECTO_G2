FROM node:20

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Copia los archivos de dependencias para optimizar el uso de la caché de Docker
COPY package*.json ./

# Instala todas las dependencias listadas en el package.json
RUN npm install

# Copia el resto del código de la aplicación
COPY . .


CMD [ "node", "index.js" ]