pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = "ap-south-1"
        EKS_CLUSTER_NAME = "my-small-cluster"
        DOCKER_IMAGE = "deveshrathore13/nodejs-dynamic-website:latest"
        GITHUB_CREDENTIALS_ID = "github-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:deveshrathore13/nodejs-dynamic-website.git', credentialsId: "${GITHUB_CREDENTIALS_ID}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    script {
                        sh '''
                        aws eks update-kubeconfig --name ${EKS_CLUSTER_NAME} --region ${AWS_DEFAULT_REGION}
                        kubectl apply -f k8s/deployment.yaml
                        kubectl apply -f k8s/service.yaml
                        '''
                    }
                }
            }
        }
    }
}
