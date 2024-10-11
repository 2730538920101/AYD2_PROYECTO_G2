variable "cidr_block" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}
variable "cluster_name" {
  description = "EKS cluster name"
  default     = "cicd-cluster"
}
