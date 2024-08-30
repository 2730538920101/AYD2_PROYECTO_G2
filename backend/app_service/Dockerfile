# Utiliza una imagen base de Ubuntu
FROM ubuntu:22.04

# Actualiza el sistema e instala las dependencias necesarias
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && apt-get clean

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY . /app

# Instala las dependencias
RUN pip3 install --no-cache-dir -r requirements.txt



# Comando para correr la API
CMD ["python3", "run.py"]