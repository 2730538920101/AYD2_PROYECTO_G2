resource "aws_ecr_repository" "app_service" {
  name = "${var.ecs_cluster_name}-app-service"
}

resource "aws_ecr_repository" "auth_service" {
  name = "${var.ecs_cluster_name}-auth-service"
}

resource "aws_ecr_repository" "notification_producer" {
  name = "${var.ecs_cluster_name}-notification-producer"
}

resource "aws_ecr_repository" "notification_consumer" {
  name = "${var.ecs_cluster_name}-notification-consumer"
}

resource "aws_ecr_repository" "frontend" {
  name = "${var.ecs_cluster_name}-frontend"
}
