# Crear el Key Pair para la instancia EC2
resource "aws_key_pair" "bastion_key_pair" {
  key_name   = var.bastion_key_pair_name
  public_key = file(var.bastion_public_key_path)
  tags = {
    Name = "${var.project_name}-bastion-key"
  }
}

# Crear un Security Group para la instancia EC2 (Bastion Host)
resource "aws_security_group" "bastion_sg" {
  name        = "${var.ec2_name}-bastion-sg"
  description = "Security group for Bastion Host"
  vpc_id      = var.vpc_id

  # Reglas de entrada (Ingress)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # SSH
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Puerto para el contenedor 1 (5000)
  }

  ingress {
    from_port   = 4100
    to_port     = 4100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Puerto para el contenedor 2 (4100)
  }

  ingress {
    from_port   = 4200
    to_port     = 4200
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Puerto para el contenedor 3 (4200)
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Puerto para el contenedor 4 (3000)
  }

  # Reglas de salida (Egress)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-bastion-sg"
  }
}

# Crear la instancia EC2 como Bastion Host
resource "aws_instance" "bastion" {
  ami                         = var.bastion_ami_id
  instance_type               = "t3.micro"
  subnet_id                   = var.public_subnet_ids[0]
  vpc_security_group_ids      = [aws_security_group.bastion_sg.id]
  key_name                    = aws_key_pair.bastion_key_pair.key_name
  associate_public_ip_address = true

  # Instalar Ansible en el Bastion Host
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y software-properties-common",
      "sudo apt-add-repository --yes --update ppa:ansible/ansible",
      "sudo apt-get install -y ansible"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }

  # Transferir el playbook de Ansible
  provisioner "file" {
    source      = var.ansible_playbook_path
    destination = "/home/ubuntu/playbook.yaml"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }

  # Transferir el archivo SQL
  provisioner "file" {
    source      = var.database_init_path
    destination = "/home/ubuntu/db_init.sql"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }

  provisioner "file" {
    content     = <<-EOF
      #!/bin/bash
      mysql -h ${split(":", var.rds_endpoint)[0]} \
            -P ${split(":", var.rds_endpoint)[1]} \
            -u ${var.rds_username} \
            --password=${var.rds_password} \
            < /home/ubuntu/db_init.sql
    EOF
    destination = "/home/ubuntu/run_sql.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }

  # Configurar variables de entorno para RDS
  provisioner "remote-exec" {
    inline = [  
        "export GITHUB_TOKEN=${var.github_access_token}",
        "export MYSQL_DATABASE=${var.rds_dbname}",
        "export MYSQL_USER=${var.rds_username}",
        "export MYSQL_PASSWORD=${var.rds_password}",
        "export MYSQL_HOST=${var.rds_endpoint}",
        "export DATABASE_PORT=${var.database_port}",

        "export APP_PORT=${var.app_port}",
        "export APP_HOST=${var.app_host}",
        "export AWS_REGION=${var.AWS_REGION}",
        "export AWS_BUCKET_NAME=${var.aws_bucket_name}",
        "export AWS_ACCESS_KEY_ID=${var.ayd2_aws_access_key_id}",
        "export AWS_SECRET_ACCESS_KEY=${var.ayd2_aws_secret_access_key}",

        "export COGNITO_USER_POOL_ID=${var.cognito_user_pool_id}",
        "export COGNITO_USER_POOL_CLIENT_ID=${var.cognito_user_pool_client_id}",
        "export COGNITO_IDENTITY_POOL_ID=${var.cognito_identity_pool_id}",

        "export ADMIN_EMAIL=${var.admin_email}",
        "export ADMIN_PASSWORD=${var.admin_password}",
        "export ADMIN_VALIDATION=${var.admin_validation}",

        "export SQS_QUEUE_URL=${var.sqs_queue_url}",
        "export PRODUCER_PORT=${var.producer_port}",
        "export CONSUMER_PORT=${var.consumer_port}",
        "export FRONTEND_PORT=${var.frontend_port}",
        "export NEXT_PUBLIC_APP_SERVICE=${var.next_public_app_service}",
        "export NEXT_PUBLIC_NOTIFICATION_PRODUCER_SERVICE=${var.next_public_notification_producer_service}",
        "export NEXT_PUBLIC_NOTIFICATION_CONSUMER_SERVICE=${var.next_public_notification_consumer_service}",
        "export NEXT_PUBLIC_APP_VERSION=${var.next_public_app_version}",
        "ansible-playbook /home/ubuntu/playbook.yaml"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }
  tags = {
    Name = "${var.project_name}-bastion-host"
  }
}
