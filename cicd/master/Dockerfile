# Dockerfile para Jenkins Maestro

# Usa la imagen oficial de Jenkins LTS
FROM jenkins/jenkins:lts

# Instala los plugins necesarios para conectar esclavos
USER root
RUN jenkins-plugin-cli --plugins "docker-workflow ssh-slaves"

# Cambia de nuevo al usuario jenkins
USER jenkins

# Copia los archivos de configuración, si es necesario
# COPY config.xml /var/jenkins_home/config.xml

# Exponemos el puerto en el que Jenkins escuchará
EXPOSE 8080

# Comando por defecto para iniciar Jenkins
CMD ["jenkins.sh"]
