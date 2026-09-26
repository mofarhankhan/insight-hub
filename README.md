InsightHub --- Business Intelligence Dashboard

A full-stack Business Intelligence Dashboard engineered as a
DevSecOps, Kubernetes and GitOps project.

InsightHub is a production-style analytics and operations dashboard
built with React, Node.js, Express and MySQL, then extended with a
complete CI/CD + DevSecOps + Kubernetes + GitOps + Monitoring
workflow.

The application is delivered through Jenkins, analyzed with SonarQube,
security-scanned with Trivy, containerized with Docker, published to
Docker Hub, deployed to Kubernetes through ArgoCD, and monitored with
Prometheus and Grafana.

📌 Project at a Glance

Area                         Implementation

Application                  React + Vite frontend, Node.js + Express backend
Database                     MySQL 8
Authentication               JWT + bcrypt
Containerization             Docker + Docker Compose
CI                           Jenkins
Code Quality                 SonarQube + Quality Gate
Security                     Trivy filesystem/image scanning
Registry                     Docker Hub
Orchestration                Kubernetes
CD / GitOps                  ArgoCD
Image Automation             ArgoCD Image Updater
Monitoring                   Prometheus + Grafana
Metrics                      Prometheus-compatible /api/metrics endpoint
K8s Monitoring Integration   ServiceMonitor
Manifest Validation          kubeconform
Cloud                        AWS EC2
Source Control               GitHub

🖼️ Architecture

Complete DevSecOps + GitOps Architecture

Add your final architecture image here:
docs/images/architecture.png



The architecture should show the actual project flow:

Developer → GitHub → Jenkins CI → SonarQube / Security Scans → Docker
Build → Docker Hub → ArgoCD Image Updater → ArgoCD → Kubernetes →
InsightHub → Prometheus → Grafana

The AWS environment consists of two EC2 instances used for the
DevOps tooling and Kubernetes/application environment, with AWS Security
Groups controlling network access.

1. What is InsightHub?

InsightHub is a modern Business Intelligence and Operations
Dashboard for a fictional organization.

The application provides a centralized interface to:

Monitor business KPIs

Analyze revenue and customer growth

Browse customers

Inspect transactions

View offering/service performance

Review activity/events

Manage dashboard settings

Authenticate users securely

The UI is dashboard-oriented and includes:

Sidebar navigation

KPI cards

Charts

Tables

Filters

Responsive layout

Dark/light mode

Profile menu

Notification area

The project is intentionally more than a CRUD application: the
application is used as the workload for demonstrating a complete
DevSecOps delivery lifecycle.

2. Why This Project?

The main objective was to build an application and then implement a
realistic engineering workflow around it.

The project demonstrates how code moves from:

Developer
   ↓
GitHub
   ↓
Jenkins CI
   ↓
Code Quality + Security Validation
   ↓
Docker Image
   ↓
Docker Hub
   ↓
ArgoCD Image Updater
   ↓
ArgoCD
   ↓
Kubernetes
   ↓
Prometheus
   ↓
Grafana

This separates responsibilities clearly:

Jenkins handles Continuous Integration.

SonarQube checks code quality.

Trivy checks filesystem and container-image security.

Docker packages the application.

Docker Hub stores release images.

ArgoCD handles GitOps-based deployment.

ArgoCD Image Updater detects new container images and updates
the live application specification.

Kubernetes runs the application.

Prometheus collects metrics.

Grafana visualizes operational data.

3. Application Features

Authentication

Login screen

JWT authentication

Password hashing with bcrypt

Protected API routes

Protected React routes

Demo account seeded automatically

Dashboard

Total revenue

Total customers

Active subscriptions

Conversion rate

Revenue chart

Customer growth chart

Channel distribution

Recent transactions

Recent activity

Analytics

Revenue trends

Customer growth

Acquisition channels

Top-performing offerings

Summary statistics

Customers

