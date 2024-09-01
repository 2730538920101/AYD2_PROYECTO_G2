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
  vpc_id      = aws_vpc.main.id

  # Reglas de entrada (Ingress)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

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

# Crear una instancia EC2 como Bastion Host
resource "aws_instance" "bastion" {
  ami                         = var.bastion_ami_id
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.bastion_sg.id]
  key_name                    = aws_key_pair.bastion_key_pair.key_name
  associate_public_ip_address = true

  # Asegurar que el Bastion Host se cree después de la instancia de RDS
  depends_on = [aws_db_instance.mysql]

  # Transferir el script SQL y un script de conexión al Bastion Host
  provisioner "file" {
    content     = <<-EOF
      #!/bin/bash
      mysql -h ${split(":", aws_db_instance.mysql.endpoint)[0]} \
            -P ${split(":", aws_db_instance.mysql.endpoint)[1]} \
            -u ${var.rds_username} \
            --password=$DB_PASSWORD \
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

  provisioner "file" {
    source      = "database/db_init.sql"
    destination = "/home/ubuntu/db_init.sql"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.bastion_private_key_path)
      host        = self.public_ip
    }
  }

  # Instalar MySQL client y ejecutar el script SQL
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y mysql-client",
      "chmod +x /home/ubuntu/run_sql.sh",
      "DB_PASSWORD='${var.rds_password}' /home/ubuntu/run_sql.sh"
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