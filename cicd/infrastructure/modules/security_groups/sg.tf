resource "aws_security_group" "cicd-cluster" {
  name        = "terraform-eks-cicd-cluster"
  description = "Cluster communication with worker nodes"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "terraform-eks-cicd"
  }
}

resource "aws_security_group_rule" "cicd-cluster-ingress-workstation-https" {
  cidr_blocks       = ["0.0.0.0/32"]  # Replace with your IP
  description       = "Allow workstation to communicate with the cluster API Server"
  from_port         = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.cicd-cluster.id
  to_port           = 443
  type              = "ingress"
}


