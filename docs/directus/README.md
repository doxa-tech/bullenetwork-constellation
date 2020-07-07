# bullenetwork-directus
Headless CMS for the BulleNetwork constellation

## Set up

Rename `{directus, mysql}.env.template` to `{directus, mysql}.env` and set the variables.

Run `docker-compose up`. Check the config with `docker-compose config`.

For files updload with google cloud storage, there might be necessary to set
CORS permissions: https://cloud.google.com/storage/docs/configuring-cors
(https://github.com/directus/api/issues/1715)

## Ubuntu installation

Install docker

```bash
# from https://docs.docker.com/install/linux/docker-ce/ubuntu/
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
> 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
```

Install docker-compose

```bash
# change the version accordingly
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Clone, set and run

```bash
git clone https://github.com/doxa-tech/bullenetwork-directus.git
cd bullenetwork-directus
cp directus.env.template directus.env
cp mysql.env.template mysql.env
> set the variables in those files
# Pull the latest images
sudo docker-compose pull
#  Run the stack
docker-compose up -d
#  Initialize the database and an admin user
docker-compose run directus install --email email@example.com --password d1r3ctu5
```

Storage configuration

```bash
# inside the directus container
composer require league/flysystem-aws-s3-v3
```

Follow https://github.com/directus/api/issues/1715#issuecomment-581860743
