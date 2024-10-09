## Primer paso de ejecucion

-   Crear los archivos terraform.tfvars, terraform.development.tfvars y terraform.production.tfvars

-   Ejecuta el comando para aplicar solo el recurso de bloqueo de acceso público:
    -   terraform apply -target=aws_s3_bucket_public_access_block.public_lock

-   Una vez que el bloqueo de acceso público esté configurado, aplica la configuración del bucket y la política:
    -   terraform apply -target=aws_s3_bucket.ayd2_p1_bucket -var-file="terraform.environment.tfvars"
    -   terraform apply -target=aws_s3_bucket_policy.public_policy -var-file="terraform.environment.tfvars"

-   Para crear las keypairs del bastion host (ec2 de administracion) usaremos ssh-keygen, con esto crearemos una llave publica y privada que asociaremos al keypair
    -   ssh-keygen -t rsa -b 4096 -f /home/carlos/Escritorio/AYD2_PROYECTO_G2/infrastructure/ayd2_p1_bastion_key

-   Crear las variables de entorno con las rutas a estos archivos y demas variables de entorno en terraform.tfvars

-   Por ultimo ejecuta terraform apply para iniciar el resto de la infrastructura


## Manual para separar entornos en terraform

["MANUAL DE WORKSPACES EN TERRAFORM"](/infrastructure/manual_terraform_workspaces.md)

# Guía de Terraform: Separación de Entornos y Recursos en Listas

Cuando trabajas con Terraform y gestionas múltiples entornos, puede suceder que algunos recursos que antes eran únicos se conviertan en **listas**. Esto puede ocurrir por varios motivos, como la utilización de **módulos**, **workspaces** o el uso de parámetros como `count` y `for_each`. A continuación, explicamos las razones de este comportamiento y cómo solucionarlo.

---

## 1. Múltiples Instancias por Entorno o Módulo

Cuando utilizas módulos o separas tus entornos (por ejemplo, desarrollo, pruebas y producción), Terraform puede tratar cada instancia del módulo como un elemento de una lista. Esto sucede porque cada entorno se gestiona como una instancia separada del módulo.

### Ejemplo:
```
module "s3_dev" {
  source = "./modules/s3"
  bucket_name = "dev-bucket"
}

module "s3_prod" {
  source = "./modules/s3"
  bucket_name = "prod-bucket"
}
```
##  Al usar estos módulos, los recursos generados dentro de cada entorno son tratados como listas:

```
aws_s3_bucket.s3_dev[0].id  # Acceso al bucket de desarrollo
aws_s3_bucket.s3_prod[0].id # Acceso al bucket de producción

```

Incluso si tienes un solo recurso por entorno, la referencia al módulo puede generarse como una lista.

### Solucion

Accede al recurso de la lista utilizando el índice [0] si esperas un solo recurso en el módulo. De esta manera, evitas el error de lista.


##  2. Uso de count o for_each

Si utilizas el parámetro count o for_each para generar múltiples instancias de un recurso, Terraform las tratará como una lista.

### Ejemplo con count:
```
resource "aws_s3_bucket" "example" {
  count  = 2
  bucket = "example-bucket-${count.index}"
}
```
####    Este código crea dos buckets, accesibles mediante índices:

```
aws_s3_bucket.example[0].id  # Primer bucket
aws_s3_bucket.example[1].id  # Segundo bucket

```

### Ejemplo con for_each:
```
resource "aws_s3_bucket" "example" {
  for_each = toset(["dev-bucket", "prod-bucket"])
  bucket   = each.value
}
```
Aquí, dev-bucket y prod-bucket son tratados como recursos individuales:

```
aws_s3_bucket.example["dev-bucket"].id  # Bucket de desarrollo
aws_s3_bucket.example["prod-bucket"].id # Bucket de producción
```
## 3. Separación de Entornos con Workspaces
Cuando gestionas entornos utilizando workspaces (como dev, prod y staging), cada recurso puede ser creado o gestionado en un entorno diferente. Esto hace que algunos recursos sean tratados como listas, ya que se asignan diferentes configuraciones a cada workspace.

### Comandos de Workspaces:

####    Crear un workspace:

```
terraform workspace new dev
```

####    Seleccionar un workspace:

```
terraform workspace select dev
```
Cuando usas workspaces, la referencia a los recursos también puede aparecer como listas, dependiendo de cómo estén definidos.

##  4. Modularización de Recursos

Al usar módulos para definir recursos reutilizables, estos también pueden ser tratados como listas. Esto sucede porque Terraform permite instanciar el mismo módulo múltiples veces, lo que genera una lista de instancias del módulo.

### Ejemplo de uso de módulos:

```
module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}
```

Si este módulo es utilizado en múltiples entornos o configuraciones, puede aparecer como una lista al ser referenciado:

```
module.s3[0].aws_s3_bucket.my_bucket.id  # Primer entorno (por ejemplo, dev)
module.s3[1].aws_s3_bucket.my_bucket.id  # Segundo entorno (por ejemplo, prod)
```

##  5. Varias Instancias en Planes de Ejecución
Si defines diferentes configuraciones para cada entorno, como buckets en desarrollo y producción, Terraform agrupará estos recursos en listas, generando una instancia de cada recurso por entorno.

### Ejemplo de Configuración de S3 con Módulos
A continuación se muestra un ejemplo práctico donde configuramos un bucket de S3 con diferentes políticas y bloqueos, separados en entornos:

```
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
        Principal = "*",  # Este campo es obligatorio para las políticas de S3
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

  depends_on = [
    aws_s3_bucket.ayd2_p1_bucket,
  ]
}

# Ejemplos de archivos subidos a S3
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

```

##  Cómo Resolver el Tratamiento de Recursos como Listas

### 1. Si esperas un único recurso:
Asegúrate de no estar usando count, for_each o llamando al módulo más de una vez.
Accede al recurso usando el índice [0] cuando esperes un solo resultado.

### 2. Si necesitas múltiples instancias:
Utiliza la notación de índice de lista para referenciar las instancias individuales:

```
module.s3[0].aws_s3_bucket.my_bucket.id  # Primer entorno
module.s3[1].aws_s3_bucket.my_bucket.id  # Segundo entorno
```

### 3. Si utilizas módulos:
Organiza correctamente las referencias a los módulos en base a los entornos o workspaces que estés utilizando.

