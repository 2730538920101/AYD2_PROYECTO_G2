# Requerimientos funcionales

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF001                                                                                         |
| Asignado al modulo      | Registro de Usuario                                                                           |
| Nombre                  | Registro de Usuario                                                                           |
| Descripción             | El sistema debe permitir el registro de nuevos usuarios proporcionando la información completa requerida. El proceso de registro incluye la entrada de: Nombre completo, fecha de nacimiento, género, correo electrónico, fotografía del DPI, número de celular, contraseña, confirmación de contraseña, y opcionalmente un metodo de pago. <br/><br/>El sistema debe validar que el correo no se ha registrado previamente.  |
| Requerimientos previos  | El usuario debe contar con una conexión a internet estable y disponer de su información personal. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF002                                                                                         |
| Asignado al modulo      | Registro de Usuario                                                                           |
| Nombre                  | Validación de Contraseña                                                                      |
| Descripción             | El sistema debe validar que la contraseña y la confirmación de contraseña coincidan antes de permitir el registro. |
| Requerimientos previos  | El usuario debe ingresar la contraseña y confirmarla correctamente. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF003                                                                                         |
| Asignado al modulo      | Registro de Usuario                                                                           |
| Nombre                  | Métodos de Pago Opcionales                                                                    |
| Descripción             | El sistema debe permitir al usuario optar por no ingresar un método de pago en el momento del registro. El ingreso de métodos de pago será opcional y no impedirá que el usuario complete el registro. |
| Requerimientos previos  | El usuario debe tener la opción de omitir el ingreso de los métodos de pago durante el registro. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF004                                                                                         |
| Asignado al modulo      | Registro de Usuario                                                                           |
| Nombre                  | Registro de Método de Pago con Tarjeta                                                        |
| Descripción             | El sistema debe permitir al usuario ingresar un método de pago con tarjeta, incluyendo nombre del propietario, número de tarjeta, CVV y fecha de expiración, validando la cantidad de dígitos de la tarjeta y el código de seguridad, así como su vencimiento. |
| Requerimientos previos  | El usuario debe tener una tarjeta válida y proporcionar la información correcta para completar el registro de pago. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF005                                                                                         |
| Asignado al modulo      | Registro del Conductor                                                                       |
| Nombre                  | Registro del Conductor                                                                       |
| Descripción             | El sistema debe permitir el registro de nuevos conductores proporcionando toda la información requerida. El proceso de registro incluye la entrada de nombre completo, número de teléfono, edad, número de DPI, correo electrónico, papelería completa (CV en formato PDF), fotografía, fotografía del vehículo, número de placa, marca del vehículo, año del vehículo, género, estado civil, número de cuenta y dirección de domicilio. <br/><br/>El sistema debe validar que el correo no se ha registrado previamente. <br/><br/> El sistema debe generar un código de empleado único para cada nuevo conductor durante el proceso de registro. Este código junto con una contraseña temporal será enviado al correo electrónico del conductor para verificar que la cuenta exista.|
| Requerimientos previos  | El conductor debe contar con la documentación necesaria y una conexión a internet estable para completar el registro. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF006                                                                                         |
| Asignado al modulo      | Registro del Conductor                                                                       |
| Nombre                  | Envío de Contraseña Temporal                                                                  |
| Descripción             | El sistema debe enviar una contraseña temporal al correo electrónico del conductor para que pueda acceder a su cuenta. |
| Requerimientos previos  | El sistema debe contar con una funcionalidad de envío de correos electrónicos y el conductor debe proporcionar una dirección de correo válida. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF007                                                                                         |
| Asignado al modulo      | Registro del Conductor                                                                       |
| Nombre                  | Cambio de Contraseña Inicial                                                                 |
| Descripción             | Al iniciar sesión por primera vez, el sistema debe solicitar al conductor que cambie la contraseña temporal proporcionada por la empresa por una contraseña nueva de su elección. |
| Requerimientos previos  | El conductor debe haber recibido la contraseña temporal y haber iniciado sesión en el sistema. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF008                                                                                         |
| Asignado al modulo      | Registro de Asistentes                                                                       |
| Nombre                  | Registro de Asistentes                                                                       |
| Descripción             | El sistema debe permitir al administrador registrar nuevos asistentes proporcionando toda la información requerida. El proceso de registro incluye la entrada de nombre completo, número de teléfono, edad, número de DPI, correo electrónico, papelería completa (CV), fotografía, género, estado civil, número de cuenta y dirección de domicilio. <br/><br/>El sistema debe validar que el correo no se ha registrado previamente.<br/><br/> El sistema debe generar un código de empleado único para cada nuevo asistente durante el proceso de registro. Este código junto con una contraseña temporal será enviado al correo electrónico del asistente para verificar que la cuenta exista. |
| Requerimientos previos  | El administrador debe tener acceso a la plataforma de registro y el asistente debe contar con la información necesaria para completar el registro. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF009                                                                                         |
| Asignado al modulo      | Registro de Asistentes                                                                       |
| Nombre                  | Envío de Contraseña Temporal                                                                  |
| Descripción             | El sistema debe enviar una contraseña temporal al correo electrónico del asistente para que pueda acceder a su cuenta. |
| Requerimientos previos  | El sistema debe contar con una funcionalidad de envío de correos electrónicos y el asistente debe proporcionar una dirección de correo válida. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF010                                                                                         |
| Asignado al modulo      | Registro de Asistentes                                                                       |
| Nombre                  | Cambio de Contraseña Inicial                                                                 |
| Descripción             | Al iniciar sesión por primera vez, el sistema debe solicitar al asistente que cambie la contraseña temporal proporcionada por la empresa por una contraseña nueva de su elección. |
| Requerimientos previos  | El asistente debe haber recibido la contraseña temporal y haber iniciado sesión en el sistema. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF011                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                  |
| Nombre                  | Recuperación de Contraseña                                                                   |
| Descripción             | Cuando el usuario solicite la recuperación de la contraseña, el sistema le envia una contraseña temporal a su correo electronico y posteriormente cuando intente realizar el inicio de sesión (con la contraseña temporal) el sistema le va a solicitar cambiarla. |
| Requerimientos previos  | El sistema debe contar con un mecanismo para enviar mensajes de recuperación de contraseña. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF012                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                  |
| Nombre                  | Recuperación de Contraseña para Asistentes                                                   |
| Descripción             | Si un asistente olvida su contraseña, el administrador realiza el cambio de la contraseña desde su plataforma. |
| Requerimientos previos  | El administrador debe tener acceso a la plataforma de gestión para asistir en la recuperación de contraseñas. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF013                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                  |
| Nombre                  | Bloqueo de Cuenta por Intentos Fallidos de Contraseña                                        |
| Descripción             | Si un usuario, conductor o asistente ingresa cinco veces una contraseña incorrecta, la cuenta debe ser bloqueada y se debe enviar un mensaje al correo electrónico del usuario. El desbloqueo de la cuenta se inicia mediante una solicitud al administrador. El usuario puede enviar esta solicitud utilizando un botón específico en la interfaz. Una vez enviada, la solicitud será visible para el administrador, quien tendrá la opción de aprobar o denegar el desbloqueo del usuario según su criterio. |
| Requerimientos previos  | El sistema debe contar con un mecanismo para bloquear cuentas tras intentos fallidos y enviar notificaciones. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF014                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                              |
| Nombre                  | Inicio de Sesión de Usuario                                                                   |
| Descripción             | El usuario debe poder iniciar sesión en la aplicación utilizando su correo electrónico y la contraseña elegida durante el registro. |
| Requerimientos previos  | El usuario debe haberse registrado previamente y contar con sus credenciales de acceso. |

