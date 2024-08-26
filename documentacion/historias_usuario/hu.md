### ID: HU-0001
**TÍTULO:** Registro de clientes  
**DESCRIPCIÓN:**  
Yo, como cliente quiero registrarme en la plataforma ingresando toda mi información personal que es de utilidad para los administradores de la empresa. Con el propósito de llevar un registro de mis viajes, solicitar los viajes cuando lo necesite y darle la seguridad al conductor de la persona que está llevando en su vehículo.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe registrar:
   - Nombre completo
   - Fecha de nacimiento (YYYY-MM-DD)
   - Género (M/F)
   - Correo electrónico (UNIQUE)
   - Fotografía del DPI
   - Número de celular
   - Contraseña (se debe confirmar la contraseña)
   - Pregunta de seguridad
   - Métodos de pago
     - Tarjeta:
       - Nombre del propietario
       - Número de la tarjeta (16 dígitos)
       - Fecha de vencimiento (YYYY-MM-DD)
       - Código CVV (3 dígitos)
     - Efectivo al finalizar el viaje
2. Se debe validar que todos los campos cumplan con el formato y tipo de dato acorde a lo que se solicita, de lo contrario manejo de errores.
3. Los métodos de pago no son obligatorios llenarlos en este registro.
4. Al completar el registro se envía una confirmación al usuario por correo electrónico, el cliente no podrá acceder a la aplicación hasta validar su información con este método de verificación.
5. Los datos sensibles de los clientes se deben encriptar (SHA 256) previo a su almacenamiento en la base de datos.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0002
**TÍTULO:** Registro de conductores  
**DESCRIPCIÓN:**  
Yo como usuario conductor, necesito registrarme en la plataforma para poder recibir los viajes de los clientes y asignármelos.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe registrar:
   - Nombre completo
   - Número de teléfono
   - Edad
   - Número de DPI (UNIQUE)
   - Correo electrónico (UNIQUE)
   - Papelería (CV en PDF)
   - Fotografía (PNG/JPG)
   - Fotografía del vehículo con el que realizará los viajes (PNG/JPG)
   - Placa del vehículo (UNIQUE)
   - Marca del vehículo
   - Año del vehículo (YYYY-MM-DD)
   - Género (M/F)
   - Estado civil (SOLTERO/CASADO/VIUDO/DIVORCIADO/UNIÓN DE HECHO)
   - Número de cuenta
   - Dirección de domicilio
   - Contraseña
   - Código de empleado
   - Pregunta de seguridad
2. Se debe generar el código de empleado y la contraseña temporal al completar el registro, la contraseña se debe solicitar nuevamente cuando el usuario inicie sesión por primera vez.
3. El código de usuario y contraseña generados, se deben compartir con el usuario por correo electrónico, una vez sea completado el registro.
4. Se debe validar que todos los campos cumplan con el formato y tipo de dato acorde a lo que se solicita, de lo contrario manejo de errores.
5. El usuario con permisos de administración de la plataforma debe aprobar la solicitud (desde su portal) del usuario conductor previo a compartirle sus credenciales.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0003
**TÍTULO:** Registro de asistentes  
**DESCRIPCIÓN:**  
Yo como usuario administrador del sistema, necesito registrar a los usuarios con rol de asistente para que me pueda colaborar con la administración del sistema por la alta demanda de usuarios.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe registrar:
   - Nombre completo
   - Número de teléfono
   - Edad
   - Número de DPI (UNIQUE)
   - Correo electrónico (UNIQUE)
   - Papelería (CV en PDF)
   - Fotografía (PNG/JPG)
   - Género (M/F)
   - Estado civil (SOLTERO/CASADO/VIUDO/DIVORCIADO/UNIÓN DE HECHO)
   - Número de cuenta
   - Dirección de domicilio
   - Contraseña
   - Código de empleado
   - Pregunta de seguridad
