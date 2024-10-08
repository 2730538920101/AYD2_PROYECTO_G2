variable "project_name" {
  description = "Project name to tag resources"
  type        = string
}

variable "queue_name" {
  description = "Name of the SQS queue"
  type        = string
}

variable "environment" {
  description = "El entorno actual (desarrollo o producción)"
  type        = string
}