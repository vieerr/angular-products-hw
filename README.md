1. docker compose up -d --build

(working with pre built images instead)

docker compose -f docker-compose.hub.yml up

2. hopefully enjoy:)

## Instructions to deploy on a server

I deployed the app on an AWS EC2 instance with Amazon Linux 2.
1. Install Docker and Docker Compose on the server. Change commands according to your server's OS if necessary.
    ```
    sudo yum update -y
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo yum install docker-compose -y
    ```
2. Copy and paste the file `docker-compose.deploy.yml` to the server.
3. Run the following command to start the application:
    ```
    docker compose -f docker-compose.deploy.yml up -d
    ```
4. Configure Caddy to reverse proxy to the application.
5. Configure EC2 security group to allow traffic on port 80 and 443.
6. Access the application via the server's public IP or domain name.

In my case I added a record to my hosted domain using Route 53, pointing to the public IP of the EC2 instance.

Access at https://products.vieerr.xyz 