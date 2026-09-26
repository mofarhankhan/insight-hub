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
- Manage user preferences
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

The main objective of this project is to demonstrate how a modern application can be built, secured, containerized, deployed, automated and monitored using industry-relevant DevOps tools.

🎯 What This Project Demonstrates

This project demonstrates practical implementation of:

Full-stack application development
REST API architecture
JWT authentication
MySQL database integration
Docker containerization
Docker Compose
Jenkins CI/CD
GitHub Webhooks
SonarQube code analysis
SonarQube Quality Gates
Trivy security scanning
Docker image security scanning
Kubernetes
Kustomize
Kubernetes manifest validation
Docker Hub
ArgoCD GitOps
ArgoCD Image Updater
Prometheus monitoring
Grafana visualization
AWS EC2 deployment
CI/CD email notifications
🖥️ Application
What is InsightHub?

InsightHub is a dashboard-driven Business Intelligence application that gives users a centralized view of business operations and analytics.

The application contains:

📊 Dashboard
Revenue KPIs
Customer statistics
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
Offering performance
Summary statistics
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
Amount
Customer
Date
Payment method
📦 Offerings
Revenue
Units
Growth
Performance
Status
⚙️ Settings
Profile information
Notification preferences
Appearance settings
Security section
🔐 Authentication
Login
JWT authentication
Password hashing using bcrypt
Protected frontend routes
Protected backend APIs
📸 Application Screenshots
Dashboard

Analytics

These screenshots demonstrate the actual application that is being containerized and deployed through the DevSecOps pipeline.

🏗️ System Architecture

The complete architecture consists of four major layers:

1. Source & CI
Developer
    ↓
GitHub
    ↓
GitHub Webhook
    ↓
Jenkins
2. DevSecOps
Jenkins
   ├── Dependency Installation
   ├── Filesystem Security Scan
   ├── SonarQube Analysis
   ├── Quality Gate
   ├── Docker Build
   ├── Docker Image Scan
   └── Kubernetes Validation
3. GitOps & Deployment
Docker Hub
     ↓
ArgoCD Image Updater
     ↓
ArgoCD
     ↓
Kubernetes
4. Observability
Application
     ↓
/api/metrics
     ↓
ServiceMonitor
     ↓
Prometheus
     ↓
Grafana
☁️ AWS Infrastructure

The project is hosted on AWS EC2 using two EC2 instances.

EC2 — DevSecOps / CI Server

The first EC2 instance is used for CI and code-quality tooling.

It hosts:

Jenkins
SonarQube

Jenkins executes the CI pipeline whenever code is pushed to GitHub.

EC2 — Kubernetes / Application Server

The second EC2 instance is used for the Kubernetes/application environment.

It hosts:

Kubernetes
ArgoCD
ArgoCD Image Updater
Prometheus
Grafana
InsightHub workloads

The Kubernetes environment runs:

Frontend
Backend
MySQL

AWS Security Groups are used to control network access to the EC2 environments.

The project does not claim AWS services that are not actually implemented. There is no EKS, RDS, Terraform or load balancer dependency in the current architecture.

🔄 CI/CD Pipeline

The Jenkins pipeline is triggered through a GitHub Webhook.

A normal code change follows this flow:

Developer
    ↓
git push
    ↓
GitHub
    ↓
Webhook
    ↓
Jenkins

Once Jenkins starts, the following stages are executed.

1️⃣ Checkout

Jenkins checks out the latest source code from GitHub.

2️⃣ Install Dependencies

Frontend and backend dependencies are installed.

The two dependency installation tasks run in parallel to reduce pipeline execution time.

             Jenkins
                │
        ┌───────┴───────┐
        ↓               ↓
     Backend          Frontend
    npm install      npm install
3️⃣ Filesystem Security Scan

Trivy scans the project filesystem for security vulnerabilities.

Source Code
     ↓
   Trivy
     ↓
Filesystem Security Results

This allows security checks to happen before Docker images are published.

4️⃣ SonarQube Code Analysis

The source code is analyzed using SonarQube.

The analysis covers:

server/src
client/src

SonarQube is used to identify code-quality and maintainability issues before the application proceeds further through the pipeline.

5️⃣ SonarQube Quality Gate

After the analysis, Jenkins waits for the SonarQube Quality Gate.

SonarQube Analysis
       ↓
   Quality Gate
       ↓
   Pass / Fail

A failed Quality Gate prevents the pipeline from continuing.

SonarQube Evidence

6️⃣ Docker Image Build

The frontend and backend are packaged into separate Docker images.

client/Dockerfile
       ↓
Frontend Image

server/Dockerfile
       ↓
Backend Image

The two image builds run in parallel.

7️⃣ Docker Image Security Scan

After building the images, Trivy scans them for vulnerabilities.

Docker Image
     ↓
   Trivy
     ↓
Vulnerability Results

This ensures that container images are checked before being pushed to the registry.

Trivy Evidence

