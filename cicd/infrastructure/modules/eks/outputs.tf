output "cluster_id" {
  description = "EKS cluster ID"
  value       = aws_eks_cluster.jenkins-cluster.id
}

output "cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.jenkins-cluster.name
}

# locals {
#   kubeconfig = <<KUBECONFIG


# apiVersion: v1
# clusters:
# - cluster:
#     server: ${aws_eks_cluster.jenkins-cluster.endpoint}
#     certificate-authority-data: ${aws_eks_cluster.jenkins-cluster.certificate_authority.0.data}
#   name: kubernetes
# contexts:
# - context:
#     cluster: kubernetes
#     user: aws
#   name: aws
# current-context: aws
# kind: Config
# preferences: {}
# users:
# - name: aws
#   user:
#     exec:
#       apiVersion: client.authentication.k8s.io/v1beta1
#       command: aws eks get-token
#       args:
#         - "--cluster-name"
#         - "${var.cluster_name}"

# KUBECONFIG
# }

# output "kubeconfig" {
#   value = "${local.kubeconfig}"
# }
