locals {
  cognito = terraform.workspace == "production" && length(module.cognito_prod) > 0 ? module.cognito_prod[0] : module.cognito_dev[0]
  s3_bucket = terraform.workspace == "production" && length(module.s3_prod) > 0 ? module.s3_prod[0] : module.s3_dev[0]
  sqs_queue = terraform.workspace == "production" && length(module.sqs_prod) > 0 ? module.sqs_prod[0] : module.sqs_dev[0]
  vpc = terraform.workspace == "production" && length(module.vpc_prod) > 0 ? module.vpc_prod[0] : module.vpc_dev[0]
}

output "user_pool_id" {
  value = length(local.cognito) > 0 ? local.cognito.user_pool_id : ""
}

output "user_pool_client_id" {
  value = length(local.cognito) > 0 ? local.cognito.user_pool_client_id : ""
}

output "identity_pool_id" {
  value = length(local.cognito) > 0 ? local.cognito.identity_pool_id : ""
}

output "user_pool_arn" {
  value = length(local.cognito) > 0 ? local.cognito.user_pool_arn : ""
}

output "bastion_public_ip" {
  value = terraform.workspace == "production" && length(module.ec2_prod) > 0 ? module.ec2_prod[0].bastion_public_ip : ""
}

output "rds_endpoint" {
  value = terraform.workspace == "production" && length(module.rds_prod) > 0 ? module.rds_prod[0].rds_endpoint : ""
}

output "s3_bucket_name" {
  value = length(local.s3_bucket) > 0 ? local.s3_bucket.s3_bucket_name : ""
}

output "standard_queue_url" {
  value = length(local.sqs_queue) > 0 ? local.sqs_queue.standard_queue_url : ""
}

output "vpc_id" {
  value = length(local.vpc) > 0 ? local.vpc.vpc_id : ""
}
