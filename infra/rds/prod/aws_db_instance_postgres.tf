resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "16.2"
  instance_class       = var.database_instance_class
  identifier           = "postgres"
  db_name              = var.database_name
  username             = var.database_username
  password             = var.database_password
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds_public_sg.id]
  skip_final_snapshot    = true

  tags = {
    "Name" : "${var.project}"
    "Project" : "${var.project}"
  }
}
