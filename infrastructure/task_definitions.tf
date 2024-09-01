resource "aws_ecs_task_definition" "app_service" {
  family                   = "app_service"
  container_definitions    = <<DEFINITION
[
  {
    "name": "app_service",
    "image": "${aws_ecr_repository.app_service.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "containerPort": ${var.app_port},
        "hostPort": ${var.app_port}
      }
    ],
    "environment": [
      {
        "name": "APP_PORT",
        "value": "${var.app_port}"
      },
      {
        "name": "APP_HOST",
        "value": "${var.app_host}"
      },
      {
        "name": "SECRET_KEY",
        "value": "${var.secret_key}"
      }
    ]
  }
]
DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"
  memory                   = "512"
  cpu                      = "256"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
}


resource "aws_ecs_task_definition" "auth_service" {
  family                   = "auth_service"
  container_definitions    = <<DEFINITION
[
  {
    "name": "auth_service",
    "image": "${aws_ecr_repository.auth_service.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "containerPort": ${var.auth_service_port},
        "hostPort": ${var.auth_service_port}
      }
    ],
    "environment": [
      {
        "name": "REGION",
        "value": "${var.AWS_REGION}"
      },
      {
        "name": "COGNITO_USER_POOL_ID",
        "value": "${aws_cognito_user_pool.user_pool.id}"
      },
      {
        "name": "COGNITO_CLIENT_ID",
        "value": "${aws_cognito_user_pool_client.user_pool_client.id}"
      },
      {
        "name": "AUTH_SERVICE_PORT",
        "value": "${var.auth_service_port}"
      }
    ]
  }
]
DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"
  memory                   = "512"
  cpu                      = "256"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
}

resource "aws_ecs_task_definition" "notification_producer" {
  family                   = "notification_producer"
  container_definitions    = <<DEFINITION
[
  {
    "name": "notification_producer",
    "image": "${aws_ecr_repository.notification_producer.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "containerPort": ${var.producer_port},
        "hostPort": ${var.producer_port}
      }
    ],
    "environment": [
      {
        "name": "SQS_QUEUE_URL",
        "value": "${var.sqs_queue_url}"
      },
      {
        "name": "PRODUCER_PORT",
        "value": "${var.producer_port}"
      }
    ]
  }
]
DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"
  memory                   = "512"
  cpu                      = "256"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
}


resource "aws_ecs_task_definition" "notification_consumer" {
  family                   = "notification_consumer"
  container_definitions    = <<DEFINITION
[
  {
    "name": "notification_consumer",
    "image": "${aws_ecr_repository.notification_consumer.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "containerPort": ${var.consumer_port},
        "hostPort": ${var.consumer_port}
      }
    ],
    "environment": [
      {
        "name": "SQS_QUEUE_URL",
        "value": "${var.sqs_queue_url}"
      },
      {
        "name": "CONSUMER_PORT",
        "value": "${var.consumer_port}"
      },
      {
        "name": "DB_HOST",
        "value": "${var.db_host}"
      },
      {
        "name": "DB_USER",
        "value": "${var.db_user}"
      },
      {
        "name": "DB_PASSWORD",
        "value": "${var.db_password}"
      },
      {
        "name": "DB_DATABASE",
        "value": "${var.db_database}"
      }
    ]
  }
]
DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"
  memory                   = "512"
  cpu                      = "256"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
}


resource "aws_ecs_task_definition" "frontend" {
  family                   = "frontend"
  container_definitions    = <<DEFINITION
[
  {
    "name": "frontend",
    "image": "${aws_ecr_repository.frontend.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "containerPort": ${var.frontend_port},
        "hostPort": ${var.frontend_port}
      }
    ],
    "environment": [
      {
        "name": "NEXT_PUBLIC_APP_SERVICE",
        "value": "${var.next_public_app_service}"
      },
      {
        "name": "NEXT_PUBLIC_AUTH_SERVICE",
        "value": "${var.next_public_auth_service}"
      },
      {
        "name": "NEXT_PUBLIC_NOTIFICATION_PRODUCER_SERVICE",
        "value": "${var.next_public_notification_producer_service}"
      },
      {
        "name": "NEXT_PUBLIC_NOTIFICATION_CONSUMER_SERVICE",
        "value": "${var.next_public_notification_consumer_service}"
      },
      {
        "name": "NEXT_PUBLIC_APP_VERSION",
        "value": "${var.next_public_app_version}"
      }
    ]
  }
]
DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge"
  memory                   = "512"
  cpu                      = "256"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
}
