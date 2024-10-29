[REGRESAR](../../README.md)

#   Configuracion inicial del Jenkins master

-   Primero se debe ingresar el admin password

![Ingreso del admin password](/cicd/jenkins/jenkins-manual/ingresar-admin-password.png)

-   Crear usuario administrado

![Crear admin user](/cicd/jenkins/jenkins-manual/Crear-usuario-administrador.png)

-   Definir jenkins URL

![Definir URL de Jenkins](/cicd/jenkins/jenkins-manual/definir-jenkins-url.png)

-   Instalar los plugins sugeridos

![Instalar plugins sugeridos](/cicd/jenkins/jenkins-manual/Instalar-plugins-sugeridos.png)

-   Inciar Jenkins

![Iniciar jenkins](/cicd/jenkins/jenkins-manual/start-jenkins.png)

-   Opciones del panel del administrador    

![Panel de administrador](/cicd/jenkins/jenkins-manual/panel-administrador.png)

-   Habilitar la configuracion de proxy en la seccion de configuracion general, apartado de seguridad

![Habilitar proxy](/cicd/jenkins/jenkins-manual/activar-proxy.png)

-   Probar la conexion con el cluster de Kubernetes de EKS

![Conexion al cluster](/cicd/jenkins/jenkins-manual/setup-eks-cluster-test-connection.png)

-   Configurar agentes de ejecucion para el master

![Configurar build agents](/cicd/jenkins/jenkins-manual/master-config-deploy-agents.png)

#   Configuracion de los Jenkins slaves

-   Configurar un cloud

![Cloud configuracion](/cicd/jenkins/jenkins-manual/menu-clouds.png)

-   Ingresar parametros de conexion al cloud

![Conexion al cloud](/cicd/jenkins/jenkins-manual/name-cloud.png)

-   Instalar plugin de kubernetes y demas plugins que se utilizaran en los slaves

![Kubernetes plugin](/cicd/jenkins/jenkins-manual/instalar-plugins.png)

-   Configuracion del Pod template

![Pod template](/cicd/jenkins/jenkins-manual/pod-template-menu.png)

-   Agregar un Pod label

![Pod label](/cicd/jenkins/jenkins-manual/pod-label-configuration.png)

-   Configurar un Container template para los slaves

![Container template](/cicd/jenkins/jenkins-manual/container-template.png)

-   Configurar un job de prueba

![Job de prueba](/cicd/jenkins/jenkins-manual/test-config1.png)

![Configuracion Job](/cicd/jenkins/jenkins-manual/test-config2.png)

-   Resultado del JOB de prueba

![Test result](/cicd/jenkins/jenkins-manual/test-result.png)


#   Para contruir imagenes de docker en jenkins corriendo en kubernetes, es necesaria la implementacion de la herramienta KANIKO

-   Primero se debe crear un secret que almacene las credenciales de dockerhub en el entorno de kubernetes donde esta corriendo jenkins

'''
 kubekubectl create secret docker-registry dockerhub-credentials-secret \
  --docker-username=docker-hub-username \
  --docker-password=dockerhub-passkey \
  --docker-email=docker-hub-email \
  -n devops-tools

'''

Recuerda que el password debe ser un token app password de dockerhub

# Manifesto de git y kaniko para hacer el build y push de imagenes de docker como agente de jenkins en kubernetes

'''
apiVersion: v1
            kind: Pod
            metadata:
              labels:
                agent: multi-stage
            spec:
              containers:
                - name: git
                  image: alpine/git
                  command:
                    - cat
                  tty: true
                - name: kaniko
                  image: gcr.io/kaniko-project/executor:debug
                  imagePullPolicy: Always
                  command:
                    - sleep
                  args:
                    - "9999999"
                  volumeMounts:
                    - name: jenkins-docker-cfg
                      mountPath: /kaniko/.docker
              volumes:
                - name: jenkins-docker-cfg
                  projected:
                    sources:
                      - secret:
                          name: dockerhub-credentials-secret ## AQUI SE DEBE MODIFICAR EL NOMBRE DEL SECRET POR EL SECRET CREADO CON EL COMANDO DE KUBECTL
                          items:
                            - key: .dockerconfigjson
                              path: config.json
'''

## Como crear un pipeline básico en Jenkins

["Guía para la creación, configuración y ejecución de un pipeline con Jenkins](https://www.jenkins.io/doc/pipeline/tour/hello-world/)

## Como configurar un WebHook

["Video de apoyo para configurar el WebHook de Github](https://www.youtube.com/watch?v=Uu8_cb0WRAw)

##  Resultados de la ejecución del pipeline

["Jenkins pipeline output"](jenkins-manual/pipeline_run.jpg)


[REGRESAR](../../README.md)