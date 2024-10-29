
[REGRESAR](./Readme.md)

# Manual: Implementación de Múltiples Entornos en Terraform con Workspaces

## Introducción

Este manual describe cómo gestionar múltiples entornos (desarrollo y producción) utilizando **workspaces** en Terraform. La infraestructura está organizada en módulos y se utilizarán workspaces para separar los entornos. Esto permite que cada entorno (desarrollo y producción) mantenga sus propios recursos sin necesidad de duplicar el código.

## Pre-requisitos

1. Terraform instalado en tu máquina.
2. Acceso a AWS con las credenciales configuradas.
3. El repositorio con los módulos de Terraform que contienen los recursos de EC2 y RDS.
4. Llaves SSH para el acceso a las instancias EC2 (una por cada entorno).

## Paso 1: Estructura del Proyecto

Tu estructura de archivos debe estar organizada de la siguiente manera:

```bash
terraform/
│
├── modules/
│   ├── ec2/
│   │   └── main.tf        # Código para la instancia EC2
│   └── rds/
│       └── main.tf        # Código para RDS
├── main.tf                # Código principal que invoca los módulos
├── variables.tf           # Variables usadas en los módulos
├── outputs.tf             # Salida de los recursos creados
└── backend.tf             # Configuración del backend (opcional)
```

## Paso 2: Configuración de Workspaces

Terraform permite la creación de diferentes **workspaces** para aislar configuraciones entre entornos. Los workspaces se usarán para separar los recursos de desarrollo y producción.

1. Inicializa Terraform si es la primera vez que ejecutas el proyecto:

   ```bash
   terraform init
   ```

2. Crea un workspace para el entorno de **desarrollo**:

   ```bash
   terraform workspace new desarrollo
   ```

3. Crea un workspace para el entorno de **producción**:

   ```bash
   terraform workspace new produccion
   ```

4. Puedes cambiar entre workspaces con el siguiente comando:

   ```bash
   terraform workspace select <nombre_del_workspace>
   ```

   Para seleccionar el workspace de desarrollo:

   ```bash
   terraform workspace select desarrollo
   ```

   Para seleccionar el workspace de producción:

   ```bash
   terraform workspace select produccion
   ```

## Paso 3: Modificación de Variables por Entorno

En el archivo `variables.tf`, puedes definir las variables específicas de cada entorno utilizando el workspace actual. Terraform te permite obtener el nombre del workspace actual mediante el uso de la función `terraform.workspace`.

Agrega el siguiente bloque de código en tu `variables.tf` para manejar los entornos:

```hcl
variable "environment" {
  description = "El entorno actual (desarrollo o producción)"
  type        = string
  default     = terraform.workspace
}

variable "bastion_ami_id" {
  description = "AMI para el bastion"
  type        = string
}

variable "rds_dbname" {
  description = "Nombre de la base de datos para RDS"
  type        = string
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t3.micro"  # Puede cambiar según el entorno
}
```

Luego, en tu archivo `main.tf`, utiliza las variables de esta manera:

```hcl
module "ec2_dev" {
  source = "./ec2"
  environment = "development"
  vpc_id      = var.dev_vpc_id
  ami_id      = var.dev_ami_id
  # Otras variables
}

module "ec2_prod" {
  source = "./ec2"
  environment = "production"
  vpc_id      = var.prod_vpc_id
  ami_id      = var.prod_ami_id
  # Otras variables
}
```

De este modo, al cambiar de workspace, los recursos tomarán el nombre y configuración del entorno correspondiente (desarrollo o producción).

### Ejemplo de implementacion dentro de los modulos 

```
resource "aws_instance" "bastion" {
  ami           = var.bastion_ami_id
  instance_type = var.environment == "production" ? "t3.large" : "t3.micro"
  # Otras configuraciones
}

```


## Paso 4: Ejecución de los Entornos

1. Para aplicar los cambios en el entorno de desarrollo, selecciona el workspace de desarrollo y ejecuta el plan:

   ```bash
   terraform workspace select development
   terraform plan -var-file="terraform.development.tfvars"
   terraform apply -var-file="terraform.development.tfvars"
   ```

2. Para aplicar los cambios en el entorno de producción, selecciona el workspace de producción y repite los pasos:

   ```bash
   terraform workspace select production
   terraform plan -var-file="terraform.production.tfvars"
   terraform apply -var-file="terraform.production.tfvars"
   ```

Cada entorno (desarrollo y producción) tendrá su propia infraestructura aislada, como su propia instancia EC2, RDS, y configuraciones específicas como AMIs, nombres de base de datos, y más.

## Paso 5: Destrucción de la Infraestructura

Si deseas destruir la infraestructura de uno de los entornos, primero selecciona el workspace correspondiente y luego ejecuta el comando de destrucción:

1. Para desarrollo:

   ```bash
   terraform workspace select desarrollo
   terraform destroy -var-file="terraform.development.tfvars"
   ```

2. Para producción:

   ```bash
   terraform workspace select produccion
   terraform destroy -var-file="terraform.production.tfvars"
   ```

## Conclusión

Usar workspaces en Terraform facilita la administración de múltiples entornos sin duplicar código. Esta configuración te permite desplegar, gestionar y destruir infraestructura de forma eficiente para distintos entornos, asegurando que los recursos se mantengan separados y organizados.

[REGRESAR](./Readme.md)