Customer search

Status filtering

Customer table

Customer profile details

Customer lifetime value

Transactions

Search

Status filtering

Amount

Customer

Date

Payment method

Offerings

Performance table

Revenue

Units

Growth

Status

Activity

System/business events

Event types

Timestamps

User attribution

Settings

Profile information

Notification preferences

Appearance preference

Security section

4. Technology Stack

Frontend

React

Vite

React Router

Axios

Recharts

Lucide React

Backend

Node.js

Express

MySQL2

JSON Web Token

bcryptjs

CORS

dotenv

@prometheus-io/client

DevOps / DevSecOps

Git

GitHub

Jenkins

SonarQube

Trivy

Docker

Docker Compose

Docker Hub

Kubernetes

Kustomize

kubeconform

ArgoCD

ArgoCD Image Updater

Prometheus

Grafana

Cloud

AWS EC2

AWS Security Groups

5. Infrastructure

The project uses two AWS EC2 instances.

EC2 Instance 1 --- CI / Code Quality

Hosts the DevOps tooling used by the CI workflow:

Jenkins

SonarQube

Trivy

Jenkins is responsible for executing the CI pipeline.

SonarQube performs static code-quality analysis and the pipeline waits
for the configured Quality Gate.

EC2 Instance 2 --- Kubernetes / Application Platform

Hosts the Kubernetes environment used to run InsightHub and the
GitOps/observability components.

The Kubernetes environment contains the InsightHub workloads:

Frontend

Backend

MySQL

The environment also integrates with:

ArgoCD

ArgoCD Image Updater

Prometheus

Grafana

AWS Security

AWS Security Groups control access to the EC2 environments.

Only the ports required by the environment should be exposed publicly.

Do not document real public IP addresses, private IP addresses,
credentials, tokens, or passwords in this repository.

6. CI/CD Pipeline

The Jenkins pipeline is designed to validate the application before
publishing container images.

Jenkins Pipeline Stages

1. Checkout

Jenkins checks out the application source code from GitHub.

2. Install Dependencies

Backend and frontend dependencies are installed.

The backend and frontend dependency installation runs in parallel.

3. Filesystem Security Scan

Trivy scans the project filesystem for vulnerabilities and security
issues.

4. SonarQube Code Analysis

SonarQube analyzes:

server/src
client/src

Excluded content includes generated dependencies and build directories.

5. SonarQube Quality Gate

The Jenkins pipeline waits for the SonarQube Quality Gate result.

A failed Quality Gate prevents the pipeline from continuing.

6. Docker Image Build

Backend and frontend Docker images are built.

The backend and frontend builds run in parallel.

7. Docker Image Security Scan

Trivy scans the built Docker images.

8. Kubernetes Manifest Validation

Kubernetes manifests are rendered using Kustomize and validated with
kubeconform.

The project validates both standard Kubernetes resources and the
configured monitoring CRD resources.

9. Docker Registry Push

Validated images are pushed to Docker Hub.

7. Continuous Delivery with ArgoCD

ArgoCD is used for GitOps-based application delivery.

The ArgoCD application tracks:

GitHub Repository
      ↓
k8s/
      ↓
Kustomize
      ↓
Kubernetes

ArgoCD continuously maintains the desired Kubernetes application state
defined by the Git repository.

The application is configured for automated synchronization.

8. ArgoCD Image Updater

The project uses ArgoCD Image Updater to automate container-image
updates.

The flow is:

Jenkins
   ↓
Build Docker Images
   ↓
Push Images to Docker Hub
   ↓
ArgoCD Image Updater
   ↓
Detect New Image Tag
   ↓
Update ArgoCD Application
   ↓
ArgoCD
   ↓
Kubernetes Rollout

The project uses the newest-build update strategy because Jenkins
image tags are based on Jenkins build numbers.

For example:

backend:28
frontend:28
        ↓
backend:30
frontend:30

