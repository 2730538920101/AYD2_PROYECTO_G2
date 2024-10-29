[REGRESAR](../../README.md)

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
-   kubectl apply -f config/secret.yml
-   kubectl apply -f config/volume.yml
-   kubectl apply -f deployments/deployment.yml
-   kubectl apply -f services/service.yml

##  Dar de baja a los recursos del cluster
Para eliminar estos recursos del cluster, puedes ejecutar los siguientes comandos en la terminal, desde la carpeta cicd/kubernetes/:


-   kubectl delete -f deployments/deployment.yml
-   kubectl delete -f config/volume.yml
-   kubectl delete -f config/secret.yml
-   kubectl delete -f config/serviceAccount.yml
-   kubectl delete -f config/namespace.yml


## Ver todos los elementos del namespace creado
-   kubectl get all -n devops-tools

## Ver logs del pod del jenkins master y obtener el password del admin
-   kubectl logs nombre_del_pod -n devops-tools

##  Para conectarme a la instancia de jenkins

-   copiar la EXTERNAL-IP del service levantado (LoadBalancer)
-   pegar en el navegador y escribir ":" luego del texto pegado
-   copiar el puerto expuesto (8080)
-   pegar en el navegador seguido de los ":" y presionar enter
-   Inicializar Jenkins, usar el admin password que genera el contenedor de jenkins y pegarlo donde lo solicita jenkins para iniciar

##  Guia de instalacion de Jenkins master con kubernetes

[Instalar Jenkins master con kubernetes](https://devopscube.com/setup-jenkins-on-kubernetes-cluster/)

[REGRESAR](../../README.md)
