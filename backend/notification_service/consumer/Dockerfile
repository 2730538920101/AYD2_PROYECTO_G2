# Usa la versión LTS para evitar problemas de compatibilidad
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias para optimizar el uso de la caché de Docker
COPY package*.json ./

# Instala todas las dependencias listadas en el package.json
RUN npm install

# Copia el resto del código de la aplicación
COPY . .


# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
