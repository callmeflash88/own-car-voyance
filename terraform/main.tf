locals {
  env    = terraform.workspace
  name   = "${var.REPO_NAME}" 
  tags   = { Env = terraform.workspace , Terraform = true }
  domain = "${var.DOMAIN}"
}

module "fe" {
  source = "./modules/s3/"
  name   = "${local.name}-website-frontend"
}

module "acm-cert-cf" {
  source = "./modules/cert/"
  # providers = {
  #   aws = aws.us-east-2
  # }
  domain = local.domain
  tags   = local.tags
}

module "cloudfront" {
  source        = "./modules/cloudfront/"
  cert_arn      = module.acm-cert-cf.cert_id
  s3_bucket_url = module.fe.bucket_endpoint
  aliases       = ["app-api.${local.domain}", "${local.domain}"]
  tags          = local.tags
}


# module "fe-redirect" {
#   source = "./modules/s3/"
#   name   = "${local.name}-fe-redirect"
# }


# module "acm-cert" {
#   source = "./modules/cert/"
#   domain = local.domain
#   tags   = local.tags
# }


# module "cloudfront-redirect" {
#   source        = "./modules/cloudfront/"
#   cert_arn      = module.acm-cert-cf.cert_id
#   s3_bucket_url = module.fe-redirect.bucket_endpoint
#   aliases       = ["www.${local.domain}"]
#   tags          = local.tags
# }
