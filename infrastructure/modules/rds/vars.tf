variable "rds_name" {
  description = "Name of the RDS instance"
  type        = string
}

variable "rds_dbname" {
  description = "Name of the RDS database"
  type        = string
}

variable "rds_username" {
  description = "Username for the RDS database"
  type        = string
}

variable "rds_password" {
  description = "Password for the RDS database"
  type        = string
}

variable "project_name" {
  description = "Project name to tag resources"
  type        = string
}

variable "vpc_id" {
  description = "ID de la VPC"
  type        = string
}

variable "private_subnet_ids" {
  description = "Lista de IDs de las subredes privadas"
  type        = list(string)
}



variable "public_subnet_cidr_blocks" {
  description = "Lista de CIDR de las subredes públicas"
  type        = list(string)
}



variable "private_subnet_availability_zones" {
  description = "Lista de zonas de disponibilidad de las subredes privadas"
  type        = list(string)
}

variable "environment" {
  description = "El entorno actual (desarrollo o producción)"
  type        = string
}