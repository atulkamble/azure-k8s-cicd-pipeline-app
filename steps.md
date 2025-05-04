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



