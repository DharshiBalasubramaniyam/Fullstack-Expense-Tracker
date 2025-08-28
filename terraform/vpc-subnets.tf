# For web tier
resource "aws_subnet" "mywallet_web_subnet_1a" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.1.0/24"
	availability_zone = "us-east-1a"
	map_public_ip_on_launch = true

	tags = {
		Name = "mywallet_web_subnet_1a",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}

resource "aws_subnet" "mywallet_web_subnet_1b" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.2.0/24"
	availability_zone = "us-east-1b"
	map_public_ip_on_launch = true

	tags = {
		Name = "mywallet_web_subnet_1b",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}

# For logic tier
resource "aws_subnet" "mywallet_logic_subnet_1a" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.3.0/24"
	availability_zone = "us-east-1a"

	tags = {
		Name = "mywallet_logic_subnet_1a",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}

resource "aws_subnet" "mywallet_logic_subnet_1b" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.4.0/24"
	availability_zone = "us-east-1b"

	tags = {
		Name = "mywallet_logic_subnet_1b",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}

# For data tier
resource "aws_subnet" "mywallet_data_subnet_1a" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.5.0/24"
	availability_zone = "us-east-1a"

	tags = {
		Name = "mywallet_data_subnet_1a",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}

resource "aws_subnet" "mywallet_data_subnet_1b" {
	vpc_id     = aws_vpc.mywallet_vpc.id
	cidr_block = "10.0.6.0/24"
	availability_zone = "us-east-1b"

	tags = {
		Name = "mywallet_data_subnet_1b",
	}

	depends_on = [
		aws_vpc.mywallet_vpc
	]
}