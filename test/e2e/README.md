
# Pruebas e2e

Existe el archivo `taskfile.yaml`, para ejecutar estas instrucciones de manera más fácil. Requiere el programa [go-task/task](https://github.com/go-task/task). Los entornos pueden levantarse con `go-task start-test-env` y tirar con `go-task stop-test-env`

Luego de levantar el entorno de pruebas podemos abrir la ui de playwirght para ejecutar las pruebas

```bash
npx playwright test --ui
```

En estos comandos uso `tofu`, pero este puede ser reemplazado por `terraform`

## 1. Instalación de Dependencias

```bash
# Instalar las dependencias de Node.js y Playwright
npm install                                # Instala las dependencias especificadas en package.json
npx playwright install chromium            # Instala Chromium, necesario para las pruebas con Playwright
```

---

# 2. Configuración del Entorno de Pruebas en Docker

```bash
# Crear la red de Docker, si no existe
docker network create "ayd2_p1_external_test_network" 

# Levantar los servicios de Docker en segundo plano
docker compose -f docker-compose.test.yaml up -d

# Ejecutar el script para escribir a al archivo /test/files/clave.ayd la clave del administrador
./print_key.sh
```

---

# 3. Configuración del Entorno de Pruebas en AWS

```bash
# Navegar al directorio de infraestructura de pruebas
cd ../test-infrastructure

# Inicializar el entorno de AWS usando Tofu
tofu init                                   # Inicializa el entorno
tofu apply --auto-approve                   # Aplica los cambios en AWS sin aprobación manual

# Guardar las variables de entorno obtenidas de Tofu en el archivo .env_tf
echo "AWS_ACCESS_KEY_ID=$(tofu output -raw AWS_ACCESS_KEY_ID)" > .env_tf
echo "AWS_SECRET_ACCESS_KEY=$(tofu output -raw AWS_SECRET_ACCESS_KEY)" >> .env_tf
echo "AWS_BUCKET_NAME=$(tofu output -raw AWS_BUCKET_NAME)" >> .env_tf
echo "COGNITO_USER_POOL_ID=$(tofu output -raw COGNITO_USER_POOL_ID)" >> .env_tf
echo "COGNITO_USER_POOL_CLIENT_ID=$(tofu output -raw COGNITO_USER_POOL_CLIENT_ID)" >> .env_tf
echo "COGNITO_IDENTITY_POOL_ID=$(tofu output -raw COGNITO_IDENTITY_POOL_ID)" >> .env_tf
echo "SQS_QUEUE_URL=$(tofu output -raw SQS_QUEUE_URL)" >> .env_tf

# Combinar el archivo de variables estáticas con las generadas por Tofu en el archivo final .env
cat ../e2e/.env_static .env_tf > ../e2e/.env
```

---

### 4. Iniciar el Entorno de Pruebas Completo (AWS y Docker)

```bash
# Iniciar el entorno de AWS y Docker
cd ../test-infrastructure && tofu init && tofu apply --auto-approve

cd ../e2e
docker network create "ayd2_p1_external_test_network"
docker compose -f docker-compose.test.yaml up -d

# Ejecutar el script para escribir a al archivo /test/files/clave.ayd la clave del administrador
./print_key.sh
```

---

### 5. Detener el Entorno de Pruebas en AWS y Docker

```bash
# Detener y destruir la infraestructura de AWS
cd ../test-infrastructure
tofu destroy --auto-approve

# Detener los servicios de Docker
cd ../e2e
docker compose -f docker-compose.test.yaml down
```


Estas secciones separadas proporcionan una estructura clara y lógica de los comandos a ejecutar en cada fase del proceso de configuración, pruebas y limpieza de los entornos Docker y AWS.
