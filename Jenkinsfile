pipeline {
    agent any
    
    environment {
        AWS_DEFAULT_REGION = "ap-south-1"
        EKS_CLUSTER_NAME = "my-small-cluster"
        DOCKER_CREDENTIALS_ID = "docker-credentials"
        GITHUB_CREDENTIALS_ID = "github-credentials"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: "${GITHUB_CREDENTIALS_ID}", url: 'git@github.com:deveshrathore13/nodejs-dynamic-website.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("deveshrathore13/nodejs-dynamic-website:latest")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("deveshrathore13/nodejs-dynamic-website:latest").push("latest")
                    }
                }
            }
        }
        
        stage('Deploy to EKS') {
            steps {
                script {
                    // Use AWS CLI to update the Kubernetes deployment with the new image
                    sh """
                    aws eks --region ${AWS_DEFAULT_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}
                    kubectl set image deployment/nodejs-app nodejs-app=deveshrathore13/nodejs-dynamic-website:latest
                    """
                }
            }
        }
    }
}