The verified live Kubernetes deployment reached:

mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30

This confirms that the automated image-update and deployment path is
working.

The Image Updater configuration uses ArgoCD write-back. This updates
the ArgoCD application specification; it should not be described as
Jenkins pushing deployment changes back to GitHub.

9. Kubernetes

InsightHub is deployed in the:

insight-hub

namespace.

The main workloads are:

Frontend
Backend
MySQL

Kubernetes Resources

The repository contains:

Namespace

ConfigMap

Secret

Ingress

Frontend Deployment

Frontend Service

Backend Deployment

Backend Service

MySQL Deployment

MySQL Service

MySQL PersistentVolumeClaim

ServiceMonitor

ArgoCD Image Updater configuration

Kustomization

10. Kustomize

Kustomize is used to organize and render Kubernetes resources.

The main entry point is:

k8s/kustomization.yaml

Kustomize also manages the application image references used by the
deployment manifests.

Before deployment, the complete manifest set can be rendered with:

kubectl kustomize k8s/

11. Kubernetes Manifest Validation

The project uses kubeconform in Jenkins.

The rendered Kustomize output is validated against Kubernetes schemas
and the required CRD schemas.

The validation stage prevents malformed Kubernetes resources from moving
further through the pipeline.

A successful validation produced:

12 resources found
Valid: 12
Invalid: 0
Errors: 0
Skipped: 0

12. Monitoring & Observability

Monitoring is implemented using:

Prometheus

Grafana

Kubernetes ServiceMonitor

Backend Prometheus metrics

Backend Metrics

The backend exposes:

/api/metrics

The endpoint is generated using:

@prometheus-io/client

Default Node.js/process metrics are collected.

ServiceMonitor

The Kubernetes backend Service is labeled for monitoring.

The ServiceMonitor:

k8s/monitoring/backend-servicemonitor.yaml

scrapes:

/api/metrics

from the backend service.

The configured scrape interval is:

5s

Monitoring Flow

InsightHub Backend
       ↓
/api/metrics
       ↓
Kubernetes Service
       ↓
ServiceMonitor
       ↓
Prometheus
       ↓
Grafana

13. Prometheus Configuration

The Prometheus instance is configured to discover ServiceMonitors across
namespaces.

The monitoring setup uses the release=monitoring label to select the
ServiceMonitor.

The backend ServiceMonitor is deployed with the project resources and is
discovered by Prometheus.

14. Grafana

Grafana is used to visualize the collected monitoring data.

Recommended screenshots for this section:

docs/images/grafana-dashboard.png
docs/images/prometheus-targets.png

Add screenshots showing:

Prometheus target discovery

InsightHub backend metrics

Kubernetes/pod metrics

Grafana dashboard panels

15. Security

Security is integrated into the CI workflow rather than treated as a
separate final step.

SonarQube

Used for:

Static code analysis

Code-quality inspection

Quality Gate enforcement

Trivy Filesystem Scan

Scans the repository filesystem before image creation.

Trivy Image Scan

Scans the built Docker images before registry publication.

Kubernetes Validation

Kubeconform validates Kubernetes manifests before deployment.

Secrets

Sensitive values must not be committed to GitHub.

Examples:

.env
passwords
JWT secrets
Docker Hub credentials
Jenkins credentials
SonarQube tokens
Gmail App Passwords
AWS credentials

The repository should contain only example configuration such as:

.env.example

16. Jenkins Notifications

Jenkins is configured to send pipeline email notifications.

Notifications are used for:

Successful builds

Failed builds

This provides visibility into CI pipeline status without requiring the
team to continuously monitor Jenkins.

17. GitHub Webhook

GitHub is connected to Jenkins through a webhook.

The flow is:

git push
   ↓
GitHub
   ↓
Webhook
   ↓
Jenkins
   ↓
Pipeline

The Jenkins pipeline is configured so that a GitHub push triggers the CI
job.

