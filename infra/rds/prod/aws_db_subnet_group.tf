resource "aws_db_subnet_group" "main" {
  name       = var.project
  subnet_ids = concat(local.aws_public_subnets, local.aws_private_subnets)
}
