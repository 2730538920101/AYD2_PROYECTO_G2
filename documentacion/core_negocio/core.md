## CORE DEL NEGOCIO

El core del negocio de Qnave se adapta a un entorno de escritorio, centrado en ofrecer un servicio de transporte privado en Guatemala a través de una plataforma tecnológica que interconecta a usuarios y conductores. A continuación, se detalla cómo cada componente interactúa a nivel operativo y de software en este contexto:

1. **Plataforma de Solicitud de Servicios**
    - **Componentes:**
        - **Aplicación de Escritorio del Usuario:** Una interfaz de software que los usuarios instalan en sus computadoras para solicitar servicios de transporte, ver el estado de las solicitudes, calificar a los conductores, y realizar pagos.
        - **Aplicación de Escritorio del Conductor:** Una interfaz de software que permite a los conductores recibir y aceptar solicitudes, ver rutas, contactar a los usuarios, y gestionar su disponibilidad.
    - **Interacción:**
        - Los usuarios utilizan la aplicación de escritorio para enviar solicitudes de transporte, especificando detalles como destino y tipo de servicio.
        - La plataforma, mediante un algoritmo de asignación, selecciona un conductor disponible y le envía la solicitud a través de su aplicación de escritorio.
        - Los conductores aceptan o rechazan las solicitudes desde su aplicación; en caso de rechazo, la solicitud se reasigna automáticamente a otro conductor disponible.

2. **Sistema de Registro y Verificación**
    - **Componentes:**
        - **Base de Datos de Usuarios y Conductores:** Almacena información personal, historial de viajes, y documentos de verificación.
        - **Sistema de Verificación de Identidad:** Un módulo dentro de la aplicación que valida la identidad de los usuarios y conductores, verificando documentos y antecedentes antes de habilitarlos en la plataforma.
    - **Interacción:**
        - Tanto usuarios como conductores se registran mediante la aplicación de escritorio, proporcionando la información necesaria que es validada automáticamente.
        - La verificación de identidad es un paso obligatorio previo al uso de la plataforma, asegurando que sólo los usuarios y conductores verificados puedan interactuar.

3. **Sistema de Asignación de Viajes**
    - **Componentes:**
        - **Algoritmo de Asignación:** Programado para seleccionar al conductor más adecuado en función de criterios predefinidos como proximidad, calificación, y disponibilidad.
    - **Interacción:**
        - Una vez que se recibe una solicitud, el sistema evalúa las opciones disponibles y asigna automáticamente un conductor.
        - El algoritmo puede también ajustarse para priorizar ciertos tipos de viajes o conductores según la demanda.

4. **Sistema de Seguridad**
    - **Componentes:**
        - **Botón de Pánico:** Disponible en la interfaz de la aplicación para activar una alerta en caso de emergencia.
        - **Monitoreo en Tiempo Real:** Aunque la aplicación es de escritorio, los clientes pueden interactuar en tiempo real con los administradores de la plataforma.
        - **Calificaciones y Reportes:** Los usuarios y conductores pueden reportar incidentes o problemas directamente desde la aplicación.
    - **Interacción:**
        - Durante el viaje, el cliente en todo momento puede enviar una alerta de seguridad.
        - La funcionalidad de reporte de incidentes se utiliza para mejorar la seguridad y mantener registros que son revisados por el equipo administrativo.

5. **Sistema de Pago y Facturación**
    - **Componentes:**
        - **Método de Pago:** El cliente puede decidir si desea pagar en efectivo al concluir el viaje o realizar su pago con tarjeta.
        - **Sistema de Facturación:** Genera recibos electrónicos automáticamente al finalizar el viaje.
    - **Interacción:**
        - Al concluir el viaje, el usuario puede realizar el pago directamente desde la aplicación, y recibir la confirmación del viaje en su correo electrónico.
        - Todo el proceso de pago es automatizado, manteniendo un registro detallado de todos los viajes.

6. **Panel de Control y Administración**
    - **Componentes:**
        - **Dashboard Administrativo:** Una interfaz de escritorio que permite al equipo de gestión supervisar operaciones, acceder a reportes, y tomar decisiones en tiempo real.
        - **Sistema de Soporte al Cliente:** Un módulo dentro de la aplicación para resolver problemas y consultas de los usuarios y conductores.
    - **Interacción:**
        - El dashboard proporciona una visión integral del estado de la plataforma, incluyendo métricas clave y alertas en tiempo real.
        - El sistema de soporte al cliente permite a los administradores interactuar con los usuarios y conductores para resolver problemas de manera eficiente.

## Resumen de la Interacción de los Componentes

A nivel operativo, todos los componentes del sistema de Qnave están diseñados para funcionar dentro de un entorno de escritorio, lo que ofrece estabilidad y un entorno controlado para el usuario y el conductor. La plataforma gestiona las operaciones de transporte desde la solicitud hasta la facturación, integrando funciones de seguridad y control en tiempo real para asegurar la calidad del servicio. A nivel de software, la comunicación entre los distintos módulos se maneja a través de bases de datos centralizadas y APIs internas que facilitan la integración y el flujo de datos.

Con estos ajustes, el sistema está orientado a ofrecer una solución robusta y segura para las necesidades de transporte privado en Guatemala, utilizando una plataforma de escritorio eficiente y bien estructurada.