The previous recursive Jenkins → GitHub → Jenkins loop was removed by
eliminating the Jenkins stages that committed and pushed generated
image-tag changes back into the repository.

The current deployment automation uses ArgoCD Image Updater instead.

18. Docker

The project provides separate Docker images for:

Frontend
Backend

Dockerfiles are located at:

client/Dockerfile
server/Dockerfile

The project also contains:

docker-compose.yml

for containerized local/application environments.

19. Docker Images

The images are published to Docker Hub.

Repository namespace:

mofarhankhann

Images:

mofarhankhann/insight-hub-backend
mofarhankhann/insight-hub-frontend

Image tags are generated from Jenkins build numbers.

Example:

:30

20. Application Health

The backend exposes:

GET /api/health

A healthy application returns a response similar to:

{
  "status": "ok",
  "database": "connected"
}

This endpoint verifies both:

API availability

Database connectivity

21. Demo Login

For local/demo usage:

Email:    admin@insighthub.local
Password: Admin@123

This is demo application data only. Never reuse this credential for
production systems.

22. Local Development

Requirements

Install:

Node.js 18+

npm 9+

MySQL 8+

Verify:

node -v
npm -v
mysql --version

23. Database Setup

Open MySQL:

mysql -u root -p

Create the database:

CREATE DATABASE insighthub;
EXIT;

The backend initializes the application tables and demo data during
startup.

24. Backend Setup

cd server
npm install

Create the environment file:

cp .env.example .env

Configure:

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=insighthub
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173

Start the development server:

npm run dev

Backend:

http://localhost:5000

Health check:

http://localhost:5000/api/health

25. Frontend Setup

Open another terminal:

cd client
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api

Start:

npm run dev

Normally:

http://localhost:5173

26. Production Build

Frontend:

cd client
npm run build

Preview:

npm run preview

Backend:

cd server
npm start

For the DevOps deployment, Docker and Kubernetes are used instead of
relying only on local process execution.

27. Kubernetes Deployment

The Kubernetes manifests are located under:

k8s/

To render the manifests:

kubectl kustomize k8s/

To apply them manually:

kubectl apply -k k8s/

Check the namespace:

kubectl get all -n insight-hub

Check pods:

kubectl get pods -n insight-hub

Check deployments and images:

kubectl get deployment -n insight-hub \
  -o custom-columns='NAME:.metadata.name,IMAGE:.spec.template.spec.containers[*].image'

28. Useful Verification Commands

Kubernetes

kubectl get pods -n insight-hub

kubectl get svc -n insight-hub

kubectl get ingress -n insight-hub

ArgoCD

kubectl get application insight-hub -n argocd

Expected state:

Synced
Healthy

Image Updater

kubectl get imageupdater -n argocd

Prometheus ServiceMonitor

kubectl get servicemonitor -A

Backend Metrics

From the backend pod:

kubectl exec -n insight-hub <backend-pod> -- \
  wget -qO- http://localhost:5000/api/metrics

29. API Overview

Protected endpoints require:

Authorization: Bearer <token>

Authentication

POST /api/auth/login

Dashboard

GET /api/analytics/dashboard

Analytics

GET /api/analytics/overview

Customers

GET /api/customers
GET /api/customers/:id

Transactions

GET /api/transactions

Offerings

GET /api/offerings

Health

GET /api/health

Metrics

GET /api/metrics

30. Database

The application uses MySQL.

Main tables:

users
customers
offerings
transactions
activity_logs

Relationships:

users
  │
  └── activity_logs

customers
  │
  └── transactions

offerings
  │
  └── transactions

31. Seed Data

On first backend startup, the application initializes demo data.

The project includes demo records for:

Admin user

Customers

Offerings

Transactions

Activity records

The initialization logic checks existing data before creating seed
records.

32. Repository Structure

