#!/bin/sh

OUTPUT_FILE="./tests/files/clave.ayd"
CONTAINER_ID="test_app_service"

MYSQL_USER="root"
MYSQL_PASSWORD="proyecto1"
SQL_QUERY="USE PROYECTO_VIAJES; SELECT Administrador.CONTRASENIA FROM Administrador;"
#docker exec -it $CONTAINER_ID mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -N -B -e "$SQL_QUERY" |\
#    grep --invert-match --fixed-strings "mysql: [Warning]" |\
#    tee ${OUTPUT_FILE}

docker exec -it ${CONTAINER_ID} cat /app/clave.ayd |\
    tee ${OUTPUT_FILE}

echo ""
echo "La llave ha sido guardada en el archivo $OUTPUT_FILE"
