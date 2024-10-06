variable "AWS_REGION" {
  description = "region utilizada de AWS"
}

variable "bastion_ami_id" {
  description = "ID de la AMI para la instancia bastión"
  type        = string
}

variable "bastion_key_pair_name" {
  description = "Nombre del par de claves para la instancia bastión"
  type        = string
}

variable "bastion_public_key_path" {
  description = "Ruta al archivo de clave pública del bastión"
  type        = string
}

variable "bastion_private_key_path" {
  description = "Ruta al archivo de clave privada del bastión"
  type        = string
}

variable "rds_username" {
  description = "Nombre de usuario para RDS"
  type        = string
}

variable "rds_password" {
  description = "Contraseña para RDS"
  type        = string
}

variable "rds_dbname" {
  description = "Nombre de la base de datos"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "ec2_name" {
  description = "Nombre de la instancia EC2"
  type        = string
}

variable "public_subnet_ids" {
  description = "Lista de IDs de las subredes públicas"
  type        = list(string)
}

variable "rds_endpoint" {
  description = "Endpoint de la instancia RDS"
  type        = string
}


variable "vpc_id" {
  description = "ID de la VPC"
  type        = string
}

variable "database_init_path" {
  description = "Ruta al db_init.sql"
}

variable "ansible_playbook_path" {
  description = "Ruta al playbook de ansible"
}


variable "github_access_token" {
  description = "Token de autenticacion para github"
}

### Variables por defecto que conectaran los contenedores de docker

variable "database_port" {
  description = "Puerto para conectarse a la base de datos"
}

# Variables de entorno para APP_SERVICE
variable "app_port" {
  description = "Puerto para el app service en Docker"
}

variable "app_host" {
  description = "Host para el app service en Docker"  
}

variable "admin_email" {
  description = "Correo del usuario administrador creado automaticamente al levantar el contenedor"
}

variable "admin_password" {
  description = "Password del usuario administrador creado automaticamente al lenvantar el contenedor"
}

variable "admin_validation" {
  description = "Clave de validacion para iniciar sesion como administrador en el app service"
}

# Variables de entorno para PRODUCER
variable "producer_port" {
  description = "Puerto para la conexion al contenedor del producer del notification service"
}

# Variables de entorno para CONSUMER
variable "consumer_port" {
  description = "Puerto para la conexion al contenedor del consumer del notification service"
}

# Variables de entorno para el frontend
variable "frontend_port" {
  description = "Puerto para la conexion al contenedor del servicio de frontend"
}

variable "next_public_app_version" {
  description = "version de la app del cliente"
}

variable "ayd2_aws_access_key_id" {
  description = "Clave de acceso AWS"
}

variable "ayd2_aws_secret_access_key" {
  description = "Clave secreta de AWS"
}

# Variables que se deben copiar a otros modulos

variable "aws_bucket_name" {
  description = "Nombre del bucket de S3 generado"
}


# Variables de entorno para AWS Cognito
variable "cognito_user_pool_id" {
  description = "ID del User Pool de Cognito"
}

variable "cognito_user_pool_client_id" {
  description = "ID del Client Pool de Cognito"
}

variable "cognito_identity_pool_id" {
  description = "ID del Identity Pool de Cognito"
}

# Variables de entorno para AWS SQS
variable "sqs_queue_url" {
  description = "URL de la cola SQS"
}

variable "next_public_app_service" {
  description = "Ruta para la API del app service"
}

variable "next_public_notification_producer_service" {
  description = "Ruta para la API del producer del notification service"
}

variable "next_public_notification_consumer_service" {
  description = "Ruta para la API del consumer del notification service"
}