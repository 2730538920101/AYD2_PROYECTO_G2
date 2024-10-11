resource "aws_eks_cluster" "jenkins-cluster" {
  name            = var.cluster_name
  role_arn        = var.cluster_role_arn

  vpc_config {
    security_group_ids = [var.security_group_id]
    subnet_ids         = var.subnet_ids
  }

  depends_on = [
    var.eks_cluster_policy_attachment,
    var.eks_service_policy_attachment,
  ]
}

resource "aws_eks_node_group" "jenkins_node_group" {
  cluster_name    = aws_eks_cluster.jenkins-cluster.name
  node_group_name = "${var.cluster_name}-node-group"
  node_role_arn   = var.node_role_arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = var.desired_size
    max_size     = var.max_size
    min_size     = var.min_size
  }

  instance_types = [var.node_instance_type]

  remote_access {
    ec2_ssh_key = "eks-cluster-key"
    source_security_group_ids = [var.security_group_id]
  }

  tags = {
    Name = "${var.cluster_name}-node-group"
  }
}

resource "aws_key_pair" "eks_cluster_key" {
  key_name   = "eks-cluster-key"
  public_key = file("${path.module}/eks-cluster-key.pub")
}


