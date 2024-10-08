variable "project_name" {
  description = "Project name to tag resources"
  type        = string
}

variable "user_pool_name" {
  description = "Name of the Cognito User Pool"
  type        = string
}

variable "AWS_REGION" {
  description = "AWS region for Cognito resources"
  type        = string
}

variable "environment" {
  description = "El entorno actual (desarrollo o producción)"
  type        = string
}