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

output "S3_object_fotos_dpi_clientes" {
  description = "Ruta completa del objeto fotos_dpi_clientes"
  value = aws_s3_object.fotos_dpi_clientes
}

output "SE_object_fotos_alertas_clientes" {
  description = "Ruta completa del objeto fotos_alertas_clientes"
  value = aws_s3_object.fotos_alertas_clientes
}

output "SE_object_fotos_alertas_conductres" {
  description = "Ruta completa del objeto fotos_alertas_conductores"
  value = aws_s3_object.fotos_alertas_conductores
}