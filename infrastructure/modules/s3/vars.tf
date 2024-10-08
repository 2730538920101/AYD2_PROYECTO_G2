variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "project_name" {
  description = "Project name to tag resources"
  type        = string
}

variable "environment" {
  description = "El entorno actual (desarrollo o producción)"
  type        = string
}