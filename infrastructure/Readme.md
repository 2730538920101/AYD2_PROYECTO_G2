## Primer paso de ejecucion

-   Ejecuta el comando para aplicar solo el recurso de bloqueo de acceso público:
    -   terraform apply -target=aws_s3_bucket_public_access_block.public_lock

-   Una vez que el bloqueo de acceso público esté configurado, aplica la configuración del bucket y la política:
    -   terraform apply -target=aws_s3_bucket.ayd2_p1_bucket
    -   terraform apply -target=aws_s3_bucket_policy.public_policy

-   Para crear las keypairs del bastion host (ec2 de administracion) usaremos ssh-keygen, con esto crearemos una llave publica y privada que asociaremos al keypair
    -   ssh-keygen -t rsa -b 4096 -f /home/carlos/Escritorio/AYD2_PROYECTO_G2/infrastructure/ayd2_p1_bastion_key

-   Crear las variables de entorno con las rutas a estos archivos y demas variables de entorno en terraform.tfvars

-   Por ultimo ejecuta terraform apply para iniciar el resto de la infrastructura