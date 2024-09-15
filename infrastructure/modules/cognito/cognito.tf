# Crear un User Pool en Cognito
resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.user_pool_name}-user-pool"

  # Configuración básica del User Pool
  username_attributes        = ["email"]  # Usa email como nombre de usuario
  auto_verified_attributes   = ["email"]

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
  }

  mfa_configuration = "OFF"

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
