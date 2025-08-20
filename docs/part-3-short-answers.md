**Scaling:**
To handle 100k+ concurrent users, I’d design the backend with a microservices architecture running on AWS ECS or EKS, fronted by an Application Load Balancer and API Gateway. I’d use RDS with read replicas or Aurora for horizontal scaling, Redis/ElastiCache for caching, and SQS/Kinesis for asynchronous workloads. Auto-scaling groups and CloudWatch metrics would ensure elasticity under peak load.

**CI/CD:**
For React Native + AWS, I’d use GitHub Actions or AWS CodePipeline to trigger builds on pull requests and merges. Fastlane would manage mobile builds, signing, and store uploads, while AWS Amplify or S3/CloudFront could host backend-driven assets. Each pipeline stage would include automated tests, linting, and staging deploys before promoting to production.

**Team workflow:**
I’d enforce code reviews, feature branching, and automated test coverage to maintain quality while iterating quickly. Short sprints with clear priorities and a well-groomed backlog ensure developers focus on impactful features. Regular CI checks and staging environments allow fast feedback loops without slowing down delivery.