8️⃣ Kubernetes Manifest Validation

Before the deployment artifacts are considered valid, Kubernetes manifests are rendered using Kustomize.

kubectl kustomize k8s/

The rendered resources are then validated using kubeconform.

This helps catch invalid Kubernetes manifests before deployment.

The project successfully validated:

12 resources
Valid: 12
Invalid: 0
Errors: 0
Skipped: 0
9️⃣ Docker Hub Push

After passing the required CI checks, the Docker images are pushed to Docker Hub.

Images:

mofarhankhann/insight-hub-backend
mofarhankhann/insight-hub-frontend

Image tags are based on Jenkins build numbers.

Docker Hub Evidence

🐳 Docker

The application is containerized using Docker.

The repository contains:

client/
└── Dockerfile

server/
└── Dockerfile

docker-compose.yml

The frontend and backend are maintained as separate images.

This provides:

Consistent application environments
Reproducible builds
Easy deployment to Kubernetes
Separation between application components
☸️ Kubernetes

InsightHub is deployed into the Kubernetes namespace:

insight-hub

The main application workloads are:

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
MySQL PVC
ServiceMonitor
Kustomization
Kubernetes Architecture
                 Kubernetes
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
      Frontend     Backend     MySQL
          │          │           │
          │          └───────────┘
          │
          ↓
      Application
Kubernetes Evidence

Useful verification:

kubectl get pods -n insight-hub
kubectl get deployment -n insight-hub \
  -o custom-columns='NAME:.metadata.name,IMAGE:.spec.template.spec.containers[*].image'
🧩 Kustomize

Kubernetes configuration is organized using Kustomize.

The main configuration is:

k8s/kustomization.yaml

Kustomize manages the application's Kubernetes resource collection and image configuration.

The complete configuration can be rendered with:

kubectl kustomize k8s/
🔁 GitOps with ArgoCD

ArgoCD is responsible for the Continuous Delivery side of the project.

The GitOps flow is:

GitHub Repository
       ↓
     ArgoCD
       ↓
   Kubernetes

The ArgoCD application tracks the Kubernetes configuration stored in the repository.

The application is configured for automated synchronization.

ArgoCD Verification
kubectl get application insight-hub -n argocd

Expected state:

SYNC STATUS   → Synced
HEALTH STATUS → Healthy
ArgoCD Evidence

🔄 ArgoCD Image Updater

ArgoCD Image Updater is used to automate image updates after Jenkins publishes a new Docker image.

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

because the image tags are based on Jenkins build numbers.

For example:

backend:28
frontend:28

can be automatically updated to:

backend:30
frontend:30

The live Kubernetes deployment was verified with:

mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30
Image Updater Evidence

📊 Monitoring & Observability

Monitoring is implemented using:

Prometheus
Grafana
Kubernetes ServiceMonitor
Prometheus-compatible application metrics
Application Metrics

The backend exposes:

GET /api/metrics

The endpoint is implemented using:

@prometheus-io/client

It exposes Node.js/process metrics that can be scraped by Prometheus.

ServiceMonitor

The backend Kubernetes Service is connected to Prometheus using a Kubernetes ServiceMonitor.

Configuration:

k8s/monitoring/backend-servicemonitor.yaml

Prometheus scrapes:

/api/metrics

with a configured interval of:

5 seconds
Monitoring Flow
InsightHub Backend
       │
       │ /api/metrics
       ↓
Kubernetes Service
       ↓
ServiceMonitor
       ↓
Prometheus
       ↓
Grafana
Prometheus

Prometheus collects metrics from the Kubernetes environment and InsightHub backend.

Grafana

Grafana is used to visualize the collected metrics.

📧 Jenkins Email Notifications

Jenkins is configured with email notifications for pipeline results.

The pipeline can notify when:

Build → SUCCESS
Build → FAILURE

This provides visibility into CI status without manually checking Jenkins after every build.

🔐 Security & Secrets

Security is integrated into the delivery pipeline.

Security controls implemented
Security Area	Implementation
Source Code Quality	SonarQube
Quality Enforcement	SonarQube Quality Gate
Filesystem Security	Trivy
Container Security	Trivy
Kubernetes Validation	kubeconform
Secrets	Environment variables / Jenkins credentials
Network Access	AWS Security Groups

Sensitive information is intentionally not committed to GitHub.

Examples include:

.env
JWT secrets
Database passwords
Docker Hub credentials
SonarQube tokens
SMTP credentials
AWS credentials

The repository uses example configuration files such as:

server/.env.example
client/.env.example
🔁 CI vs CD Responsibility

One important design decision in this project is the separation between CI and CD.

Jenkins — Continuous Integration

Jenkins is responsible for:

Checkout
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

Container Image
       ↓
ArgoCD Image Updater
       ↓
ArgoCD
       ↓
Kubernetes

This prevents Jenkins from becoming responsible for directly modifying the Kubernetes deployment workflow.

🔄 Avoiding the Jenkins Trigger Loop

