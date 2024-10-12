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