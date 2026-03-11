resource "aws_lb" "app_lb" {
  name               = "ecs-task-alb"
  load_balancer_type = "application"
  subnets            = var.public_subnets
  security_groups    = [aws_security_group.alb_sg.id]

  enable_deletion_protection = false
}