terraform {
  backend "s3" {
    bucket         = "ayd2-production-state-bucket"
    key            = "states-produccion/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "ayd2-production-lock-table"
    encrypt        = true
  }
}