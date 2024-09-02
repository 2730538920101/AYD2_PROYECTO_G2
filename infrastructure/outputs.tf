output "vpc_id" {
  description = "ID de la VPC creada"
  value       = aws_vpc.main.id
}

output "public_subnets" {
  description = "Lista de IDs de las subredes públicas"
  value       = aws_subnet.public.*.id
}

output "private_subnets" {
  description = "Lista de IDs de las subredes privadas"
  value       = aws_subnet.private.*.id
}

output "internet_gateway_id" {
  description = "ID del Internet Gateway"
  value       = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  description = "ID del NAT Gateway"
  value       = aws_nat_gateway.nat.id
}

output "s3_bucket_name" {
  description = "Nombre del bucket S3 creado"
  value       = aws_s3_bucket.ayd2_p1_bucket.bucket
}

output "s3_bucket_arn" {
  description = "ARN del bucket S3 creado"
  value       = aws_s3_bucket.ayd2_p1_bucket.arn
}

output "s3_bucket_id" {
  description = "ID del bucket S3 creado"
  value       = aws_s3_bucket.ayd2_p1_bucket.id
}

output "s3_bucket_public_access_block_id" {
  description = "ID del recurso de bloqueo de acceso público del bucket"
  value       = aws_s3_bucket_public_access_block.public_lock.id
}

output "s3_bucket_policy_id" {
  description = "ID de la política del bucket S3"
  value       = aws_s3_bucket_policy.public_policy.id
}

output "s3_object_fotos_perfil_conductores" {
  description = "Ruta completa del objeto fotos_perfil_conductores"
  value       = aws_s3_object.fotos_perfil_conductores.key
}

output "s3_object_fotos_perfil_clientes" {
  description = "Ruta completa del objeto fotos_perfil_clientes"
  value       = aws_s3_object.fotos_perfil_clientes.key
}

output "s3_object_fotos_perfil_asistentes" {
  description = "Ruta completa del objeto fotos_perfil_asistentes"
  value       = aws_s3_object.fotos_perfil_asistentes.key
}

output "s3_object_fotos_vehiculo_conductores" {
  description = "Ruta completa del objeto fotos_vehiculo_conductores"
  value       = aws_s3_object.fotos_vehiculo_conductores.key
}

output "s3_object_documento_cv_conductores" {
  description = "Ruta completa del objeto documento_cv_conductores"
  value       = aws_s3_object.documento_cv_conductores.key
}

output "s3_object_documento_cv_asistentes" {
  description = "Ruta completa del objeto documento_cv_asistentes"
  value       = aws_s3_object.documento_cv_asistentes.key
}

output "standard_queue_url" {
  description = "URL de la cola estándar SQS"
  value       = aws_sqs_queue.standard_queue.id
}

output "standard_queue_arn" {
  description = "ARN de la cola estándar SQS"
  value       = aws_sqs_queue.standard_queue.arn
}

output "standard_queue_policy" {
  description = "Política de acceso de la cola estándar SQS"
  value       = aws_sqs_queue_policy.standard_queue_policy.policy
}

# Output del User Pool
output "user_pool_id" {
  description = "ID del User Pool de Cognito"
  value       = aws_cognito_user_pool.user_pool.id
}

output "user_pool_arn" {
  description = "ARN del User Pool de Cognito"
  value       = aws_cognito_user_pool.user_pool.arn
}

# Output del User Pool Client
output "user_pool_client_id" {
  description = "ID del cliente de la aplicación en el User Pool de Cognito"
  value       = aws_cognito_user_pool_client.user_pool_client.id
}

# Output del Identity Pool
output "identity_pool_id" {
  description = "ID del Identity Pool de Cognito"
  value       = aws_cognito_identity_pool.identity_pool.id
}

output "identity_pool_arn" {
  description = "ARN del Identity Pool de Cognito"
  value       = aws_cognito_identity_pool.identity_pool.arn
}

# Output del IAM Role asociado
output "cognito_auth_role_arn" {
  description = "ARN del rol de autenticación asociado al Identity Pool de Cognito"
  value       = aws_iam_role.cognito_auth_role.arn
}

output "rds_endpoint" {
  description = "The endpoint of the RDS instance"
  value       = aws_db_instance.mysql.endpoint
}


output "bastion_public_ip" {
  description = "The public IP of the Bastion Host"
  value       = aws_instance.bastion.public_ip
}

output "bastion_security_group" {
  description = "The Security Group ID of the Bastion Host"
  value       = aws_security_group.bastion_sg.id
}

output "rds_security_group" {
  description = "The Security Group ID of the RDS instance"
  value       = aws_security_group.rds_sg.id
}