insight-hub/
│
├── README.md
├── Jenkinsfile
├── docker-compose.yml
├── sonar-project.properties
│
├── client/
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
│
├── server/
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── database/
│       ├── middleware/
│       ├── routes/
│       ├── utils/
│       └── index.js
│
├── k8s/
│   ├── backend/
│   ├── frontend/
│   ├── mysql/
│   ├── monitoring/
│   ├── configmap.yml
│   ├── image-updater.yaml
│   ├── ingress.yml
│   ├── namespace.yml
│   ├── secret.yml
│   └── kustomization.yaml
│
└── docs/
    └── images/

33. Screenshots & Project Evidence

The README is intentionally designed to document the actual
implementation.

Create:

docs/images/

Recommended evidence:

Application

docs/images/app-dashboard.png
docs/images/app-login.png
docs/images/app-analytics.png

CI/CD

docs/images/jenkins-pipeline-success.png
docs/images/jenkins-pipeline-stages.png

Code Quality

docs/images/sonarqube-quality-gate.png

Security

docs/images/trivy-filesystem-scan.png
docs/images/trivy-image-scan.png

Container Registry

docs/images/dockerhub-images.png

GitOps

docs/images/argocd-application.png
docs/images/argocd-image-updater.png

Kubernetes

docs/images/kubernetes-pods.png
docs/images/kubernetes-services.png

Monitoring

docs/images/prometheus-targets.png
docs/images/grafana-dashboard.png

Architecture

docs/images/architecture.png

34. Application Screenshots

Dashboard

Add: docs/images/app-dashboard.png



Analytics

Add: docs/images/app-analytics.png



35. CI/CD Evidence

Jenkins Pipeline

Add: docs/images/jenkins-pipeline-success.png



The successful pipeline demonstrates the complete CI sequence:

Checkout
→ Dependencies
→ Filesystem Security
→ SonarQube
→ Quality Gate
→ Docker Build
→ Image Security
→ K8s Validation
→ Docker Push

36. SonarQube Evidence

Add: docs/images/sonarqube-quality-gate.png



The screenshot should clearly show the InsightHub project and its
successful Quality Gate.

37. Security Scan Evidence

Filesystem Scan

Add: docs/images/trivy-filesystem-scan.png



Docker Image Scan

Add: docs/images/trivy-image-scan.png



38. Docker Hub Evidence

Add: docs/images/dockerhub-images.png



Show the published:

insight-hub-backend
insight-hub-frontend

images and their build tags.

39. ArgoCD Evidence

Add: docs/images/argocd-application.png



The application should show:

Synced
Healthy

40. ArgoCD Image Updater Evidence

Add: docs/images/argocd-image-updater.png



This evidence demonstrates automated image detection and
application-spec updates.

41. Kubernetes Evidence

Add: docs/images/kubernetes-pods.png



The screenshot should show the InsightHub workloads running
successfully.

42. Monitoring Evidence

Prometheus

Add: docs/images/prometheus-targets.png



Grafana

Add: docs/images/grafana-dashboard.png



43. DevSecOps Workflow

The final workflow can be summarized as:

                    ┌──────────────┐
                    │   Developer  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    GitHub    │
                    └──────┬───────┘
                           │ Webhook
                           ▼
                    ┌──────────────┐
                    │    Jenkins   │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      SonarQube          Trivy          K8s Validation
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                    Docker Build
                           │
                           ▼
                      Docker Hub
                           │
                           ▼
                ArgoCD Image Updater
                           │
                           ▼
                        ArgoCD
                           │
                           ▼
                      Kubernetes
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
              Frontend           Backend
                                    │
                                    ▼
                                  MySQL
                                    │
                                    ▼
                               Prometheus
                                    │
                                    ▼
                                 Grafana

44. CI vs CD Responsibilities

Tool                   Responsibility

