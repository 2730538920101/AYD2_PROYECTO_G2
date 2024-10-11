## Pasos para crear la arquitectura master - slave de jenkins 

### Estructura de archivos

```
cicd/
└── kubernetes/
    ├── deployment/
    │   ├── jenkins-master.yml
    │   └── jenkins-slave.yml
    ├── service/
    │   ├── jenkins-master-service.yml
    │   └── jenkins-slave-service.yml
    └── config/
        └── jenkins-config.yml

```


##  Despliegue
Para desplegar estos recursos, puedes ejecutar los siguientes comandos en la terminal, desde la carpeta cicd/kubernetes/:

kubectl apply -f config/jenkins-config.yml
kubectl apply -f deployments/jenkins-master.yml
kubectl apply -f deployments/jenkins-slave.yml
kubectl apply -f services/jenkins-master-service.yml
kubectl apply -f services/jenkins-slave-service.yml
