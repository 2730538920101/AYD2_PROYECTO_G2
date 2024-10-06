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
  AWS_REGION                                        = var.AWS_REGION
  bastion_ami_id                                    = var.bastion_ami_id
  bastion_key_pair_name                             = var.bastion_key_pair_name
  bastion_public_key_path                           = var.bastion_public_key_path
  bastion_private_key_path                          = var.bastion_private_key_path
  rds_username                                      = var.rds_username
  rds_password                                      = var.rds_password
  rds_dbname                                        = var.rds_dbname
  project_name                                      = var.project_name
  ec2_name                                          = var.ec2_name
  public_subnet_ids                                 = module.vpc.public_subnets
  rds_endpoint                                      = module.rds.rds_endpoint
  vpc_id                                            = module.vpc.vpc_id
  database_init_path                                = var.database_init_path
  ansible_playbook_path                             = var.ansible_playbook_path
  github_access_token                               = var.github_access_token
  # Variables de Docker
  database_port                                     = var.database_port
  app_port                                          = var.app_port
  app_host                                          = var.app_host      
  admin_email                                       = var.admin_email
  admin_password                                    = var.admin_password
  admin_validation                                  = var.admin_validation
  producer_port                                     = var.producer_port
  consumer_port                                     = var.consumer_port
  frontend_port                                     = var.frontend_port
  next_public_app_version                           = var.next_public_app_version
  ayd2_aws_access_key_id                            = var.ayd2_aws_access_key_id
  ayd2_aws_secret_access_key                        = var.ayd2_aws_secret_access_key 
   # Nuevas variables de entorno obtenidas de los outputs
  aws_bucket_name                                   = module.s3.s3_bucket_name    # Asignando el nombre del bucket de S3
  cognito_user_pool_id                              = module.cognito.user_pool_id
  cognito_user_pool_client_id                       = module.cognito.user_pool_client_id
  cognito_identity_pool_id                          = module.cognito.identity_pool_id
  sqs_queue_url                                     = module.sqs.standard_queue_url     # Asignando la URL de la cola SQS
  next_public_app_service                           = var.next_public_app_service
  next_public_notification_producer_service         = var.next_public_notification_producer_service
  next_public_notification_consumer_service         = var.next_public_notification_consumer_service 
}

module "rds" {
  source = "./modules/rds"
  
  public_subnet_cidr_blocks         = module.vpc.public_subnets_cidrs
  private_subnet_availability_zones = module.vpc.private_subnet_availability_zones
  rds_dbname                        = var.rds_dbname
  rds_username                      = var.rds_username
  rds_password                      = var.rds_password
  project_name                      = var.project_name
  rds_name                          = var.rds_name
  vpc_id                            = module.vpc.vpc_id
  private_subnet_ids                = module.vpc.private_subnets
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


