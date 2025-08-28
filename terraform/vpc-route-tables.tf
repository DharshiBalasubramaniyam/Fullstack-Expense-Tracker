resource "aws_route_table" "mywallet_public_rt" {
    vpc_id = aws_vpc.mywallet_vpc.id

    route {
        cidr_block = var.vpc_cidr
        gateway_id = "local"
    }

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.mywallet_igw.id
    }

    tags = {
        Name = "mywallet_public_rt"
    }
}

resource "aws_route_table" "mywallet_private_rt" {
    vpc_id = aws_vpc.mywallet_vpc.id

    route {
        cidr_block = var.vpc_cidr
        gateway_id = "local"
    }

    route {
        cidr_block = "0.0.0.0/0"
        nat_gateway_id = aws_nat_gateway.mywallet_nat_gateway.id
    }

    tags = {
        Name = "mywallet_private_rt"
    }
}

resource "aws_route_table_association" "mywallet_web_subnet_1a_rt" {
  subnet_id      = aws_subnet.mywallet_web_subnet_1a.id
  route_table_id = aws_route_table.mywallet_public_rt.id

  depends_on = [
    aws_subnet.mywallet_web_subnet_1a,
    aws_route_table.mywallet_public_rt
  ]
}

resource "aws_route_table_association" "mywallet_web_subnet_1b_rt" {
  subnet_id      = aws_subnet.mywallet_web_subnet_1b.id
  route_table_id = aws_route_table.mywallet_public_rt.id

  depends_on = [
    aws_subnet.mywallet_web_subnet_1b,
    aws_route_table.mywallet_public_rt
  ]
}

resource "aws_route_table_association" "mywallet_logic_subnet_1a_rt" {
  subnet_id      = aws_subnet.mywallet_logic_subnet_1a.id
  route_table_id = aws_route_table.mywallet_private_rt.id

  depends_on = [
    aws_subnet.mywallet_logic_subnet_1a,
    aws_route_table.mywallet_private_rt
  ]
}

resource "aws_route_table_association" "mywallet_logic_subnet_1b_rt" {
  subnet_id      = aws_subnet.mywallet_logic_subnet_1b.id
  route_table_id = aws_route_table.mywallet_private_rt.id

  depends_on = [
    aws_subnet.mywallet_logic_subnet_1b,
    aws_route_table.mywallet_private_rt
  ]
}

resource "aws_route_table_association" "mywallet_data_subnet_1a_rt" {
  subnet_id      = aws_subnet.mywallet_data_subnet_1a.id
  route_table_id = aws_route_table.mywallet_private_rt.id

  depends_on = [
    aws_subnet.mywallet_data_subnet_1a,
    aws_route_table.mywallet_private_rt
  ]
}

resource "aws_route_table_association" "mywallet_data_subnet_1b_rt" {
  subnet_id      = aws_subnet.mywallet_data_subnet_1b.id
  route_table_id = aws_route_table.mywallet_private_rt.id

  depends_on = [
    aws_subnet.mywallet_data_subnet_1b,
    aws_route_table.mywallet_private_rt
  ]
}