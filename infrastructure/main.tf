module "vpc" {
  source                  = "./modules/vpc"
  vpc_cidr                = var.vpc_cidr
  public_subnet_cidrs     = var.public_subnet_cidrs
  private_subnet_cidrs    = var.private_subnet_cidrs
  availability_zones      = var.availability_zones
  project_name            = var.project_name
}

module "ec2" {
  source = "./modules/ec2"
  bastion_ami_id             = var.bastion_ami_id
  bastion_key_pair_name      = var.bastion_key_pair_name
  bastion_public_key_path    = var.bastion_public_key_path
  bastion_private_key_path   = var.bastion_private_key_path
  rds_username               = var.rds_username
  rds_password               = var.rds_password
  project_name               = var.project_name
  ec2_name                   = var.ec2_name
  public_subnet_ids          = module.vpc.public_subnets
  rds_endpoint               = module.rds.rds_endpoint
  vpc_id                      = module.vpc.vpc_id
}

module "rds" {
  source = "./modules/rds"
  
  public_subnet_cidr_blocks       = module.vpc.public_subnets_cidrs
  private_subnet_availability_zones = module.vpc.private_subnet_availability_zones
  rds_dbname                       = var.rds_dbname
  rds_username                     = var.rds_username
  rds_password                     = var.rds_password
  project_name                     = var.project_name
  rds_name                         = var.rds_name
  vpc_id                      = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnets
}

module "s3" {
  source = "./modules/s3"
  bucket_name                 = var.bucket_name
  project_name                = var.project_name
}

module "sqs" {
  source = "./modules/sqs"
  project_name                = var.project_name
  queue_name                  = var.queue_name
}


module "cognito" {
  source = "./modules/cognito"
  project_name                = var.project_name
  user_pool_name              = var.user_pool_name
  AWS_REGION                  = var.AWS_REGION
}


