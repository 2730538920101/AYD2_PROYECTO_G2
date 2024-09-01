variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "List of CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones to deploy resources"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "project_name" {
  description = "Project name to tag resources"
  default     = "ayd2_p1_deployment"
}

variable "AWS_REGION" {
    description = "Region de AWS utilizada"
    default = "us-east-1"
}

variable "AWS_ACCESS_KEY" {
    description = "Llave de acceso AWS"
}


variable "AWS_SECRET_KEY" {
    description = "Llave secreta para acceso AWS"
}

variable "AWS_ACCESS_TOKEN" {
    description = "Token de inicio de sesion para acceso AWS"
}

variable "aws_account_id" {
  description = "ID de la cuenta de AWS"
  type        = string
}

variable "bucket_name" {
  description = "Nombre del bucket a utilizar"
  default = "ayd2-p1"
}

variable "queue_name"{
  description = "Nombre de la cola standar de SQS a utilizar"
  default = "ayd2-p1"
}

variable "user_pool_name"{
  description = "Nombre del pool de usuarios de Cognito a utilizar"
  default = "ayd2-p1"
}

variable "rds_name" {
  description = "Nombre del servicio de base de datos RDS con Mysql"
  default = "ayd2-p1"
}

variable "ec2_name" {
  description = "Nombre del bastion host de administracion"
  default = "ayd2-p1"
}

variable "rds_dbname" {
  description = "Nombre de la base de datos"
}

variable "rds_username" {
  description = "Nombre de usuario para el acceso a la base de datos"
}

variable "rds_password" {
  description = "Password del usuario para el acceso a la base de datos"
}

variable "bastion_ami_id" {
  description = "AMI ID for the Bastion Host"
  default     = "ami-0e86e20dae9224db8" # Ubuntu AMI ID, ajustar según la región
}

variable "bastion_key_pair_name" {
  description = "Key Pair name for the Bastion Host"
  default     = "bastion-key"
}

variable "bastion_public_key_path" {
  description = "Path to the public key file for the Bastion Host"
}

variable "bastion_private_key_path" {
  description = "Path to the private key file for the Bastion Host"
}