provider "aws" {
  region = "us-east-1"
}

data "terraform_remote_state" "eks_state" {
  backend = "s3"

  config = {
    bucket = "cloud-burger-states"
    key    = "prod/eks.tfstate"
    region = "us-east-1"
  }
}

locals {
  aws_vpc_id          = data.terraform_remote_state.eks_state.outputs.vpc_id
  aws_public_subnets  = data.terraform_remote_state.eks_state.outputs.public_subnets
  aws_private_subnets = data.terraform_remote_state.eks_state.outputs.private_subnets
}

terraform {
  backend "s3" {
    bucket = "cloud-burger-states"
    key    = "prod/payments/infra/rds/terraform.tfstate"
    region = "us-east-1"
  }
}
