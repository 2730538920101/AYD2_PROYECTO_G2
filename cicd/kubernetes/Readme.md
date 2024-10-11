## Pasos para crear la arquitectura master - slave de jenkins 

### Estructura de archivos

```
cicd/
└── kubernetes/
    ├── deployments/
    │   ├── deployment.yml 
    ├── services/
    │   ├── service.yml
    └── config/
        └── namespace.yml
        └── serviceAccount.yml
        └── volume.yml
```


##  Despliegue
Para desplegar estos recursos, puedes ejecutar los siguientes comandos en la terminal, desde la carpeta cicd/kubernetes/:

-   kubectl apply -f config/namespace.yml
-   kubectl apply -f config/serviceAccount.yml
-   kubectl apply -f config/volume.yml
-   kubectl apply -f deployments/deployment.yml
-   bubectl apply -f services/service.yml


##  Guia de instalacion de Jenkins master con kubernetes

[Instalar Jenkins master con kubernetes](https://devopscube.com/setup-jenkins-on-kubernetes-cluster/)

