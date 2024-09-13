output "rds_endpoint" {
  description = "The endpoint of the RDS instance"
  value       = aws_db_instance.mysql.endpoint
}



output "rds_security_group" {
  description = "The Security Group ID of the RDS instance"
  value       = aws_security_group.rds_sg.id
}