An earlier approach used Jenkins to modify Kubernetes image tags and push those changes back to GitHub.

That could create:

Jenkins
   ↓
GitHub Push
   ↓
Jenkins
   ↓
GitHub Push
   ↓
Jenkins
   ↓
...

The implementation was changed so Jenkins no longer pushes generated deployment changes back to GitHub.

The current design is:

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

This gives Jenkins a clear CI responsibility while ArgoCD manages deployment automation.

📁 Project Structure
insight-hub/
│
├── client/
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
Layer	Technologies
Frontend	React, Vite, React Router, Axios, Recharts
Backend	Node.js, Express
Database	MySQL 8
Authentication	JWT, bcrypt
Containerization	Docker, Docker Compose
Source Control	Git, GitHub
CI	Jenkins
Code Quality	SonarQube
Security	Trivy
Registry	Docker Hub
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

Verify:

node -v
npm -v
mysql --version
Backend
cd server
npm install

Create .env:

cp .env.example .env

Configure the database and application variables:

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

Health endpoint:

http://localhost:5000/api/health
Frontend
cd client
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api

Start:

npm run dev

Frontend:

http://localhost:5173
🔐 Demo Login

For local/demo usage:

Email:    admin@insighthub.local
Password: Admin@123

This is a development/demo account only. Do not use it as a production credential.

🩺 Health Check

The backend provides:

GET /api/health

A healthy response confirms:

API is running
MySQL connection is working

Example:

{
  "status": "ok",
  "database": "connected"
}
📡 API Overview
Authentication
POST /api/auth/login
Analytics
GET /api/analytics/dashboard
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

The following screenshots should be maintained in:

docs/images/

Recommended structure:

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

These screenshots provide visual proof of the implementation instead of only describing the tools.

✅ Final Deployment Verification

The final environment was verified using Kubernetes and ArgoCD.

Kubernetes
kubectl get pods -n insight-hub

Frontend and backend pods were running successfully.

ArgoCD
kubectl get application insight-hub -n argocd

Verified:

SYNC STATUS   → Synced
HEALTH STATUS → Healthy
Deployed Images
mofarhankhann/insight-hub-backend:30
mofarhankhann/insight-hub-frontend:30

This confirms the complete path from CI image publishing through automated image update and Kubernetes rollout.

💡 Key Engineering Decisions
Why Jenkins + ArgoCD?

Jenkins handles CI activities such as:

Build
Analysis
Security scanning
Image creation
Registry publishing

ArgoCD handles Kubernetes deployment through GitOps.

This keeps CI and CD responsibilities separated.

Why ArgoCD Image Updater?

Jenkins publishes the container image but does not need to continuously modify Git deployment manifests.

ArgoCD Image Updater detects the new image and updates the ArgoCD application specification.

Why Kubernetes?

Kubernetes provides:

Container orchestration
Service discovery
Rolling deployments
Application isolation
Declarative workload management
Why Prometheus + Grafana?

Prometheus collects application and infrastructure metrics while Grafana provides visualization and operational visibility.

🚧 Production Improvements

The current project is a portfolio/learning implementation. A production deployment could additionally introduce:

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
RBAC hardening
Infrastructure as Code
High availability
Disaster recovery

These are future improvements and are not represented as currently implemented features.

📄 Resume Description
InsightHub — DevSecOps Business Intelligence Platform

Built and deployed a full-stack Business Intelligence Dashboard using React, Node.js, Express and MySQL. Implemented a DevSecOps CI pipeline with Jenkins, SonarQube and Trivy, containerized applications using Docker, deployed workloads on Kubernetes, and implemented GitOps-based continuous delivery using ArgoCD and ArgoCD Image Updater. Added Kubernetes manifest validation and Prometheus/Grafana monitoring with application-level metrics.

🔗 Repository

GitHub:
https://github.com/mofarhankhan/insight-hub

👨‍💻 Author

Mohd Farhan Khan

GitHub:
https://github.com/mofarhankhan

⭐ If you find this project useful, consider giving the repository a star.


### Ye version tumhare liye actual sweet spot hai

Isme **application part bhi properly visible hai** aur DevOps part ko sirf “Jenkins, Docker, Kubernetes...” ki list nahi banaya gaya. Recruiter ko actual implementation samajh aayegi:

**Application**
→ kya banaya

**AWS**
→ kahan chalaya

**Jenkins**
→ CI mein kya kiya

**SonarQube/Trivy**
→ quality + security kaise ki

**Docker**
→ application kaise package ki

**Kubernetes**
→ kaise run ki

**ArgoCD**
→ deployment kaise automate ki

**Image Updater**
→ new image production-like environment tak kaise pahunchi

**Prometheus/Grafana**
→ monitoring kaise ki

**Architecture**
→ sab ek saath kaise connected hai

Aur sabse important: **Terraform, EKS, RDS, ALB, VPC, Loki, Alertmanager, etc. ko implemented bolkar nahi d