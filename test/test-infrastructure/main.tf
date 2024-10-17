# Declaración de variables
variable "bucket_name" {
  description = "Nombre del bucket de S3"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "queue_name" {
  description = "Nombre de la cola de SQS"
  type        = string
}

variable "user_pool_name" {
  description = "Nombre del User Pool de Cognito"
  type        = string
}

variable "AWS_REGION" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

# Proveedor de AWS
provider "aws" {
  region = "${var.AWS_REGION}"  # Cambia la región si es necesario
}

# Crear el usuario IAM
resource "aws_iam_user" "cognito_s3_sqs_user" {
  name = "cognito-s3-sqs-user"
}

# Crear la política de permisos
resource "aws_iam_policy" "cognito_s3_sqs_policy" {
  name        = "CognitoS3SQSPolicy"
  description = "Política para dar permisos completos sobre Cognito, S3 y SQS"
  policy      = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cognito-identity:*",
        "cognito-idp:*",
        "cognito-sync:*",
        "s3:*",
        "sqs:*"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

# Asignar la política al usuario
resource "aws_iam_user_policy_attachment" "user_policy_attachment" {
  user       = aws_iam_user.cognito_s3_sqs_user.name
  policy_arn = aws_iam_policy.cognito_s3_sqs_policy.arn
}

# Crear las credenciales de acceso para el usuario
resource "aws_iam_access_key" "user_access_key" {
  user = aws_iam_user.cognito_s3_sqs_user.name
}

## S3

# Recurso para el bucket de S3
resource "aws_s3_bucket" "ayd2_p1_bucket" {
  bucket = "${var.bucket_name}-bucket"
  force_destroy = true

  tags = {
    Name = "${var.project_name}-s3"
  }
}

# Configuración de la política de acceso para el bucket de S3
resource "aws_s3_bucket_policy" "public_policy" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.id
  
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*",  # Permitir acceso a todos
        Action = [
          "s3:PutBucketPolicy",
          "s3:GetBucketPolicy",
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket"
        ],
        Resource = [
          aws_s3_bucket.ayd2_p1_bucket.arn,
          "${aws_s3_bucket.ayd2_p1_bucket.arn}/*"
        ]
      }
    ]
  })
  
  # Dependencia explícita del bucket de S3
  depends_on = [
    aws_s3_bucket.ayd2_p1_bucket,
  ]
}

# Recurso para el bloqueo de acceso público del bucket de S3
resource "aws_s3_bucket_public_access_block" "public_lock" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false

  # Dependencia explícita de la política de S3
  depends_on = [
    aws_s3_bucket.ayd2_p1_bucket,
  ]
}

resource "aws_s3_object" "fotos_vehiculo_conductores" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_vehiculo_conductores/"
}

resource "aws_s3_object" "documento_cv_conductores" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "documento_cv_conductores/"
}

resource "aws_s3_object" "documento_cv_asistentes" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "documento_cv_asistentes/"
}

resource "aws_s3_object" "fotos_dpi_clientes" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_dpi_clientes/"
}

resource "aws_s3_object" "fotos_alertas_clientes" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_alertas_clientes/"
}

resource "aws_s3_object" "fotos_alertas_conductores" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_alertas_conductores/"
}

## SQS

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

## Cognito

# Crear un User Pool en Cognito
resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.user_pool_name}-user-pool"

  # Configuración básica del User Pool
  username_attributes        = ["email"]  # Usa email como nombre de usuario
  auto_verified_attributes   = [] # no enviar correo

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
  }

  mfa_configuration = "OFF"

  lambda_config {
    pre_sign_up = aws_lambda_function.pre_sign_up.arn
  }

  tags = {
    Name = "${var.project_name}-user-pool"
  }
}

# Crear una aplicación cliente para el User Pool
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "${var.user_pool_name}-user-pool-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  # Configuración de la aplicación cliente
  generate_secret = false
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
}

# Crear un Identity Pool para la federación de identidades
resource "aws_cognito_identity_pool" "identity_pool" {
  identity_pool_name               = "${var.user_pool_name}-identity-pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id     = aws_cognito_user_pool_client.user_pool_client.id
    provider_name = "cognito-idp.${var.AWS_REGION}.amazonaws.com/${aws_cognito_user_pool.user_pool.id}"
  }


  tags = {
    Name = "${var.project_name}-identity-pool"
  }
}

