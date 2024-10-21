data "aws_availability_zones" "available" {}

resource "aws_vpc" "cicd_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = tomap({
    "Name"                                      = "terraform-eks-cicd-node",
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  })
}

resource "aws_subnet" "cicd_subnet" {
  count = 2

  availability_zone       = data.aws_availability_zones.available.names[count.index]
  cidr_block              = "10.0.${count.index}.0/24"
  vpc_id                  = aws_vpc.cicd_vpc.id
  map_public_ip_on_launch = true  # Permitir asignación de IP pública

  tags = tomap({
    "Name"                                      = "terraform-eks-cicd-node",
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  })
}

resource "aws_internet_gateway" "cicd_igw" {
  vpc_id = aws_vpc.cicd_vpc.id

  tags = {
    Name = "terraform-eks-cicd"
  }
}

resource "aws_route_table" "cicd_rt" {
  vpc_id = aws_vpc.cicd_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.cicd_igw.id
  }
}

resource "aws_route_table_association" "cicd_rt_association" {
  count = 2

  subnet_id      = aws_subnet.cicd_subnet[count.index].id
  route_table_id = aws_route_table.cicd_rt.id
}
