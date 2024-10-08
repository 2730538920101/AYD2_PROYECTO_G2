## Desarrollo

-   Los .env de cada servidor deben estar bien definidos para trabajar con localhost

## Build testing

-   Eliminar los comentarios del docker-compose de la carpeta database
-   Para hacer el testing de los contenedores en un entorno local, primero se debe levantar el contenedor de base de datos
-   Segundo se debe crear una red externa en docker con el comando: 
    -   docker network create ayd2_p1_external_network
-   Ejecutar el docker-compose.dev.yaml del directorio principal con el comando:
    -   docker-compose -f docker-compose.dev.yml down -v

## Produccion

-   Ejecutar docker-compose.prod.yml en el directorio principal, ya que en produccion la base de datos es un servicio de AWS con el comando:
    -   docker-compose -f docker-compose.prod.yml up -d