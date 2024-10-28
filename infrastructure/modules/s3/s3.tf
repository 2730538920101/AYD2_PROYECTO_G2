# Recurso para el bucket de S3
resource "aws_s3_bucket" "ayd2_p1_bucket" {
  bucket = "${var.bucket_name}-bucket"

  tags = {
    Name = "${var.project_name}-s3"
  }
}


# Recurso para el bloqueo de acceso público del bucket de S3
resource "aws_s3_bucket_public_access_block" "public_lock" {
  bucket = aws_s3_bucket.ayd2_p1_bucket.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true

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
