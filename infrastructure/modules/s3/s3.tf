# Recurso para el bucket de S3
resource "aws_s3_bucket" "ayd2_p1_bucket" {
  bucket = "${var.bucket_name}-bucket"

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
