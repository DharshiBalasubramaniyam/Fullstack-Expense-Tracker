resource "aws_internet_gateway" "mywallet_igw" {
  vpc_id = aws_vpc.mywallet_vpc.id

  tags = {
    Name = "mywallet_igw"
  }
}