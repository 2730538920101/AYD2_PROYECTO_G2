output "user_pool_id" {
  value       = module.cognito.user_pool_id
}

output "user_pool_client_id" {
  value = module.cognito.user_pool_client_id
}

output "identity_pool_id" {
  value = module.cognito.identity_pool_id
}

output "user_pool_arn" {
  value       = module.cognito.user_pool_arn
}

output "bastion_public_ip" {
  value       = module.ec2.bastion_public_ip
}

output "rds_endpoint" {
  value       = module.rds.rds_endpoint
}

output "s3_bucket_name" {
  value       = module.s3.s3_bucket_name
}

output "standard_queue_url" {
  value       = module.sqs.standard_queue_url
}

output "vpc_id" {
  value       = module.vpc.vpc_id
}

# Agrega más outputs según sea necesario para otros recursos importantes