2. Se debe generar el código de empleado y la contraseña temporal al completar el registro, la contraseña se debe solicitar nuevamente cuando el usuario inicie sesión por primera vez.
3. El código de usuario y contraseña generados, se deben compartir con el usuario por correo electrónico, una vez sea completado el registro.
4. Se debe validar que todos los campos cumplan con el formato y tipo de dato acorde a lo que se solicita, de lo contrario manejo de errores.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0004
**TÍTULO:** Sesión de usuario cliente  
**DESCRIPCIÓN:**  
Yo como cliente, quiero iniciar sesión en la plataforma para poder ingresar a los módulos: Modificar información personal, calificar conductores, ver información de los conductores, reportar un inconveniente, agregar un método de pago, guardar la ubicación de mi viaje actual, cancelar el viaje actual y solicitar viajes.

**CRITERIOS DE ACEPTACIÓN:**
1. El usuario cliente debe haber validado la cuenta luego de haberla creado y previo a iniciar sesión por primera vez en la plataforma.
2. Se creará una nueva contraseña la primera vez que inicie sesión en la plataforma para mayor seguridad de los usuarios.
3. Se darán 5 intentos para ingresar las credenciales correctamente, de lo contrario se inicia un proceso de recuperación de cuenta ya que esta será bloqueada y se notifica por medio de correo electrónico al usuario.
4. El usuario tiene la opción para iniciar un proceso de recuperación de contraseña.
5. Las contraseñas nuevas deben ser encriptadas para mayor seguridad antes de ser almacenadas en la base de datos, para que pueda pasar el proceso de autenticación correctamente.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0005
**TÍTULO:** Sesión de usuario conductor  
**DESCRIPCIÓN:**  
Yo como conductor, quiero iniciar sesión en la plataforma para poder ingresar a los módulos: Aceptar un viaje, cancelar viaje actual, modificar información personal, reportar un problema, calificar a los clientes, ver información del cliente, finalizar viaje actual y generar resumen de ganancias.

**CRITERIOS DE ACEPTACIÓN:**
1. El usuario conductor debe haber validado la cuenta luego de haberla creado y previo a iniciar sesión por primera vez en la plataforma. Se generará un código de empleado, para su autenticación podrá utilizar este código o su correo electrónico.
2. Se creará una nueva contraseña la primera vez que inicie sesión en la plataforma para mayor seguridad de los usuarios.
3. Se darán 5 intentos para ingresar las credenciales correctamente, de lo contrario se inicia un proceso de recuperación de cuenta ya que esta será bloqueada y se notifica por medio de correo electrónico al usuario.
4. El usuario tiene la opción para iniciar un proceso de recuperación de contraseña.
5. Las contraseñas nuevas deben ser encriptadas para mayor seguridad antes de ser almacenadas en la base de datos, para que pueda pasar el proceso de autenticación correctamente.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0006
**TÍTULO:** Sesión usuario asistente  
**DESCRIPCIÓN:**  
Yo como asistente, quiero iniciar sesión en la plataforma para poder ingresar a los módulos: Aceptar solicitud de empleo, ver información de los conductores, dar de baja a los conductores, ver información de los clientes, dar de baja a los clientes, generar ofertas para los clientes, ver solicitud de cambio de información de los conductores y reporte de los vehículos.

**CRITERIOS DE ACEPTACIÓN:**
1. El usuario asistente debe haber validado la cuenta luego de haberla creado y previo a iniciar sesión por primera vez en la plataforma. Se generará un código de empleado, para su autenticación podrá utilizar este código o su correo electrónico.
2. Se creará una nueva contraseña la primera vez que inicie sesión en la plataforma para mayor seguridad de los usuarios.
3. Se darán 5 intentos para ingresar las credenciales correctamente, de lo contrario se inicia un proceso de recuperación de cuenta ya que esta será bloqueada y se notifica por medio de correo electrónico al usuario.
4. El usuario tiene la opción para iniciar un proceso de recuperación de contraseña.
5. Las contraseñas nuevas deben ser encriptadas para mayor seguridad antes de ser almacenadas en la base de datos, para que pueda pasar el proceso de autenticación correctamente.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0007
**TÍTULO:** Sesión usuario administrador  
**DESCRIPCIÓN:**  
Yo como usuario administrador, quiero iniciar sesión a la plataforma para tener acceso a los módulos: Generar reportes, ver calificación de usuarios, ver calificación de conductores, ver estadísticas de registro de usuarios, ver estadísticas de uso, generar reporte de ganancia, registrar asistentes y dar de baja a asistentes.

