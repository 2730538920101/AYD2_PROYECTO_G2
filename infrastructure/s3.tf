resource "aws_s3_bucket" "ayd2_p1_bucket" {
  bucket = "${var.bucket_name}-bucket"

  tags = {
    Name = "${var.project_name}-s3"
  }
}

# Configuración del bloqueo de acceso público del bucket
resource "aws_s3_bucket_public_access_block" "public_lock" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.id

  block_public_acls          = false
  ignore_public_acls         = false
  block_public_policy        = false
  restrict_public_buckets    = false
}

# Crear carpetas dentro del bucket usando objetos vacíos
resource "aws_s3_object" "fotos_perfil_conductores" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_perfil_conductores/"
}

resource "aws_s3_object" "fotos_perfil_clientes" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_perfil_clientes/"
}

resource "aws_s3_object" "fotos_perfil_asistentes" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.bucket
  key    = "fotos_perfil_asistentes/"
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

# Configuración de la política para permitir acceso público para desarrollo
resource "aws_s3_bucket_policy" "public_policy" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.id
  
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::${aws_s3_bucket.ayd2_p1_bucket.bucket}",
        "arn:aws:s3:::${aws_s3_bucket.ayd2_p1_bucket.bucket}/*"
      ]
    }
  ]
}
POLICY
}