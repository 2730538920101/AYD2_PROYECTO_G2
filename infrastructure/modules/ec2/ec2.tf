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