**CRITERIOS DE ACEPTACIÓN:**
1. Se le otorgará un usuario y una contraseña la cual sólo él conocerá, esta información estará en la base de datos encriptada.
2. Después de ingresar las credenciales se nos enviará a otra pestaña, en donde la plataforma para verificar que si es el administrador que está ingresando le pedirá un archivo de texto plano con extensión `.ayd` ejemplo (clave.ayd). Este archivo solo contendrá una segunda contraseña, es importante que esté encriptada. El sistema tiene que validar que lo ingresado en el documento de texto plano corresponda con la información de la base de datos, únicamente así podrá ingresar el administrador a su usuario.

**PRIORIDAD:** Alta  
**ESTIMACIÓN:** 10

---

### ID: HU-0008
**TÍTULO:** Recuperar cuenta  
**DESCRIPCIÓN:**  
Yo como usuario (cliente/conductor/asistente) luego de 5 intentos fallidos y ser notificado de un bloqueo en mi cuenta, necesito poder recuperar la cuenta para volver a utilizar la plataforma.

**CRITERIOS DE ACEPTACIÓN:**
1. Se deben haber realizado 5 intentos fallidos de inicio de sesión.
2. Se debe haber notificado al usuario que la cuenta pasó a un estado de bloqueo temporal.
3. Se proporcionarán los pasos para desbloquear la cuenta en la notificación que llegará al correo electrónico registrado, con un código de recuperación de cuenta.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0009
**TÍTULO:** Recuperación de contraseña  
**DESCRIPCIÓN:**  
Yo como usuario (cliente/conductor/asistente), quiero recuperar mi contraseña a través de una pregunta de seguridad que al momento de hacer el registro se eligió y se almacenó la respuesta, para iniciar sesión nuevamente en la plataforma.

**CRITERIOS DE ACEPTACIÓN:**
1. La respuesta a la pregunta de seguridad debe estar almacenada para realizar una validación de seguridad.
2. Llegará una notificación al correo electrónico registrado por el usuario indicando el proceso de recuperación de contraseña.
3. Luego de ser validada la respuesta a la pregunta de recuperación, llegará un correo electrónico con la nueva credencial provisional.
4. Al volver a iniciar sesión, la plataforma nos solicitará una nueva contraseña para mayor seguridad.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0010
**TÍTULO:** Modificar información personal usuario cliente  
**DESCRIPCIÓN:**  
Yo como cliente, quiero modificar la información de mi registro de usuario para completar los campos opcionales que no se llenaron anteriormente como por ejemplo agregar un método de pago y también para actualizar la información que se registró en primera instancia.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe validar que todos los campos cumplan con el formato y tipo de dato acorde a lo que se solicita, de lo contrario manejo de errores.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0011
**TÍTULO:** Calificar conductor  
**DESCRIPCIÓN:**  
Yo como cliente, después de un viaje, quiero darle una calificación al conductor, usando un sistema simple de estrellas, para que otros usuarios sepan qué tan confiable es.

**CRITERIOS DE ACEPTACIÓN:**
1. La calificación del viaje se puede realizar una sola vez.
2. Se debe tomar en cuenta el promedio de estrellas por viaje que recibe el conductor al momento de mostrar la calificación.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0012
**TÍTULO:** Ver información del conductor  
**DESCRIPCIÓN:**  
Yo como cliente, cuando un conductor acepta un viaje, necesito ver detalles importantes sobre él, como su nombre, la calificación que tiene, la placa del carro, y otros detalles que le den confianza al usuario.

**CRITERIOS DE ACEPTACIÓN:**
1. La calificación es el promedio de estrellas que tiene el conductor (aproximado) en el total de los viajes en los que ha sido calificado por los demás usuarios.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0013
**TÍTULO:** Reportar problema usuario cliente  
**DESCRIPCIÓN:**  
Yo como cliente, necesito enviar una señal de alerta en caso algo sale mal durante el viaje, dando una descripción de lo sucedido y, si es necesario, incluyendo detalles del conductor al administrador del sistema y al asistente por medio de una central de alertas que tendrá todas las notificaciones. Para mayor seguridad de que las alertas lleguen a los administradores del sistema y puedan tomar acción lo más pronto posible.

