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



variable "cluster_name" {
  description = "EKS cluster name"
  default     = "cicd-cluster"
}

variable "node_instance_type" {
  description = "EKS worker node instance type"
  default     = "t3.medium"
}

variable "desired_size" {
  description = "Número deseado de instancias del grupo de nodos"
  default     = 2
}

variable "max_size" {
  description = "Número máximo de instancias del grupo de nodos"
  default     = 5
}

variable "min_size" {
  description = "Número mínimo de instancias del grupo de nodos"
  default     = 1
}

