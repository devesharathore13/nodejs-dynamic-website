pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'deveshrathore13/nodejs-dynamic-website:v1.0'
        AWS_REGION = 'ap-south-1'
        EKS_CLUSTER_NAME = 'my-small-cluster'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("${DOCKER_IMAGE}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    // Configure AWS CLI
                    withAWS(region: "${AWS_REGION}", credentials: 'aws-credentials-id') {
                        sh 'aws eks update-kubeconfig --name ${EKS_CLUSTER_NAME}'
                    }

                    // Deploy to EKS
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}


