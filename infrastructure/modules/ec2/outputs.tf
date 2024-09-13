output "bastion_public_ip" {
  description = "The public IP of the Bastion Host"
  value       = aws_instance.bastion.public_ip
}

output "bastion_security_group" {
  description = "The Security Group ID of the Bastion Host"
  value       = aws_security_group.bastion_sg.id
}