**CRITERIOS DE ACEPTACIÓN:**
1. Durante el viaje el cliente puede enviar una sola alerta de pánico.
2. Se debe solicitar una descripción de lo sucedido para incluirla en el mensaje de alerta.
3. El viaje se debe pasar a estado “PANICO” y enviar las notificaciones correspondientes a la central de alertas a la cual solo tendrán acceso los administradores de la plataforma y asistentes.
4. Los datos se deben ingresar correctamente, con el formato y tipo de dato correspondiente, de lo contrario, manejar el error.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 8

---

### ID: HU-0014
**TÍTULO:** Pedir viaje  
**DESCRIPCIÓN:**  
Yo como cliente, necesito pedir un viaje para movilizarme de un punto “A” a un punto “B”.

**CRITERIOS DE ACEPTACIÓN:**
1. El administrador indica que los precios entre cada una de las zonas de la capital de Guatemala están fijos por el momento, a continuación, se muestra una tabla de cómo están cada una de las tarifas.  
   [Tarifas](https://drive.google.com/file/d/1_TfARWMlBID6m8VzbgzMZeiinDsMzABB/view?usp=sharing)
2. Si en caso de que sea la misma zona de origen y la misma zona de destino el cobro será de Q 5.00.
3. Solo es posible tener un viaje en curso a la vez.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 8

---

### ID: HU-0015
**TÍTULO:** Guardar viaje en el historial  
**DESCRIPCIÓN:**  
Yo como cliente, luego de pedir un viaje, quiero guardar el viaje en mi lista de viajes frecuentes para poder solicitar este viaje más adelante de una forma más rápida y eficiente.

**CRITERIOS DE ACEPTACIÓN:**
1. El viaje debe estar en estado “EN CURSO” para que se pueda guardar el viaje actual en el historial de viajes frecuentes.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0016
**TÍTULO:** Ver historial de viajes frecuentes  
**DESCRIPCIÓN:**  
Yo como cliente, necesito ver los viajes que he agregado al historial de viajes para poder hacer mi pedido con mayor rapidez.

**CRITERIOS DE ACEPTACIÓN:**
1. Debe tener la opción para volver a solicitar el viaje de forma más rápida.
2. Esta opción solo debe funcionar si el estado del viaje es “FINALIZADO” ya que solo puede llevarse a cabo un viaje a la vez.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0017
**TÍTULO:** Eliminar viaje del historial  
**DESCRIPCIÓN:**  
Yo como cliente, necesito eliminar los viajes de mi historial de viajes frecuentes, para evitar hacer pedidos que no necesito.

**CRITERIOS DE ACEPTACIÓN:**
1. El viaje solo puede ser eliminado del historial de viajes en cualquier momento.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0018
**TÍTULO:** Cancelar viaje cliente  
**DESCRIPCIÓN:**  
Yo como cliente, necesito la opción de poder cancelar los viajes en curso para que sea reasignado a otro conductor.

**CRITERIOS DE ACEPTACIÓN:**
1. Solo se puede cancelar un viaje si está en estado “EN ESPERA” y “ACEPTADO”, ya que, se debe esperar la aceptación del conductor para que sea asignado un viaje. Si el conductor acepta el viaje, aún es posible cancelarlo porque el cliente no se ha subido al vehículo.
2. Se debe indicar la razón de la cancelación.
3. Si un cliente cancela 3 viajes o más en un día, su calificación sufrirá de una penalización de una estrella.
4. Se debe enviar una notificación a los usuarios tipo cliente y conductor, indicando que el viaje fue cancelado y que será enviado a la lista de espera para ser reasignado a un nuevo conductor.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0019
**TÍTULO:** Aceptar viaje  
**DESCRIPCIÓN:**  
Yo como conductor, necesito tener acceso a las solicitudes de viaje que generan los clientes, para poder seleccionar uno de los viajes y asignármelo.

**CRITERIOS DE ACEPTACIÓN:**
1. Se deben visualizar únicamente los viajes que aún no han sido asignados a un conductor.
2. Los viajes solo se pueden asignar a un conductor.
3. No se pueden aceptar más de un viaje a la vez.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 8

---

### ID: HU-0020
**TÍTULO:** Cancelar viaje conductor  
**DESCRIPCIÓN:**  
Yo como conductor, necesito la opción de poder cancelar los viajes en curso para que sea reasignado a otro conductor.

**CRITERIOS DE ACEPTACIÓN:**
1. Solo se puede cancelar un viaje si está en estado “EN ESPERA” y “ACEPTADO”, ya que, se debe esperar la aceptación del conductor para que sea asignado un viaje. Si el conductor acepta el viaje, aún es posible cancelarlo porque el cliente no se ha subido al vehículo.
2. Se debe indicar la razón de la cancelación.
3. Se debe enviar una notificación a los usuarios tipo cliente y conductor, indicando que el viaje fue cancelado y que será enviado a la lista de espera para ser reasignado a un nuevo conductor.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 8

---

### ID: HU-0021
**TÍTULO:** Modificar información personal usuario conductor  
**DESCRIPCIÓN:**  
Yo como conductor, quiero modificar la información de mi registro de usuario para completar los campos opcionales que no se llenaron anteriormente como por ejemplo cambiar el vehículo que estaré utilizando.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe validar que todos los campos cumplan con el formato y tipo de dato acorde a lo que se solicita, de lo contrario manejo de errores.
2. Será enviada una solicitud al asistente, quien debe aprobar la solicitud de cambio de información del conductor.
3. Si la solicitud es rechazada, la información mantiene su estado actual.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0022
**TÍTULO:** Reportar problema usuario conductor  
**DESCRIPCIÓN:**  
Yo como conductor, necesito enviar una señal de alerta en caso algo sale mal durante el viaje, dando una descripción de lo sucedido y, si es necesario, incluyendo detalles del cliente al administrador del sistema y al asistente por medio de una central de alertas que tendrá todas las notificaciones. Para mayor seguridad de que las alertas lleguen a los administradores del sistema y puedan tomar acción lo más pronto posible.

**CRITERIOS DE ACEPTACIÓN:**
1. Durante el viaje el conductor puede enviar una sola alerta de pánico.
2. Se debe solicitar una descripción de lo sucedido para incluirla en el mensaje de alerta.
3. El viaje se debe pasar a estado “PANICO” y enviar las notificaciones correspondientes a la central de alertas a la cual solo tendrán acceso los administradores de la plataforma y asistentes.
4. Los datos se deben ingresar correctamente, con el formato y tipo de dato correspondiente, de lo contrario, manejar el error.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0023
**TÍTULO:** Calificar cliente  
**DESCRIPCIÓN:**  
Yo como conductor, después de un viaje, quiero darle una calificación al cliente, usando un sistema simple de estrellas, para que otros usuarios sepan qué tan confiable es.

**CRITERIOS DE ACEPTACIÓN:**
1. La calificación del viaje se puede realizar una sola vez.
2. Se debe tomar en cuenta el promedio de estrellas por viaje que recibe el conductor al momento de mostrar la calificación.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0024
**TÍTULO:** Ver información cliente  
**DESCRIPCIÓN:**  
Yo como conductor, cuando acepto un viaje, necesito ver detalles importantes sobre el cliente, como su nombre, la calificación que tiene y otros detalles que le den confianza al usuario.

**CRITERIOS DE ACEPTACIÓN:**
1. La calificación es el promedio de estrellas que tiene el cliente (aproximado) en el total de los viajes en los que ha sido calificado por los demás usuarios.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0025
**TÍTULO:** Finalizar viaje  
**DESCRIPCIÓN:**  
Yo como conductor, quiero una opción de finalizar un viaje para poder indicar a los administradores del sistema que el viaje ha terminado y estoy listo para aceptar uno nuevo.

**CRITERIOS DE ACEPTACIÓN:**
1. Los viajes solo se pueden marcar como “FINALIZADO” una sola vez.
2. Una vez finalizado el viaje, el conductor podrá aceptar un nuevo viaje.
3. Se debe registrar la fecha y hora de finalización del viaje y algunos otros detalles adicionales.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0026
**TÍTULO:** Resumen de ganancias  
**DESCRIPCIÓN:**  
Yo como conductor, quiero ver un resumen de mis ganancias, el cual se debe actualizar diariamente en un historial que se reiniciará cada día a medianoche, para poder llevar un control exacto de las ganancias diarias. Además de poder llevar un acumulado total.

**CRITERIOS DE ACEPTACIÓN:**
1. El sistema debe calcular las ganancias al día vencido.
2. Se debe calcular la ganancia total según el historial de viajes finalizados.
3. Los cálculos se realizan de forma automática.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0027
**TÍTULO:** Aceptar solicitud de empleo a conductor  
**DESCRIPCIÓN:**  
Yo como asistente, quiero ver las solicitudes de empleo de los conductores que han creado una cuenta en la plataforma, para determinar si son aprobadas o rechazadas.

**CRITERIOS DE ACEPTACIÓN:**
1. El asistente debe validar la información cargada por el conductor para determinar si puede aprobar o denegar una solicitud de empleo.
2. La solicitud solo se puede aprobar o rechazar una vez.
3. Si la solicitud ha sido rechazada, se notifica al usuario para que cargue nuevamente su información y genere una nueva solicitud.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5

---

### ID: HU-0028
**TÍTULO:** Ver solicitud de cambio de información del conductor  
**DESCRIPCIÓN:**  
Yo como asistente, quiero ver las solicitudes de cambios de información de los conductores, para determinar si se aprueba o rechaza la modificación de esta información, especialmente cuando los conductores cambian sus vehículos.

**CRITERIOS DE ACEPTACIÓN:**
1. El asistente debe validar la información cargada por el conductor para determinar si puede aprobar o denegar una solicitud de cambio de información.
2. La solicitud solo se puede aprobar o rechazar una vez.
3. Si la solicitud ha sido rechazada, se notifica al usuario para que cargue nuevamente su información y genere una nueva solicitud.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0029
**TÍTULO:** Generar ofertas para los usuarios  
**DESCRIPCIÓN:**  
Yo como asistente, quiero generar ofertas para mis clientes, aplicando los descuentos a las tarifas establecidas, para mejorar la experiencia de los usuarios y realizar más ventas.

**CRITERIOS DE ACEPTACIÓN:**
1. La oferta se activará seleccionando al usuario que será beneficiado.
2. Se programará un descuento del 25% en el próximo viaje del cliente.
3. Solo se podrá generar una oferta al mes por cliente.
4. De existir una oferta vigente o utilizada en el mes, no se podrá aplicar una nueva oferta al usuario.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0030
**TÍTULO:** Ver información de conductores  
**DESCRIPCIÓN:**  
Yo como asistente, quiero ver la información detallada de los conductores para tomar las decisiones correspondientes a su gestión.

**CRITERIOS DE ACEPTACIÓN:**
1. Se deben visualizar detalles al hacer seleccionar un conductor, como:
   - Historial de viajes
   - Calificaciones
   - Comentarios de los usuarios

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0031
**TÍTULO:** Dar de baja a conductores  
**DESCRIPCIÓN:**  
Yo como asistente, quiero eliminar a los conductores que no cumplan con las políticas de la empresa para evitar nuevas incidencias con los clientes.

**CRITERIOS DE ACEPTACIÓN:**
1. Se puede eliminar un conductor únicamente si no tiene viajes “EN CURSO”.
2. El conductor no se puede volver a registrar en la plataforma para mayor seguridad.
3. Se debe registrar el motivo de la baja y la fecha.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0032
**TÍTULO:** Ver bajas  
**DESCRIPCIÓN:**  
Yo como usuario (asistente/administrador), quiero ver los registros de las bajas realizadas de clientes y conductores.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe mostrar el nombre del usuario, el motivo por el cual se realizó la baja y la fecha en la que se llevó a cabo.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0033
**TÍTULO:** Ver información clientes  
**DESCRIPCIÓN:**  
Yo como asistente, quiero ver la información que registran los clientes. Para el control de los usuarios en cuestiones de seguridad de la información que registran en la plataforma.

**CRITERIOS DE ACEPTACIÓN:**
1. Se deben visualizar detalles al hacer seleccionar un cliente, como:
   - Historial de viajes
   - Calificaciones
   - Comentarios de los usuarios

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0034
**TÍTULO:** Dar de baja a clientes  
**DESCRIPCIÓN:**  
Yo como asistente, quiero eliminar a los clientes que no cumplan con las políticas de la empresa para evitar nuevas incidencias con los conductores.

**CRITERIOS DE ACEPTACIÓN:**
1. Se puede eliminar un cliente únicamente si no tiene viajes “EN CURSO”.
2. El cliente no se puede volver a registrar en la plataforma para mayor seguridad.
3. Se debe registrar el motivo de la baja y la fecha.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0035
**TÍTULO:** Reporte de vehículos  
**DESCRIPCIÓN:**  
Yo como asistente, quiero generar un reporte de los vehículos que poseen los conductores para tener un mejor control y seguridad en el servicio.

**CRITERIOS DE ACEPTACIÓN:**
1. Se debe visualizar la información detallada del conductor, además de toda la información del vehículo que se tiene registrado en el usuario.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0036
**TÍTULO:** Ver calificaciones  
**DESCRIPCIÓN:**  
Yo como usuario administrador, quiero tener visibilidad de la calificación de los usuarios (cliente/conductor), para controlar la calidad del servicio, basado en los puntos que reciben los conductores de los clientes y los clientes de los conductores.

**CRITERIOS DE ACEPTACIÓN:**
1. La calificación es el promedio del puntaje obtenido de los viajes que tienen calificación.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0037
**TÍTULO:** Estadísticas de registro  
**DESCRIPCIÓN:**  
Como administrador, necesito ver las estadísticas de cuantos registros tengo por cada tipo de usuario (cliente/asistente/conductor) mediante una gráfica. Para definir en qué puntos estamos más vulnerables y sacar diferentes campañas de marketing basado en las decisiones que tomaré al ver esta información.

**CRITERIOS DE ACEPTACIÓN:**
1. Mostrar en la gráfica detalles importantes como el título del gráfico, porcentaje obtenido y las leyendas.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0038
**TÍTULO:** Estadísticas de uso  
**DESCRIPCIÓN:**  
Yo como administrador, quiero ver gráficos que muestran cuántos viajes se han completado, cuántos se han cancelado, y cuántos están en espera.

**CRITERIOS DE ACEPTACIÓN:**
1. Mostrar en la gráfica detalles importantes como el título del gráfico, porcentaje obtenido y las leyendas.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0039
**TÍTULO:** Reporte de ganancia  
**DESCRIPCIÓN:**  
Yo como administrador, quiero ver cuánto ha ganado la plataforma, tanto en bruto como en neto, con cada viaje. Para llevar el control exacto de la utilidad de la empresa.

**CRITERIOS DE ACEPTACIÓN:**
1. Puede filtrar estos reportes por fecha para un control más detallado.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0040
**TÍTULO:** Dar de baja a asistentes  
**DESCRIPCIÓN:**  
Yo como administrador, quiero eliminar usuarios de tipo asistente de la plataforma. Para evitar que tengan acceso a los recursos, una vez se les haya dado de baja del cargo.

**CRITERIOS DE ACEPTACIÓN:**
1. Se puede eliminar un asistente una sola vez.
2. El asistente no se puede volver a registrar en la plataforma para mayor seguridad.
3. Se debe registrar el motivo de la baja y la fecha.

**PRIORIDAD:** Baja  
**ESTIMACIÓN:** 3

---

### ID: HU-0041
**TÍTULO:** Cargar tarifas fijas  
**DESCRIPCIÓN:**  
Yo como administrador, quiero cargar las tarifas establecidas en el sistema, desde un archivo CSV, para tener el control completo de las tarifas que se están manejando con los clientes según los puntos de partida y de llegada que elijan.

**CRITERIOS DE ACEPTACIÓN:**
1. El archivo CSV debe contener todas las tarifas que se deben manejar según la zona de salida y la zona de llegada.
2. El CSV debe estar delimitado por comas.
3. La información del CSV debe ser cargada a la base de datos.
4. Cada vez que se cambien las tarifas cargando el archivo, se debe limpiar la tabla de la base de datos previo a insertar la información de nuevo para que no exista cruce de información.

**PRIORIDAD:** Media  
**ESTIMACIÓN:** 5
