variable "environment" {
  default = "prod"
}

variable "project" {
  default = "self-service-payments"
}

variable "database_password" {
  default = "payment"
}

variable "database_instance_class" {
  default = "db.t3.micro"
}

variable "database_name" {
  default = "payment"
}

variable "database_username" {
  default = "payment"
}
