rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/Documents/AWS/Key-pairs/_eElotechSolutions-london.pem" \
. ubuntu@ec2-18-130-185-83.eu-west-2.compute.amazonaws.com:~/Portfolio




scp -r -i ~/Documents/AWS/Key-pairs/_eElotechSolutions-london.pem ecosystem.config.js ubuntu@ec2-18-130-185-83.eu-west-2.compute.amazonaws.com:/home/ubuntu/Portfolio/server