GitHub                 Source control
GitHub Webhook         Pipeline trigger
Jenkins                Continuous Integration
SonarQube              Code quality
Trivy                  Security scanning
Docker                 Containerization
Docker Hub             Image registry
ArgoCD Image Updater   Detect new images
ArgoCD                 GitOps deployment
Kubernetes             Container orchestration
Prometheus             Metrics collection
Grafana                Metrics visualization
AWS EC2                Infrastructure hosting

45. Important Design Decision: Jenkins Does Not Push Deployment Changes Back to GitHub

An earlier implementation used Jenkins to update Kubernetes image tags
and push the generated change back to GitHub.

That approach was removed because it created a potential:

Jenkins
 ↓
GitHub push
 ↓
Jenkins
 ↓
GitHub push
 ↓
...

trigger loop.

The current design separates CI from deployment automation:

Jenkins
  ↓
Build + Test + Scan + Push Image
  ↓
Docker Hub
  ↓
ArgoCD Image Updater
  ↓
ArgoCD
  ↓
Kubernetes

This keeps Jenkins focused on CI and ArgoCD focused on GitOps/CD.

46. Current Deployment Verification

The deployed environment was verified with:

kubectl get pods -n insight-hub

The application pods were running successfully.

ArgoCD was verified with:

kubectl get application insight-hub -n argocd

The application reported:

SYNC STATUS:   Synced
HEALTH STATUS: Healthy

The deployed images were verified with:

kubectl get deployment -n insight-hub \
  -o custom-columns='NAME:.metadata.name,IMAGE:.spec.template.spec.containers[*].image'

Verified application images:

mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30

47. What This Project Demonstrates

This project demonstrates practical experience with:

Full-stack application development

REST API development

JWT authentication

Database integration

Docker containerization

Docker Compose

Kubernetes deployments

Kubernetes services and ingress

Kustomize

CI/CD with Jenkins

Static code analysis

Quality Gate enforcement

Filesystem security scanning

Container image security scanning

Container registry management

GitHub webhooks

GitOps with ArgoCD

Automated image updates

Kubernetes manifest validation

Prometheus metrics

ServiceMonitor

Grafana observability

AWS EC2-based infrastructure

DevSecOps workflow design

48. Production Hardening Opportunities

The current project is a strong portfolio/learning implementation. A
production environment would additionally require decisions around:

HTTPS/TLS

Domain and DNS management

Secrets management

Non-root containers

Network policies

Resource requests and limits

Horizontal Pod Autoscaling

Centralized logging

Backup and restore strategy

Database high availability

Persistent storage strategy

Image signing and verification

Vulnerability remediation policies

RBAC hardening

Disaster recovery

Infrastructure as Code

These are intentionally kept separate from the current implementation
rather than claiming they are already deployed.

49. Future Enhancements

Potential next improvements:

Terraform-based AWS infrastructure project

Centralized logging with Loki

Alertmanager integration

Kubernetes autoscaling

External secret management

HTTPS with a real domain

Container image signing

Automated integration tests

Blue/green or canary deployment

Production-grade database backup strategy

50. Project Links

GitHub Repository

https://github.com/mofarhankhan/insight-hub

Docker Hub

Add your Docker Hub repository links here.

51. Resume Project Summary

InsightHub --- DevSecOps Business Intelligence Platform

Built and deployed a full-stack Business Intelligence Dashboard using
React, Node.js, Express and MySQL, with a complete DevSecOps delivery
workflow using Jenkins, SonarQube, Trivy, Docker, Kubernetes, ArgoCD,
Prometheus and Grafana. Implemented automated GitHub-triggered CI,
code-quality and security gates, Docker image publishing, ArgoCD Image
Updater-based continuous delivery, Kubernetes manifest validation, and
application monitoring through Prometheus metrics and Grafana.

52. Author

Mohd Farhan Khan

GitHub:
https://github.com/mofarhankhan

⭐ If this project helped you understand DevOps, CI/CD, GitOps and Kubernetes, consider giving the repository a star.