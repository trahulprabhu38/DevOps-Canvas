export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  mediumUrl?: string;
  imageUrl: string;
  detailedDescription: string;
  features: string[];
  techStack: string[];
  challenges: string[];
  outcomes: string[];
  readmeContent?: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Kubernetes Microservices Platform',
    description: 'A scalable microservices architecture deployed on Kubernetes with automated CI/CD pipelines using Jenkins and ArgoCD.',
    tags: ['Kubernetes', 'Docker', 'Jenkins', 'ArgoCD', 'Microservices'],
    githubUrl: 'https://github.com/johndoe/k8s-microservices',
    demoUrl: 'https://demo.k8s-platform.com',
    mediumUrl: 'https://medium.com/@johndoe/kubernetes-microservices-guide',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    detailedDescription: 'A comprehensive microservices platform built with modern DevOps practices. This project demonstrates enterprise-level architecture patterns and automation.',
    features: [
      'Auto-scaling microservices with HPA',
      'Blue-green deployment strategies',
      'Centralized logging with ELK stack',
      'Prometheus monitoring and Grafana dashboards',
      'Service mesh with Istio'
    ],
    techStack: ['Kubernetes', 'Docker', 'Jenkins', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Istio'],
    challenges: [
      'Implementing zero-downtime deployments',
      'Managing inter-service communication',
      'Setting up comprehensive monitoring'
    ],
    outcomes: [
      '99.9% uptime achieved',
      '50% reduction in deployment time',
      'Improved developer productivity'
    ]
  },
  {
    id: '2',
    name: 'AWS Infrastructure as Code',
    description: 'Terraform-based infrastructure automation for multi-environment AWS deployments with cost optimization and security best practices.',
    tags: ['AWS', 'Terraform', 'CloudFormation', 'Lambda', 'Infrastructure'],
    githubUrl: 'https://github.com/johndoe/aws-terraform-iac',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    detailedDescription: 'A complete Infrastructure as Code solution for AWS using Terraform, implementing security and cost optimization best practices.',
    features: [
      'Multi-environment deployments (dev, staging, prod)',
      'Automated security group management',
      'Cost optimization with spot instances',
      'Automated backup strategies',
      'VPC and networking setup'
    ],
    techStack: ['Terraform', 'AWS', 'CloudFormation', 'Lambda', 'CloudWatch', 'S3', 'EC2'],
    challenges: [
      'Managing state files securely',
      'Implementing least privilege access',
      'Cost optimization without sacrificing performance'
    ],
    outcomes: [
      '40% reduction in infrastructure costs',
      'Consistent environment deployments',
      'Improved security posture'
    ]
  },
  {
    id: '3',
    name: 'Automated Testing Pipeline',
    description: 'Comprehensive testing automation with unit, integration, and end-to-end tests integrated into CI/CD pipeline.',
    tags: ['Testing', 'Selenium', 'Jest', 'Cypress', 'GitHub Actions'],
    githubUrl: 'https://github.com/johndoe/testing-pipeline',
    demoUrl: 'https://testing-dashboard.com',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    detailedDescription: 'A robust testing automation framework that ensures code quality and reliability across the entire development lifecycle.',
    features: [
      'Parallel test execution',
      'Visual regression testing',
      'Performance testing integration',
      'Test reporting and analytics',
      'Automated test data management'
    ],
    techStack: ['Jest', 'Cypress', 'Selenium', 'GitHub Actions', 'Docker', 'Allure Reports'],
    challenges: [
      'Reducing test execution time',
      'Managing test data across environments',
      'Implementing reliable E2E tests'
    ],
    outcomes: [
      '85% test coverage achieved',
      '60% reduction in manual testing',
      'Faster bug detection and resolution'
    ]
  },
  {
    id: '4',
    name: 'Monitoring & Observability Stack',
    description: 'Complete observability solution with metrics, logs, and traces using Prometheus, Grafana, and Jaeger.',
    tags: ['Monitoring', 'Prometheus', 'Grafana', 'Jaeger', 'Observability'],
    githubUrl: 'https://github.com/johndoe/observability-stack',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    detailedDescription: 'A comprehensive monitoring and observability platform providing full visibility into application performance and infrastructure health.',
    features: [
      'Real-time metrics collection',
      'Distributed tracing',
      'Log aggregation and analysis',
      'Custom alerting rules',
      'Performance dashboards'
    ],
    techStack: ['Prometheus', 'Grafana', 'Jaeger', 'ElasticSearch', 'Logstash', 'Kibana'],
    challenges: [
      'Handling high-volume metrics ingestion',
      'Correlating logs, metrics, and traces',
      'Setting up meaningful alerts'
    ],
    outcomes: [
      'Proactive issue detection',
      'Improved system reliability',
      'Better understanding of system behavior'
    ]
  }
];
