provider "aws" {
  region = "us-east-1"
}

# Grupo de seguridad para permitir tráfico web (80) y SSH (22)
resource "aws_security_group" "web_sg" {
  name        = "ayd2_web_sg"
  description = "Permitir trafico HTTP y SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Máquina virtual EC2 (Capa gratuita)
resource "aws_instance" "app_server" {
  ami             = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type   = "t3.micro"
  key_name        = aws_key_pair.deploy_key.key_name
  security_groups = [aws_security_group.web_sg.name]

  tags = {
    Name = "Servidor-Microservicios-AYD2"
  }
}
# IP Pública Estática asignada a la EC2
resource "aws_eip" "ip_estatica" {
  instance = aws_instance.app_server.id
}

# Base de datos gestionada PostgreSQL para el catálogo de libros
resource "aws_db_instance" "libros_db" {
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  username             = "admin_libros"
  password             = "Ayd2_2026_secreta"
  skip_final_snapshot  = true
  publicly_accessible  = true
}

resource "aws_key_pair" "deploy_key" {
  key_name   = "ayd2_key"
  public_key = file("ayd2_key.pub")
}

output "ip_publica" {
  value = aws_eip.ip_estatica.public_ip
}