| Campo                  | Detalle                                                                                     |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                     | RF015                                                                                        |
| Asignado al modulo     | Perfil de usuario                                                                  |
| Nombre                 | Actualización de datos personales                                                            |
| Descripción            | El usuario podrá modificar la siguiente información: Nombre completo, fecha de nacimiento, contraseña, celular e información de la tarjeta |
| Requerimientos previos | Usuario autenticado.                                                                         |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF016                                                                                         |
| Asignado al modulo      | Viaje                                                                 |
| Nombre                  | Visualización de Información del Conductor                                                   |
| Descripción             | Una vez que un conductor acepta un viaje, el usuario debe poder ver los detalles importantes del conductor, como nombre, calificación, número de placa y otros datos relevantes. |
| Requerimientos previos  | El conductor debe haber aceptado el viaje para que la información sea visible al usuario. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF017                                                                                         |
| Asignado al modulo      | Viaje                                                                 |
| Nombre                  | Calificación del Conductor                                                                   |
| Descripción             | Después de un viaje, el usuario debe poder calificar al conductor utilizando un sistema de estrellas para reflejar la confiabilidad del conductor. |
| Requerimientos previos  | El usuario debe haber completado un viaje para poder calificar al conductor. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF018                                                                                         |
| Asignado al modulo      | Incidentes                                                                        |
| Nombre                  | Reporte de Problemas Durante el Viaje                                                        |
| Descripción             | El usuario debe poder reportar cualquier problema ocurrido durante el viaje, proporcionando una descripción del incidente y, si es necesario, detalles del conductor involucrado. |
| Requerimientos previos  | El usuario debe haber tenido un problema durante el viaje que desee reportar. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF019                                                                                         |
| Asignado al modulo      | Viaje                                                                              |
| Nombre                  | Gestión de Métodos de Pago                                                                   |
| Descripción             | El usuario debe poder pagar en efectivo o con tarjeta de crédito después del viaje realizado. Si no tiene una tarjeta registrada, el pago se realizara unicamente en efectivo. |
| Requerimientos previos  | El usuario debe estar en proceso de realizar un pago o intentar completar un viaje sin un método de pago registrado. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF020                                                                                         |
| Asignado al modulo      | Viaje                                                                       |
| Nombre                  | Guardar Ubicación de Viaje                                                                   |
| Descripción             | El usuario puede visualizar las direcciones frecuentes para ahorrar tiempo al solicitar un viaje. |
| Requerimientos previos  | El usuario debe de haber realizado viajes con anterioridad. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF021                                                                                         |
| Asignado al modulo      | Viaje                                                                        |
| Nombre                  | Cancelación de Viaje                                                                         |
| Descripción             | El usuario debe poder cancelar un viaje y proporcionar una razón para la cancelación. Si el usuario cancela varias veces en un día, su calificación bajará ligeramente. |
| Requerimientos previos  | El usuario debe haber solicitado un viaje para poder cancelarlo. |

