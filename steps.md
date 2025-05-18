Project :  azure-k8s-cicd-pipeline-app

1. Launch Server Machine - server 
key.pem
username: atul
NSG: http, https, ssh 
OS - Redhat OS 

2. Requirement : Git Repo - https://github.com/atulkamble/azure-k8s-cicd-pipeline-app

3. Connect 

```
cd Downloads 
chmod 400 key.pem

ssh -i key.pem atul@57.151.96.235

sudo apt update -y 
sudo apt install git -y 
git --version 
git config --global user.email "atul_kamble@hotmail.com"
git config --global user.name "Atul Kamble"
git config --list 

```
4. // install node js/ react js 

```
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.15.0".
nvm current # Should print "v22.15.0".

# Verify npm version:
npm -v # Should print "10.9.2".

```
5. // Install and configure docker 

sudo apt install docker.io

sudo systemctl start docker
sudo systemctl enable docker 
sudo docker login 

https://login.docker.com/activate

// installtion of postgresql

sudo apt install postgresql-plperl-16/noble-updates
sudo apt install postgresql-client

sudo systemctl start postgresql

// user account login 

sudo -i -u postgres


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

// create token for github push 

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

// install and configure terraform 
// update subscription in main.tf 

```
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

// install az cli 
```
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -sLS https://packages.microsoft.com/keys/microsoft.asc |
  gpg --dearmor | sudo tee /etc/apt/keyrings/microsoft.gpg > /dev/null
sudo chmod go+r /etc/apt/keyrings/microsoft.gpg

AZ_DIST=$(lsb_release -cs)
echo "Types: deb
URIs: https://packages.microsoft.com/repos/azure-cli/
Suites: ${AZ_DIST}
Components: main
Architectures: $(dpkg --print-architecture)
Signed-by: /etc/apt/keyrings/microsoft.gpg" | sudo tee /etc/apt/sources.list.d/azure-cli.sources


sudo apt-get update
sudo apt-get install azure-cli

az --version
```

https://microsoft.com/devicelogin
```
npm install express --save
```
// testing frontend and backend
```
// frontend 
npm install
npm start

npm install express cors pg

// backend 

node index.js

psql -U postgres -h localhost -p 5432

\c mydb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO users (name) VALUES ('Atul'), ('Sunita'), ('Tanmay');

http://localhost:5000/
http://localhost:5000/users
http://localhost:3000/
```

```
// 

step 0) install configure postgresql 
use database, create table 

psql -U postgres -h localhost -p 5432

\c mydb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO users (name) VALUES ('Atul'), ('Sunita'), ('Tanmay');



step 1)

manually check for front and backend 

cd backend/src >> node index.js | localhost://5000
database >> localhost://5000/users

cd ..
cd frontend 

npm install 
npm start 

http://localhost:3000

// Step 2) 

// create frontend image 

sudo docker build -t atuljkamble/devopsprojectfrontend .
sudo docker images 
sudo docker run -d -p 3000:3000 atuljkamble/devopsprojectfrontend
sudo docker container ls 

// http://localhost:3000 

// create backend image 

sudo docker build -t atuljkamble/devopsprojectbackend .
sudo docker images 
sudo docker run -d -p 5000:5000 atuljkamble/devopsprojectbackend
sudo docker container ls
 
// http://localhost:5000 


Frontend image url: atuljkamble/devopsprojectbackend

Backend Image url: atuljkamble/devopsprojectfrontend
```
// ACR Configuration 

```
// terraform install and configure 

az login 

paste subscription id to terraform code

terraform init 
terraform plan 
terraform apply 

// configure local machine to work with AKS
az login
az account set --subscription cc57cd42-dede-4674-b810-a0fbde41504a
az aks get-credentials --resource-group aks-resource-group --name aks-cluster --overwrite-existing

kubectl get nodes
kubectl get svc
kubectl get deployments 
kubectl get pods

// Container Regestry Setting 

ACR >> create registry 

docker run -it frontend
docker login atulkamble.azurecr.io



docker login -u atulkamblerepo -p zDEU2CrlUsyqbgHfg9OiG3AC2tJSD1egco3Yuz4r6W+ACRByqLvu atulkamble.azurecr.io

zDEU2CrlUsyqbgHfg9OiG3AC2tJSD1egco3Yuz4r6W+ACRByqLvu

docker tag frontend atulkamble.azurecr.io/frontend
docker push atulkamble.azurecr.io/frontend
docker pull atulkamble.azurecr.io/frontend

docker tag backend atulkamble.azurecr.io/backend
docker push atulkamble.azurecr.io/backend
docker pull atulkamble.azurecr.io/backend

atulkamble.azurecr.io/frontend:latest
atulkamble.azurecr.io/backend:latest

```
// kubernetes 

```

docker - minikube running 
minikube start 

git clone https://github.com/atulkamble/azure-k8s-cicd-pipeline-app.git
cd azure-k8s-cicd-pipeline-app
kubectl apply -f manifests/full-deployment.yaml


atuljkamble/devopsprojectfrontend
3000 32000
atuljkamble/devopsprojectbackend
5000


atulkamble.azurecr.io/frontend:latest
atulkamble.azurecr.io/backend:latest

kubectl apply -f full-deployment.yaml
minikube service frontend-service

kubectl create secret docker-registry acr-secret \
  --docker-server=atulkamble.azurecr.io \
  --docker-username=00000000-0000-0000-0000-000000000000 \
  --docker-password=7WuV/VTNEEr5Of6SX3vjFblueU7KvDxeqZ0Ql3VWBa+ACRClz8Ay \
  --docker-email=atul_kamble@hotmail.com

docker login -u token -p 7WuV/VTNEEr5Of6SX3vjFblueU7KvDxeqZ0Ql3VWBa+ACRClz8Ay atulkamble.azurecr.io


kubectl delete pods -l app=frontend
kubectl delete pods -l app=backend
```
// create secrets 

```
kubectl create secret docker-registry acr-secret \
  --docker-server=atulkamble.azurecr.io \
  --docker-username=atulkamble \
  --docker-password='N0gZFqEeqZzXS/N7YEv+McXRJVg8U6MQd/EkKSKjwf+ACRBBa0UU' \
  --docker-email=atul_kamble@hotmail.com
```
// kubernetes and troubleshooting part 
```
az login
az account set --subscription "cc57cd42-dede-4674-b810-a0fbde41504a"  # Use your subscription ID
az aks get-credentials --resource-group aks-resource-group --name aks-cluster --overwrite-existing


Azure DevOps > Project Settings > Service connections
azure-aks-connection

Pipelines > Edit pipeline > Variables tab


az login
az aks get-credentials --resource-group aks-resource-group --name aks-cluster --overwrite-existing
kubectl get nodes

kubectl config current-context
kubectl get nodes

az aks update \
  --name aks-cluster \
  --resource-group aks-resource-group \
  --attach-acr atulkamble
```
// how to run project 
```
deploy kubernetes cluster via terraform
init, plan, apply >> destroy

run pipeline from azure devops server with service connectors/variables 
```
// project termination 
```
terraform destroy 
```
Delete Pipeline
Delete Project 



