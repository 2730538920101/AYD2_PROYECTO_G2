variable "vpc_id" {}
variable "subnet_ids" {}
variable "cluster_name" {}
variable "node_instance_type" {}
variable "security_group_id" {}
variable "eks_cluster_policy_attachment" {
  
}
variable "node_role_arn" {
  
}
variable "eks_service_policy_attachment" {
  
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

# Nuevas variables para los roles
variable "cluster_role_arn" {
  description = "ARN del rol de IAM para el cluster"
}


