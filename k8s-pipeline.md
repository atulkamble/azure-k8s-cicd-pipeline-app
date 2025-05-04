Here you go! Below are the complete:

---

## 🔁 Kubernetes YAMLs for Frontend, Backend, DB, and Grafana

📁 **`manifests/` Structure:**

```
manifests/
├── backend-deployment.yaml
├── frontend-deployment.yaml
├── postgres-deployment.yaml
├── grafana-deployment.yaml
```

---

### 📦 `postgres-deployment.yaml`

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:14
          env:
            - name: POSTGRES_USER
              value: "postgres"
            - name: POSTGRES_PASSWORD
              value: "postgres"
            - name: POSTGRES_DB
              value: "mydb"
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
      volumes:
        - name: postgres-storage
          persistentVolumeClaim:
            claimName: postgres-pvc
```

---

### 🔙 `backend-deployment.yaml`

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
          env:
            - name: PGUSER
              value: postgres
            - name: PGPASSWORD
              value: postgres
            - name: PGHOST
              value: postgres
            - name: PGDATABASE
              value: mydb
            - name: PGPORT
              value: "5432"
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
    - port: 5000
  type: ClusterIP
```

---

### 🌐 `frontend-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: <ACR_NAME>.azurecr.io/frontend:latest
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

---

### 📊 `grafana-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:latest
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: grafana
spec:
  selector:
    app: grafana
  ports:
    - port: 3000
  type: LoadBalancer
```

Replace `<ACR_NAME>` with your Azure Container Registry name.

---

## 📄 Azure DevOps CI/CD Pipeline: `azure-pipelines.yml`

```yaml
trigger:
  branches:
    include:
      - main

variables:
  azureSubscription: 'Your Azure Subscription'
  acrName: '<ACR_NAME>'
  acrLoginServer: '<ACR_NAME>.azurecr.io'
  resourceGroup: 'aks-resource-group'
  clusterName: 'aks-cluster'

stages:
  - stage: Build
    jobs:
      - job: BuildAndPush
        pool:
          vmImage: ubuntu-latest
        steps:
          - task: Docker@2
            displayName: Build backend image
            inputs:
              repository: 'backend'
              command: 'buildAndPush'
              Dockerfile: '**/backend/Dockerfile'
              containerRegistry: '$(acrName)'
              tags: |
                latest

          - task: Docker@2
            displayName: Build frontend image
            inputs:
              repository: 'frontend'
              command: 'buildAndPush'
              Dockerfile: '**/frontend/Dockerfile'
              containerRegistry: '$(acrName)'
              tags: |
                latest

  - stage: Deploy
    dependsOn: Build
    jobs:
      - job: DeployToAKS
        pool:
          vmImage: ubuntu-latest
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: $(azureSubscription)
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az aks get-credentials --resource-group $(resourceGroup) --name $(clusterName)
                kubectl apply -f manifests/
```

---

## ✅ Final Steps

* Replace `<ACR_NAME>` and other placeholders
* Push to GitHub → triggers pipeline
* AKS cluster pulls image → deploys services
* Frontend exposed via LoadBalancer IP
* Grafana dashboard reachable via another LoadBalancer IP

---

Would you like me to bundle all these files into a ready-to-push GitHub repo or ZIP file?
