module "vpc" {
  source = "./modules/vpc"
  cluster_name = var.cluster_name
}

module "eks" {
  source               = "./modules/eks"
  vpc_id               = module.vpc.vpc_id
  subnet_ids           = module.vpc.subnet_ids
  cluster_name         = var.cluster_name
  node_instance_type   = var.node_instance_type
  node_role_arn        = module.iam.eks_node_role_arn
  security_group_id    = module.sg.cicd_security_group_id
  cluster_role_arn     = module.iam.cluster_role_arn
  eks_cluster_policy_attachment = module.iam.eks_cluster_policy_attachment
  eks_service_policy_attachment = module.iam.eks_service_policy_attachment
  desired_size         = var.desired_size
  max_size             = var.max_size
  min_size             = var.min_size
}

module "iam" {
  source = "./modules/iam"
}

module "sg" {
  source = "./modules/security_groups"
  vpc_id = module.vpc.vpc_id
}
