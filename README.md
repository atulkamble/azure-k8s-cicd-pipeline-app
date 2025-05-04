## 🚀 **Project Title**: `azure-k8s-cicd-pipeline-app`

🔧 **Goal**: Build a CI/CD pipeline using **Azure DevOps**, deploying a containerized **frontend-backend application with DB connectivity** on a **Kubernetes (AKS) cluster provisioned by Terraform**, with **Grafana for monitoring**, and automatic **Docker image build/push to ACR**.

---

## 📁 Suggested GitHub Repo Name

**Repo**: `azure-aks-terraform-devops-app`

---

## 🌐 Application Stack

* **Frontend**: ReactJS
* **Backend**: Node.js + Express
* **Database**: PostgreSQL
* **Monitoring**: Grafana + Prometheus
* **Containerization**: Docker
* **Orchestration**: Kubernetes on AKS
* **Infrastructure**: Terraform
* **CI/CD**: Azure DevOps Pipelines
* **Registry**: Azure Container Registry (ACR)

---

## 📦 Project Structure

```
azure-aks-terraform-devops-app/
├── terraform/
│   └── main.tf
├── backend/
│   ├── Dockerfile
│   └── index.js
├── frontend/
│   ├── Dockerfile
│   └── src/
├── manifests/
│   ├── frontend.yaml
│   ├── backend.yaml
│   ├── postgres.yaml
│   └── grafana.yaml
├── azure-pipelines.yml
└── README.md
```

---

## ☁️ Step-by-Step Implementation

---

### 1️⃣ **Provision AKS Cluster with Terraform**

📁 `terraform/main.tf`

```hcl
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "aks-resource-group"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-cluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "azuredevopsapp"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

output "kube_config" {
  value = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}
```

▶️ **Commands**

```bash
cd terraform
az login
terraform init
terraform apply -auto-approve
```

---

### 2️⃣ **Create Azure Container Registry (ACR)**

```bash
az acr create --name myacr123 --resource-group aks-resource-group --sku Basic
az acr login --name myacr123
```

---

### 3️⃣ **Dockerfile (Backend)**

📁 `backend/Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]
```

---

### 4️⃣ **Dockerfile (Frontend)**

📁 `frontend/Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

### 5️⃣ **Kubernetes Manifests**

📁 `manifests/backend.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: <ACR_NAME>.azurecr.io/backend:latest
        ports:
        - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
    - port: 5000
      targetPort: 5000
```

(Similar manifests for frontend, postgres, grafana.)

---

### 6️⃣ **Azure DevOps Pipeline (`azure-pipelines.yml`)**

```yaml
trigger:
  branches:
    include:
      - main

variables:
  azureSubscription: 'Your Azure Subscription Name'
  acrName: 'myacr123'
  kubernetesCluster: 'aks-cluster'
  resourceGroup: 'aks-resource-group'

stages:
  - stage: Build
    jobs:
      - job: BuildImages
        pool:
          vmImage: 'ubuntu-latest'
        steps:
          - task: Docker@2
            displayName: 'Build backend image'
            inputs:
              repository: 'backend'
              command: 'buildAndPush'
              Dockerfile: '**/backend/Dockerfile'
              containerRegistry: '$(acrName)'
              tags: 'latest'

          - task: Docker@2
            displayName: 'Build frontend image'
            inputs:
              repository: 'frontend'
              command: 'buildAndPush'
              Dockerfile: '**/frontend/Dockerfile'
              containerRegistry: '$(acrName)'
              tags: 'latest'

  - stage: Deploy
    dependsOn: Build
    jobs:
      - deployment: DeployToAKS
        environment: 'aks-env'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: Kubernetes@1
                  displayName: 'Deploy manifests to AKS'
                  inputs:
                    connectionType: 'Azure Resource Manager'
                    azureSubscription: '$(azureSubscription)'
                    azureResourceGroup: '$(resourceGroup)'
                    kubernetesCluster: '$(kubernetesCluster)'
                    namespace: default
                    command: apply
                    useConfigurationFile: true
                    configuration: manifests/
```

---

## 📊 Monitoring with Grafana

📁 `manifests/grafana.yaml` (simplified)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: grafana
spec:
  containers:
  - name: grafana
    image: grafana/grafana
    ports:
    - containerPort: 3000
```

Then expose via `LoadBalancer` or Ingress and access using the public IP.

---

## ✅ Final Output

* AKS Cluster ✅
* ACR with Docker Images ✅
* App accessible via public IP ✅
* Grafana running in AKS ✅
* Azure DevOps Pipeline automating it all ✅

---

## 📘 `README.md` (Snippet)

```markdown
# Azure DevOps CI/CD Pipeline with AKS, Docker, and Terraform 🚀

This project demonstrates a full-stack app deployed to an AKS cluster using Terraform and Azure DevOps CI/CD.

## ✅ Features
- Frontend (React), Backend (Node.js), PostgreSQL DB
- Dockerized and pushed to ACR
- AKS provisioned via Terraform
- Pipeline automates build, push, deploy
- Grafana for monitoring

## 🚀 Get Started
1. `terraform apply` to provision AKS
2. Push code to `main` → triggers pipeline
3. Visit app via LoadBalancer IP

```


