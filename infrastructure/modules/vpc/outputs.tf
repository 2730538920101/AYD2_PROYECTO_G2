output "vpc_id" {
  description = "ID de la VPC creada"
  value       = aws_vpc.main.id
}

output "public_subnets" {
  description = "Lista de IDs de las subredes públicas"
  value       = aws_subnet.public.*.id
}


output "internet_gateway_id" {
  description = "ID del Internet Gateway"
  value       = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  description = "ID del NAT Gateway"
  value       = aws_nat_gateway.nat.id
}

output "public_subnets_cidrs" {
  description = "Lista de CIDR blocks de las subredes públicas"
  value       = aws_subnet.public[*].cidr_block
}

output "private_subnet_availability_zones" {
  description = "Lista de Availability Zones para las subredes privadas"
  value       = aws_subnet.private[*].availability_zone
}


output "private_subnets" {
  description = "Lista de IDs de las subredes privadas"
  value       = aws_subnet.private[*].id
}

