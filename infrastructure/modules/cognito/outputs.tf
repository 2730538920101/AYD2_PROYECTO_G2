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

