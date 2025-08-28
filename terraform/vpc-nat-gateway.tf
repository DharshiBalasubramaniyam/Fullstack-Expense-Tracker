resource "aws_eip" "mywallet_nat_gateway_eip" {
    domain = "vpc"
    tags = {
        Name = "mywallet_nat_gateway_eip"
    }
}

resource "aws_nat_gateway" "mywallet_nat_gateway" {
    allocation_id = aws_eip.mywallet_nat_gateway_eip.id
    subnet_id = aws_subnet.mywallet_web_subnet_1a.id 

    tags = {
        Name = "mywallet_nat_gateway"
    }

    depends_on = [
        aws_eip.mywallet_nat_gateway_eip
    ]
}