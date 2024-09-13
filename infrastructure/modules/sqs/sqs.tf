resource "aws_sqs_queue" "standard_queue" {
  name = "${var.queue_name}-standard-queue"

  # Configuración de la cola estándar
  delay_seconds                = 0
  max_message_size             = 262144  # Tamaño máximo del mensaje en bytes
  message_retention_seconds    = 345600  # Retención del mensaje en segundos
  visibility_timeout_seconds   = 30
  tags = {
    Name = "${var.project_name}-standard-queue"
  }
}



# Opcional: Política de acceso para la cola (si es necesario)
resource "aws_sqs_queue_policy" "standard_queue_policy" {
  queue_url = aws_sqs_queue.standard_queue.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "SQS:*",
      "Resource": "${aws_sqs_queue.standard_queue.arn}"
    }
  ]
}
POLICY
}

