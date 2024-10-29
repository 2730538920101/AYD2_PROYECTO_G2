output "cluster_role_arn" {
  description = "ARN of the IAM role for the EKS cluster"
  value       = aws_iam_role.cicd-cluster.arn
}

output "cluster_role_name" {
  description = "Name of the IAM role for the EKS cluster"
  value       = aws_iam_role.cicd-cluster.name
}

output "eks_cluster_policy_attachment" {
  description = "Policy attachment for AmazonEKSClusterPolicy"
  value       = aws_iam_role_policy_attachment.cicd-cluster-AmazonEKSClusterPolicy.id
}

output "eks_service_policy_attachment" {
  description = "Policy attachment for AmazonEKSServicePolicy"
  value       = aws_iam_role_policy_attachment.cicd-cluster-AmazonEKSServicePolicy.id
}

output "eks_node_role_arn" {
  value = aws_iam_role.eks_node_role.arn
}