# Crear un rol para la autenticación de usuarios
resource "aws_iam_role" "cognito_auth_role" {
  name = "${var.user_pool_name}-cognito-auth-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identity_pool.id}"
        }
      }
    }
  ]
}
EOF
}

# Crear grupos para usuarios
resource "aws_cognito_user_group" "admin_group" {
  name        = "AdminGroup"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  description  = "Group for administrators"
  precedence   = 1
}

resource "aws_cognito_user_group" "assistant_group" {
  name        = "AssistantGroup"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  description  = "Group for assistants"
  precedence   = 2
}

resource "aws_cognito_user_group" "driver_group" {
  name        = "DriverGroup"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  description  = "Group for drivers"
  precedence   = 3
}

resource "aws_cognito_user_group" "client_group" {
  name        = "ClientGroup"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  description  = "Group for clients"
  precedence   = 4
}

# Crear roles para usuarios
resource "aws_iam_role" "admin_role" {
  name = "${var.user_pool_name}-admin-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identity_pool.id}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role" "driver_role" {
  name = "${var.user_pool_name}-driver-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identity_pool.id}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role" "client_role" {
  name = "${var.user_pool_name}-client-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identity_pool.id}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role" "assistant_role" {
  name = "${var.user_pool_name}-assistant-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identity_pool.id}"
        }
      }
    }
  ]
}
EOF
}

# Asociar roles con el Identity Pool
resource "aws_cognito_identity_pool_roles_attachment" "identity_pool_roles_attachment" {
  identity_pool_id = aws_cognito_identity_pool.identity_pool.id

  roles = {
    authenticated = aws_iam_role.admin_role.arn  # Default role for authenticated users
    unauthenticated = aws_iam_role.client_role.arn  # Role for unauthenticated users if any
  }

  # Puedes especificar roles adicionales para cada grupo aquí
  # Si los roles deben ser asignados dinámicamente según el grupo,
  # necesitarás un sistema adicional para manejar esa lógica
}

## Lambda para auto-verificar los usuarios

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-exec-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_exec_policy" {
  name   = "lambda-exec-policy"
  role   = aws_iam_role.lambda_exec_role.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      Effect   = "Allow"
      Resource = "arn:aws:logs:*:*:*"
    }]
  })
}

resource "local_file" "lambda_js" {
  filename = "lambda.js"
  content  = <<EOF
exports.handler = async (event) => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
    return event;
};
EOF
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = local_file.lambda_js.filename
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "pre_sign_up" {
  filename      = "lambda_function_payload.zip"
  function_name = "preSignUpAutoConfirm"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "lambda.handler"
  runtime       = "nodejs18.x"
  
  source_code_hash = data.archive_file.lambda.output_base64sha256
}

resource "aws_lambda_permission" "allow_cognito" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_sign_up.function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.user_pool.arn
}

## OUTPUTS

# Salidas para obtener los valores de AWS y Cognito
output "AWS_BUCKET_NAME" {
  value = aws_s3_bucket.ayd2_p1_bucket.id  # Asumiendo que el nombre del bucket es igual a esta variable
  description = "Nombre del bucket de S3"
}

output "AWS_ACCESS_KEY_ID" {
  value       = aws_iam_access_key.user_access_key.id
  description = "La AWS Access Key ID"
  sensitive   = true
}

output "AWS_SECRET_ACCESS_KEY" {
  value       = aws_iam_access_key.user_access_key.secret
  description = "La AWS Secret Access Key"
  sensitive   = true
}

output "COGNITO_USER_POOL_ID" {
  value       = aws_cognito_user_pool.user_pool.id
  description = "ID del User Pool de Cognito"
}

output "COGNITO_USER_POOL_CLIENT_ID" {
  value       = aws_cognito_user_pool_client.user_pool_client.id
  description = "ID del cliente del User Pool de Cognito"
}

output "COGNITO_IDENTITY_POOL_ID" {
  value       = aws_cognito_identity_pool.identity_pool.id
  description = "ID del Identity Pool de Cognito"
}

output "SQS_QUEUE_URL" {
  value       = aws_sqs_queue.standard_queue.id
  description = "URL de la cola de SQS"
}
