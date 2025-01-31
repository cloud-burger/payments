resource "aws_security_group" "rds_public_sg" {
  name        = var.project
  description = "Allow postgres inbound traffic"
  vpc_id      = local.aws_vpc_id

  # Permitir tráfego de entrada apenas nas portas necessárias
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
