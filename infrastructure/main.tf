module "vpc_dev" {
  source                  = "./modules/vpc"
  environment             = "development"
  vpc_cidr                = var.vpc_cidr
  public_subnet_cidrs     = var.public_subnet_cidrs
  private_subnet_cidrs    = var.private_subnet_cidrs
  availability_zones      = var.availability_zones
  project_name            = var.project_name
  count                   = var.environment == "development" ? 1 : 0
}

module "vpc_prod" {
  source                  = "./modules/vpc"
  environment             = "production"
  vpc_cidr                = var.vpc_cidr
  public_subnet_cidrs     = var.public_subnet_cidrs
  private_subnet_cidrs    = var.private_subnet_cidrs
  availability_zones      = var.availability_zones
  project_name            = var.project_name
  count                   = var.environment == "production" ? 1 : 0
}

module "ec2_prod" {
  source                                            = "./modules/ec2"
  environment                                       = "production"
  depends_on                                        = [module.vpc_prod, module.cognito_prod, module.s3_prod, module.sqs_prod, module.rds_prod]
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
  public_subnet_ids                                 = module.vpc_prod[0].public_subnets
  rds_endpoint                                      = module.rds_prod[0].rds_endpoint
  vpc_id                                            = module.vpc_prod[0].vpc_id
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
  bucket_name                                       = module.s3_prod[0].s3_bucket_name    # Asignando el nombre del bucket de S3
  cognito_user_pool_id                              = module.cognito_prod[0].user_pool_id
  cognito_user_pool_client_id                       = module.cognito_prod[0].user_pool_client_id
  cognito_identity_pool_id                          = module.cognito_prod[0].identity_pool_id
  sqs_queue_url                                     = module.sqs_prod[0].standard_queue_url     # Asignando la URL de la cola SQS
  # next_public_app_service                           = var.next_public_app_service
  # next_public_notification_producer_service         = var.next_public_notification_producer_service
  # next_public_notification_consumer_service         = var.next_public_notification_consumer_service
  count                                             = var.environment == "production" ? 1 : 0
}

module "rds_prod" {
  source                            = "./modules/rds"
  environment                       = "production"
  depends_on                        = [module.vpc_prod, module.s3_prod, module.sqs_prod] 
  public_subnet_cidr_blocks         = module.vpc_prod[0].public_subnets_cidrs
  private_subnet_availability_zones = module.vpc_prod[0].private_subnet_availability_zones
  rds_dbname                        = var.rds_dbname
  rds_username                      = var.rds_username
  rds_password                      = var.rds_password
  project_name                      = var.project_name
  rds_name                          = var.rds_name
  vpc_id                            = module.vpc_prod[0].vpc_id
  private_subnet_ids                = module.vpc_prod[0].private_subnets
  count                             = var.environment == "production" ? 1 : 0
}

module "s3_dev" {
  source                      = "./modules/s3"
  environment                 = "development"
  bucket_name                 = var.bucket_name
  project_name                = var.project_name
  count                       = var.environment == "development" ? 1 : 0
}

module "s3_prod" {
  source                      = "./modules/s3"
  environment                 = "production"
  bucket_name                 = var.bucket_name
  project_name                = var.project_name
  count                       = var.environment == "production" ? 1 : 0
}

module "sqs_dev" {
  source                      = "./modules/sqs"
  environment                 = "development"
  project_name                = var.project_name
  queue_name                  = var.queue_name
  count                       = var.environment == "development" ? 1 : 0
}

module "sqs_prod" {
  source                      = "./modules/sqs"
  environment                 = "production"
  project_name                = var.project_name
  queue_name                  = var.queue_name
  count                       = var.environment == "production" ? 1 : 0
}

module "cognito_dev" {
  source                      = "./modules/cognito"
  environment                 = "development"
  project_name                = var.project_name
  user_pool_name              = var.user_pool_name
  AWS_REGION                  = var.AWS_REGION
  count                       = var.environment == "development" ? 1 : 0
}

module "cognito_prod" {
  source                      = "./modules/cognito"
  environment                 = "production"
  project_name                = var.project_name
  user_pool_name              = var.user_pool_name
  AWS_REGION                  = var.AWS_REGION
  count                       = var.environment == "production" ? 1 : 0
}

