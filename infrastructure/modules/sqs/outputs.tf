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