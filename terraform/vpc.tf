resource "aws_vpc" "mywallet_vpc" {
	cidr_block = var.vpc_cidr

	tags = {
		Name = "mywallet_vpc"
	}
}