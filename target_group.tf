resource "aws_lb_target_group" "app_tg" {
  name     = "ecs-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  target_type = "instance"

  health_check {
    path = "/"
    port = "3000"
  }
}