resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app_task.arn
  desired_count   = 1
  launch_type     = "EC2"
}
load_balancer {
  target_group_arn = aws_lb_target_group.app_tg.arn
  container_name   = "task-app"
  container_port   = 3000
}