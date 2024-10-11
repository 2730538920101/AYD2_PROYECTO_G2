output "vpc_id" {
  value = aws_vpc.cicd_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.cicd_subnet[*].id  # Esto debe devolver las subredes públicas
}
