# 🚀 InsightHub — DevSecOps Business Intelligence Platform

> A full-stack Business Intelligence Dashboard deployed on Kubernetes with an automated **CI/CD, DevSecOps, GitOps and Monitoring** workflow.

![InsightHub Architecture](docs/images/architecture.png)

---

## 📌 Project Overview

**InsightHub** is a full-stack Business Intelligence and Operations Dashboard built for a fictional organization.

The application provides a centralized platform to:

- Monitor business KPIs
- Analyze revenue and customer growth
- Manage customers
- Track transactions
- Analyze offering/service performance
- View business/activity events
- Manage dashboard settings
- Authenticate users securely

The project was then extended into a complete **DevSecOps deployment platform**, covering the complete lifecycle from:

```text
Code Commit
     ↓
GitHub
     ↓
Jenkins CI
     ↓
Code Quality + Security Checks
     ↓
Docker Build
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
🖥️ Application Features
🔐 Authentication
JWT-based authentication
Password hashing using bcrypt
Protected frontend routes
Protected backend APIs
Demo administrator account
📊 Dashboard
Total revenue
Total customers
Active subscriptions
Conversion rate
Revenue charts
Customer growth
Channel distribution
Recent transactions
Recent activity
📈 Analytics
Revenue trends
Customer growth
Acquisition channels
Top performing offerings
Business summary statistics
👥 Customers
Customer listing
Search
Status filtering
Customer details
Customer lifetime value
💳 Transactions
Transaction listing
Search
Status filtering
Transaction amount
Customer information
Date
Payment method
📦 Offerings
Offering performance
Revenue
Units
Growth
Status
⚙️ Settings
Profile information
Notification preferences
Appearance preferences
Security section
📸 Application Screenshots
Dashboard

Analytics

The screenshots demonstrate the actual Business Intelligence application deployed through the DevSecOps workflow.

🏗️ Architecture

The architecture is divided into four major areas:

                    AWS EC2 Environment
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
 DevSecOps EC2                         Kubernetes EC2
        │                                     │
        ├── Jenkins                           ├── Kubernetes
        └── SonarQube                         ├── ArgoCD
                                              ├── Image Updater
                                              ├── Prometheus
                                              ├── Grafana
                                              └── InsightHub
Application Runtime
                    Kubernetes
                        │
              ┌─────────┼─────────┐
              │         │         │
              ▼         ▼         ▼
          Frontend   Backend    MySQL
                         │
                         ▼
                    REST APIs
CI/CD and GitOps
Developer
    │
    ▼
 GitHub
    │
    │ Webhook
    ▼
 Jenkins
    │
    ├── Code Analysis
    ├── Security Scanning
    ├── Docker Build
    └── Kubernetes Validation
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
Monitoring
InsightHub Backend
        │
        ▼
 /api/metrics
        │
        ▼
 ServiceMonitor
        │
        ▼
 Prometheus
        │
        ▼
 Grafana
☁️ AWS Infrastructure

The project is deployed using two AWS EC2 instances.

EC2 — DevSecOps Server

The first EC2 instance is dedicated to CI and code-quality tooling.

EC2 Instance
     │
     ├── Jenkins
     └── SonarQube
Jenkins

Jenkins is responsible for:

CI pipeline execution
GitHub integration
Dependency installation
Security scanning
SonarQube analysis
Docker image building
Kubernetes manifest validation
Docker Hub publishing
Email notifications
SonarQube

SonarQube is integrated into Jenkins for:

Static code analysis
Code quality inspection
Quality Gate enforcement
EC2 — Kubernetes Server

The second EC2 instance hosts the application delivery and monitoring environment.

EC2 Instance
     │
     ├── Kubernetes
     ├── ArgoCD
     ├── ArgoCD Image Updater
     ├── Prometheus
     ├── Grafana
     └── InsightHub workloads

AWS Security Groups are used to control network access to the EC2 instances.

This project currently uses EC2-based infrastructure. Services such as EKS, RDS, ALB and Terraform are not part of the implemented architecture.

🔄 CI Pipeline — Jenkins

A GitHub push triggers Jenkins through a GitHub Webhook.

Developer
    ↓
git push
    ↓
GitHub
    ↓
GitHub Webhook
    ↓
Jenkins Pipeline

The Jenkins pipeline contains the following major stages:

Checkout
   ↓
Install Dependencies
   ↓
Filesystem Security Scan
   ↓
SonarQube Code Analysis
   ↓
SonarQube Quality Gate
   ↓
Docker Image Build
   ↓
Docker Image Security Scan
   ↓
Kubernetes Manifest Validation
   ↓
Docker Registry Push
1️⃣ Checkout

Jenkins checks out the latest source code from the GitHub repository.

This ensures that every pipeline execution works against the latest committed version.

2️⃣ Install Dependencies

Frontend and backend dependencies are installed.

The two tasks are executed in parallel:

             Jenkins
                │
        ┌───────┴───────┐
        ▼               ▼
     Backend          Frontend
   npm install       npm install

This reduces unnecessary pipeline execution time.

3️⃣ Filesystem Security Scan

Trivy scans the source filesystem for security vulnerabilities.

Source Code
     ↓
   Trivy
     ↓
Security Findings

This provides an early security check before container images are published.

4️⃣ SonarQube Code Analysis

Jenkins sends the application source code to SonarQube.

The project analyzes:

server/src
client/src

SonarQube helps identify code-quality and maintainability issues.

5️⃣ SonarQube Quality Gate

After analysis, Jenkins waits for the SonarQube Quality Gate.

SonarQube Analysis
        ↓
   Quality Gate
        ↓
   Pass / Fail

The pipeline only proceeds when the configured Quality Gate passes.

6️⃣ Docker Image Build

The application is packaged into separate Docker images.

client/Dockerfile
        ↓
Frontend Image

server/Dockerfile
        ↓
Backend Image

The frontend and backend images are built independently.

7️⃣ Docker Image Security Scan

After building the images, Trivy scans the Docker images for vulnerabilities.

Docker Image
     ↓
   Trivy
     ↓
Vulnerability Results

This provides a second security layer at the container level.

8️⃣ Kubernetes Manifest Validation

Before deployment, Kubernetes manifests are rendered using Kustomize:

kubectl kustomize k8s/

The generated manifests are validated using kubeconform.

The project successfully validated:

12 Kubernetes resources
Valid: 12
Invalid: 0
Errors: 0
Skipped: 0

This prevents malformed Kubernetes resources from reaching the deployment stage.

9️⃣ Docker Hub Push

After successful CI checks, Jenkins pushes the application images to Docker Hub.

mofarhankhann/insight-hub-backend
mofarhankhann/insight-hub-frontend

Images use Jenkins build numbers as tags.

Example:

insight-hub-backend:30
insight-hub-frontend:30

🐳 Docker

The application is containerized using Docker.

client/
└── Dockerfile

server/
└── Dockerfile

docker-compose.yml

Docker provides:

Reproducible application environments
Consistent builds
Separate frontend/backend containers
Easy local development
Kubernetes-ready application images
☸️ Kubernetes Deployment

The application runs inside Kubernetes namespace:

insight-hub

The main workloads are:

Frontend
Backend
MySQL

Kubernetes resources include:

Namespace
Deployments
Services
ConfigMap
Secret
Ingress
PersistentVolumeClaim
ServiceMonitor
Kustomization
Kubernetes Application Flow
                    Kubernetes
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
         Frontend      Backend      MySQL
             │           │
             │           └───────┐
             │                   │
             ▼                   ▼
          Browser            Database
Kubernetes Verification
kubectl get pods -n insight-hub
kubectl get deployment -n insight-hub \
  -o custom-columns='NAME:.metadata.name,IMAGE:.spec.template.spec.containers[*].image'

Example verified deployment:

backend-deployment   mofarhankhann/insight-hub-backend:30
frontend             mofarhankhann/insight-hub-frontend:30
mysql-deployment     mysql:8.0

🧩 Kustomize

Kubernetes resources are organized using Kustomize.

Main configuration:

k8s/kustomization.yaml

Kustomize is used to:

Organize Kubernetes resources
Manage application configuration
Manage container image configuration
Render the complete Kubernetes manifest

Render configuration:

kubectl kustomize k8s/
🔁 GitOps with ArgoCD

ArgoCD is responsible for the Continuous Delivery side of the project.

The GitOps workflow is:

GitHub Repository
       ↓
     ArgoCD
       ↓
   Kubernetes

ArgoCD continuously manages the Kubernetes application state.

The application is configured with automated synchronization.

ArgoCD Application
Application:
insight-hub

Verification:

kubectl get application insight-hub -n argocd

Verified state:

SYNC STATUS   → Synced
HEALTH STATUS → Healthy

🔄 ArgoCD Image Updater

ArgoCD Image Updater automates the deployment of newly published Docker images.

The complete flow is:

Jenkins
   ↓
Docker Build
   ↓
Docker Hub
   ↓
ArgoCD Image Updater
   ↓
Detect New Image
   ↓
Update ArgoCD Application
   ↓
ArgoCD
   ↓
Kubernetes Rollout

The project uses:

newest-build

because Docker images are tagged using Jenkins build numbers.

Example:

backend:28
frontend:28

After a newer Jenkins build:

backend:30
frontend:30

The Image Updater detected and updated both application images.

Verified live deployment:

mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30

📊 Monitoring & Observability

Monitoring is implemented using:

Prometheus
Grafana
Kubernetes ServiceMonitor
Application metrics
Application Metrics

The backend exposes:

GET /api/metrics

Metrics are generated using:

@prometheus-io/client

The endpoint exposes Node.js/process metrics that can be collected by Prometheus.

ServiceMonitor

The backend Kubernetes Service is connected to Prometheus using a ServiceMonitor.

Configuration:

k8s/monitoring/backend-servicemonitor.yaml

Prometheus scrapes:

/api/metrics

with an interval of:

5 seconds
Monitoring Flow
InsightHub Backend
       │
       ▼
 /api/metrics
       │
       ▼
 Kubernetes Service
       │
       ▼
 ServiceMonitor
       │
       ▼
 Prometheus
       │
       ▼
 Grafana
Prometheus

Prometheus collects metrics from the Kubernetes environment and InsightHub backend.

Grafana

Grafana provides visualization of the collected metrics.

📧 Jenkins Email Notifications

Jenkins is configured with email notifications for pipeline results.

The pipeline can send notifications for:

Build SUCCESS
Build FAILURE

This allows pipeline status to be monitored without manually checking Jenkins after every execution.

🔐 Security & Secrets

Security is integrated into the development and deployment workflow.

Implemented Security Controls
Area	Tool / Implementation
Source Code Quality	SonarQube
Quality Enforcement	SonarQube Quality Gate
Filesystem Security	Trivy
Container Security	Trivy
Kubernetes Validation	kubeconform
Credentials	Jenkins Credentials
Environment Secrets	.env / Kubernetes Secret
Network Access	AWS Security Groups

Sensitive values are not committed to GitHub.

Examples:

.env
Database passwords
JWT secrets
Docker Hub credentials
SonarQube tokens
SMTP credentials
AWS credentials

Example configuration files are provided where required:

server/.env.example
client/.env.example
🔁 CI/CD Responsibility Separation

A major design decision in this project is separating CI from CD.

Jenkins — Continuous Integration

Jenkins handles:

Source Checkout
       ↓
Dependencies
       ↓
Security Scan
       ↓
SonarQube
       ↓
Quality Gate
       ↓
Docker Build
       ↓
Image Scan
       ↓
Kubernetes Validation
       ↓
Docker Hub Push
ArgoCD — Continuous Delivery

ArgoCD handles:

New Container Image
       ↓
ArgoCD Image Updater
       ↓
ArgoCD
       ↓
Kubernetes

This gives each platform a clear responsibility.

🔄 Jenkins Trigger Loop Prevention

During development, an automated Jenkins workflow that pushed generated Kubernetes image-tag changes back into GitHub could cause repeated builds.

The workflow was redesigned so Jenkins does not push generated deployment changes back to GitHub.

Instead:

GitHub
   ↓
Jenkins
   ↓
Docker Hub
   ↓
ArgoCD Image Updater
   ↓
ArgoCD
   ↓
Kubernetes

Therefore:

One GitHub Push
       ↓
One Jenkins Build
       ↓
Docker Image
       ↓
Automated Deployment

This keeps the CI pipeline clean and prevents a Jenkins → GitHub → Jenkins trigger loop.

📁 Project Structure
insight-hub/
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
│   ├── image-updater.yaml
│   ├── ingress.yml
│   ├── namespace.yml
│   └── kustomization.yaml
│
├── Jenkinsfile
├── docker-compose.yml
├── sonar-project.properties
└── README.md
🧰 Technology Stack
Category	Technologies
Frontend	React, Vite, React Router, Axios, Recharts
Backend	Node.js, Express
Database	MySQL 8
Authentication	JWT, bcrypt
Containerization	Docker, Docker Compose
Source Control	Git, GitHub
CI	Jenkins
Code Quality	SonarQube
Security Scanning	Trivy
Container Registry	Docker Hub
Orchestration	Kubernetes
Kubernetes Configuration	Kustomize
Manifest Validation	kubeconform
GitOps / CD	ArgoCD
Image Automation	ArgoCD Image Updater
Monitoring	Prometheus, Grafana
Cloud	AWS EC2
🧪 Local Development
Requirements
Node.js 18+
npm
MySQL 8+

Check:

node -v
npm -v
mysql --version
Backend Setup
cd server
npm install

Create environment file:

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

Start:

npm run dev

Backend:

http://localhost:5000

Health check:

http://localhost:5000/api/health
Frontend Setup
cd client
npm install

Create:

VITE_API_URL=http://localhost:5000/api

Start:

npm run dev

Frontend:

http://localhost:5173
🔐 Demo Login

For local/demo usage:

Email:    admin@insighthub.local
Password: Admin@123

This credential is for development/demo purposes only and must not be used in production.

🩺 Health Check

The backend provides:

GET /api/health

A successful response confirms that the API and database connection are working.

Example:

{
  "status": "ok",
  "database": "connected"
}
📡 API Overview
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

Protected APIs use:

Authorization: Bearer <token>
📸 Project Evidence

Screenshots are maintained under:

docs/images/

Recommended files:

docs/
└── images/
    ├── architecture.png
    ├── app-dashboard.png
    ├── app-analytics.png
    ├── jenkins-pipeline-success.png
    ├── sonarqube-quality-gate.png
    ├── trivy-image-scan.png
    ├── dockerhub-images.png
    ├── argocd-application.png
    ├── argocd-image-updater.png
    ├── kubernetes-pods.png
    ├── prometheus-targets.png
    └── grafana-dashboard.png

These screenshots provide visual evidence of the implemented application and DevSecOps workflow.

✅ Final Deployment Verification

The final environment was verified using Kubernetes and ArgoCD.

Kubernetes Pods
kubectl get pods -n insight-hub

Verified:

backend-deployment     1/1 Running
frontend               1/1 Running
mysql-deployment       1/1 Running
ArgoCD
kubectl get application insight-hub -n argocd

Verified:

SYNC STATUS   → Synced
HEALTH STATUS → Healthy
Live Images
mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30
mysql:8.0

This confirms that the application was successfully built, published, updated and deployed through the automated workflow.

🧠 Key DevOps Concepts Demonstrated

This project demonstrates practical understanding of:

CI/CD pipeline design
GitHub Webhooks
Jenkins Pipeline as Code
Parallel Jenkins stages
Static code analysis
Quality Gates
Shift-left security
Filesystem vulnerability scanning
Container image vulnerability scanning
Docker image versioning
Container registries
Kubernetes Deployments
Kubernetes Services
Kubernetes Secrets and ConfigMaps
Persistent Volumes
Ingress
Kustomize
Kubernetes manifest validation
GitOps
ArgoCD
Automated image updates
Deployment automation
Prometheus metrics
ServiceMonitor
Grafana dashboards
AWS EC2 infrastructure
Security Group based network access
🚧 Future Improvements

The current implementation can be extended further with:

Terraform / Infrastructure as Code
HTTPS/TLS
Domain and DNS
Kubernetes NetworkPolicies
Resource requests and limits
Horizontal Pod Autoscaling
Centralized logging
Alertmanager
External secret management
Database backup strategy
Image signing
Kubernetes RBAC hardening
High availability
Disaster recovery

These are future improvements and are not represented as currently implemented features.

💼 Resume Description
InsightHub — DevSecOps Business Intelligence Platform

Built and deployed a full-stack Business Intelligence Dashboard using React, Node.js, Express and MySQL. Implemented a DevSecOps CI pipeline using Jenkins, SonarQube and Trivy, containerized the application using Docker, deployed workloads on Kubernetes, and implemented GitOps-based Continuous Delivery using ArgoCD and ArgoCD Image Updater. Added Kubernetes manifest validation and Prometheus/Grafana monitoring with application-level metrics.

🔗 Repository

GitHub:
https://github.com/mofarhankhan/insight-hub

👨‍💻 Author

Mohd Farhan Khan

GitHub:
https://github.com/mofarhankhan

⭐ If you found this project useful, consider giving the repository a star.