| Campo                   | Detalle                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------|
| ID                      | RF022                                                                                         |
| Asignado al modulo      | Viaje                                                                          |
| Nombre                  | Solicitud de Viaje                                                                           |
| Descripción             | El usuario debe poder solicitar un viaje indicando su punto de partida y destino. Las tarifas entre las zonas de la capital de Guatemala son fijas, según una tabla predefinida. |
| Requerimientos previos  | El usuario debe estar registrado y autenticado para solicitar un viaje. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF023                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                              |
| Nombre                  | Inicio de Sesión de Conductor                                                                 |
| Descripción             | El conductor puede acceder a la plataforma utilizando su correo y contraseña o su código de trabajador. La primera vez, debe cambiar la contraseña temporal que recibe. |
| Requerimientos previos  | El conductor debe haber sido registrado previamente y contar con sus credenciales o código de trabajador. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF024                                                                                         |
| Asignado al modulo      | Viaje                                                                            |
| Nombre                  | Aceptación de Viaje                                                                          |
| Descripción             | Cuando un usuario solicita un viaje, la notificación se envía a todos los conductores disponibles. El sistema debe asegurar que solo un conductor acepte al pasajero, evitando duplicaciones. |
| Requerimientos previos  | El usuario debe haber solicitado un viaje y el conductor debe estar disponible para aceptar la solicitud. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF025                                                                                         |
| Asignado al modulo      | Viaje                                                                            |
| Nombre                  | Cancelación de Viaje por Conductor                                                           |
| Descripción             | El conductor puede cancelar un viaje que ya haya aceptado, indicando la razón de la cancelación para que el viaje pueda ser reasignado a otro conductor. |
| Requerimientos previos  | El conductor debe haber aceptado un viaje previamente y tener una razón válida para cancelarlo. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF026                                                                                         |
| Asignado al modulo      | Perfil                                                                   |
| Nombre                  | Actualización de Información Personal y del Vehículo                                         |
| Descripción             | El conductor puede actualizar su información personal o la de su vehículo enviando un documento (PDF) con los cambios solicitados. Un asistente revisará y aprobará las modificaciones. |
| Requerimientos previos  | El conductor debe tener un documento con las modificaciones que desea realizar. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF027                                                                                         |
| Asignado al modulo      | Reportes                                                                        |
| Nombre                  | Reporte de Problemas por Conductor                                                           |
| Descripción             | Si el conductor enfrenta algún problema durante su trabajo, puede reportarlo en la plataforma, describiendo lo ocurrido y especificando la fecha del incidente. |
| Requerimientos previos  | El conductor debe haber enfrentado un problema que desea reportar a través de la plataforma. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF028                                                                                         |
| Asignado al modulo      | Viaje                                                                 |
| Nombre                  | Calificación del Usuario por Conductor                                                       |
| Descripción             | Después de completar un viaje, el conductor debe poder calificar al usuario utilizando un sistema de estrellas, evaluando su comportamiento durante el viaje. |
| Requerimientos previos  | El conductor debe haber completado un viaje para poder calificar al usuario. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF029                                                                                         |
| Asignado al modulo      | Viaje                                                                 |
| Nombre                  | Visualización de Información del Usuario por Conductor                                       |
| Descripción             | Antes de aceptar un viaje, el conductor debe poder revisar la información básica del usuario, incluyendo nombre, calificación general y comentarios de otros conductores. |
| Requerimientos previos  | El usuario debe haber solicitado un viaje para que su información sea visible al conductor antes de la aceptación. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF030                                                                                         |
| Asignado al modulo      | Viaje                                                                       |
| Nombre                  | Finalización de Viaje                                                                        |
| Descripción             | Al llegar al destino, el conductor debe marcar el viaje como finalizado en la plataforma, registrando la fecha y los detalles del viaje. |
| Requerimientos previos  | El conductor debe haber completado un viaje para poder finalizarlo en la plataforma. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF031                                                                                         |
| Asignado al modulo      | Reportes                                                                         |
| Nombre                  | Resumen de Ganancias del Conductor                                                           |
| Descripción             | Al final del día, el conductor debe poder ver cuánto ha ganado. A medianoche, la plataforma guarda el total diario en un historial y lo reinicia para el día siguiente. También puede consultar el acumulado total de todas sus ganancias anteriores. |
| Requerimientos previos  | El conductor debe haber completado viajes durante el día para generar un resumen de ganancias. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF032                                                                                         |
| Asignado al modulo      | Inicio de Sesión                                                                              |
| Nombre                  | Inicio de Sesión de Asistente                                                                 |
| Descripción             | El asistente puede acceder a la plataforma utilizando su correo y contraseña o su código de trabajador. La primera vez, debe cambiar la contraseña temporal que recibe. |
| Requerimientos previos  | El asistente debe haber sido registrado previamente y contar con sus credenciales o código de trabajador. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF033                                                                                         |
| Asignado al modulo      | Conductores                                                                        |
| Nombre                  | Aceptación de Solicitudes de Empleo para Conductores                                          |
| Descripción             | El asistente revisa las solicitudes de empleo de los conductores, verificando la información y documentos proporcionados. Si todo está en orden, aprueba la solicitud y habilita al conductor para usar la plataforma. |
| Requerimientos previos  | Los conductores deben haber enviado una solicitud de empleo con todos los documentos necesarios. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF034                                                                                         |
| Asignado al modulo      | Conductores                                                                        |
| Nombre                  | Visualización de Información de los Conductores                                               |
| Descripción             | El asistente puede ver detalles sobre los conductores, como su historial de viajes, calificaciones y comentarios de los usuarios, para tomar decisiones sobre su gestión. |
| Requerimientos previos  | Los conductores deben haber realizado viajes y recibido calificaciones y comentarios. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF035                                                                                         |
| Asignado al modulo      | Conductores                                                                        |
| Nombre                  | Baja de Conductores                                                                           |
| Descripción             | El asistente puede dar de baja a un conductor por incumplir políticas, recibir muchas quejas, o a solicitud del propio conductor, desactivando su cuenta y registrando el motivo. |
| Requerimientos previos  | El conductor debe haber incumplido políticas, recibido quejas, o solicitado su baja. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF036                                                                                         |
| Asignado al modulo      | Usuarios                                                                           |
| Nombre                  | Visualización de Información de los Usuarios                                                  |
| Descripción             | El asistente puede ver información de los usuarios registrados, como su nombre, historial de viajes y comentarios recibidos, para la administración general del servicio. |
| Requerimientos previos  | Los usuarios deben estar registrados en la plataforma y haber realizado viajes. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF037                                                                                         |
| Asignado al modulo      | Usuarios                                                                           |
| Nombre                  | Baja de Usuarios                                                                              |
| Descripción             | El asistente puede dar de baja a un usuario en caso de comportamiento inapropiado, registrando el motivo de la baja en el sistema. |
| Requerimientos previos  | El usuario debe haber mostrado comportamiento inapropiado que justifique la baja. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF038                                                                                         |
| Asignado al modulo      | Promociones                                                                         |
| Nombre                  | Generación de Ofertas para Usuarios                                                           |
| Descripción             | El asistente puede crear ofertas especiales para los usuarios, aplicando descuentos según lo considere necesario para fomentar el uso de la plataforma. |
| Requerimientos previos  | El asistente debe tener autorización para generar y aplicar ofertas y descuentos. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF039                                                                                         |
| Asignado al modulo      | Solicitudes                                                                   |
| Nombre                  | Revisión de Solicitudes de Cambios en Información del Conductor                               |
| Descripción             | El asistente revisa los documentos que los conductores envían para actualizar su información y realiza los cambios necesarios en la plataforma. |
| Requerimientos previos  | Los conductores deben haber enviado solicitudes de cambio de información con los documentos necesarios. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF040                                                                                         |
| Asignado al modulo      | Reportes                                                                                      |
| Nombre                  | Generación y Visualización de Reportes de Vehículos                                           |
| Descripción             | El asistente puede generar y ver reportes detallados sobre los vehículos utilizados por los conductores, incluyendo datos importantes tanto del vehículo como del conductor. |
| Requerimientos previos  | Los vehículos deben estar registrados en la plataforma y vinculados a conductores activos. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF041                                                                                         |
| Asignado al modulo      | Reportes                                                                                      |
| Nombre                  | Generación de Reportes de la Plataforma                                                       |
| Descripción             | El administrador puede ver los siguiente reportes: Calificaciones de usuarios y conductores, estadísticas de registro, uso, y ganancias. |
| Requerimientos previos  | La plataforma debe contar con un historial de datos sobre registros, calificaciones, y transacciones para generar reportes precisos. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF042                                                                                         |
| Asignado al modulo      | Monitoreo de Calidad                                                                          |
| Nombre                  | Visualización de Calificaciones de Usuarios y Conductores                                     |
| Descripción             | El administrador tiene acceso a las calificaciones de todos los usuarios y conductores, lo que le permite monitorear la calidad del servicio que se está ofreciendo en la plataforma. |
| Requerimientos previos  | Los usuarios y conductores deben haber sido calificados por otros usuarios o conductores. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF043                                                                                         |
| Asignado al modulo      | Estadísticas de Registro                                                                      |
| Nombre                  | Visualización de Estadísticas de Registro de Usuarios, Conductores y Asistentes               |
| Descripción             | El administrador puede ver gráficos que muestran la cantidad de usuarios, conductores y asistentes registrados en la plataforma, permitiendo un monitoreo detallado del crecimiento de la base de usuarios. |
| Requerimientos previos  | La plataforma debe estar recopilando datos de registro en tiempo real y almacenándolos en un formato que permita la generación de gráficos. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF044                                                                                         |
| Asignado al modulo      | Estadísticas de Uso                                                                           |
| Nombre                  | Visualización de Estadísticas de Uso de la Plataforma                                         |
| Descripción             | El administrador puede ver gráficos que muestran cuántos viajes se han completado, cuántos se han cancelado, y cuántos están en espera, para un análisis detallado del uso de la plataforma. |
| Requerimientos previos  | La plataforma debe estar recopilando datos sobre los viajes realizados, cancelados, y en espera, y almacenándolos para la generación de gráficos. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF045                                                                                         |
| Asignado al modulo      | Reportes                                                                         |
| Nombre                  | Visualización de Reportes de Ganancias                                                        |
| Descripción             | El administrador puede ver cuánto ha ganado la plataforma, tanto en bruto como en neto, con cada viaje, y filtrar estos reportes por fecha para un control más detallado de las finanzas. |
| Requerimientos previos  | La plataforma debe estar recopilando y almacenando datos financieros de cada transacción y tener capacidad de filtrado por fechas. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF046                                                                                         |
| Asignado al modulo      | Gestión de Asistentes                                                                         |
| Nombre                  | Contratación de Asistentes                                                                    |
| Descripción             | El administrador puede contratar nuevos asistentes, creando sus perfiles en el sistema, asignándoles credenciales, y configurando sus permisos según el rol que desempeñarán. |
| Requerimientos previos  | El administrador debe contar con la autorización para crear perfiles de asistente y gestionar credenciales y permisos dentro del sistema. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF047                                                                                         |
| Asignado al modulo      | Gestión de Asistentes                                                                         |
| Nombre                  | Baja de Asistentes                                                                            |
| Descripción             | El administrador puede dar de baja a un asistente desactivando su cuenta y reasignando sus tareas a otros miembros del equipo. Esta acción se registra en el sistema para seguimiento. |
| Requerimientos previos  | El asistente debe haber sido previamente contratado y registrado en el sistema. |

| Campo                   | Detalle                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------|
| ID                      | RF048                                                                                         |
| Asignado al modulo      | Registro e Inicio de Sesión                                                                  |
| Nombre                  | Acceso a Archivos PDF de CV                                                                   |
| Descripción             | El administrador y los asistentes deben poder acceder y visualizar los archivos PDF de los CV de los conductores directamente desde la plataforma. |
| Requerimientos previos  | El sistema debe permitir el acceso y visualización de archivos PDF relacionados con el CV de los conductores. |
