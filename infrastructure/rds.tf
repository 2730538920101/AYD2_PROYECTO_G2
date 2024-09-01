# Crear un Security Group para RDS
resource "aws_security_group" "rds_sg" {
  name        = "${var.rds_name}-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main.id

  # Reglas de entrada (Ingress)
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.public[0].cidr_block]
  }

  # Reglas de salida (Egress)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

# Crear una instancia RDS de MySQL
resource "aws_db_instance" "mysql" {
  allocated_storage    = 20
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  identifier           = "mysql"
  db_name              = var.rds_dbname
  username             = var.rds_username
  password             = var.rds_password
  multi_az             = "false"
  parameter_group_name = "default.mysql8.0"
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  availability_zone = aws_subnet.private[0].availability_zone
  # Backup y mantenimiento
  storage_type            = "gp2"
  backup_retention_period = 30
  skip_final_snapshot     = true

  tags = {
    Name = "${var.project_name}-rds"
  }
}

# Subnet Group para RDS
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "${var.rds_name}-rds-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-rds-subnet-group"
  }
}
