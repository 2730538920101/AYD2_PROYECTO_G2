resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.ecs_cluster_name}-cluster"
}

resource "aws_launch_configuration" "ecs_launch_configuration" {
  name                        = "${var.ecs_cluster_name}-ecs-launch-configuration"
  image_id                    = var.ecs_ami_id
  instance_type               = "t3.micro"
  iam_instance_profile        = aws_iam_instance_profile.ecs_instance_profile.name
  associate_public_ip_address = true
  security_groups             = [aws_security_group.ecs_service_sg.id]

  user_data = <<EOF
#!/bin/bash
echo ECS_CLUSTER=${aws_ecs_cluster.ecs_cluster.name} >> /etc/ecs/ecs.config
EOF
}

resource "aws_autoscaling_group" "ecs_autoscaling_group" {
  launch_configuration = aws_launch_configuration.ecs_launch_configuration.id
  min_size             = 1
  max_size             = 3
  desired_capacity     = 1
  vpc_zone_identifier  = aws_subnet.public.*.id

}

resource "aws_security_group" "ecs_service_sg" {
  name        = "${var.ecs_cluster_name}-ecs-service-sg"
  description = "Allow traffic to ECS services"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
