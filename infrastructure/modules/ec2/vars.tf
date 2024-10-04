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