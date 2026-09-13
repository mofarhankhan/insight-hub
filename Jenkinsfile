pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "insight-hub-backend"
        FRONTEND_IMAGE = "insight-hub-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out InsightHub source code...'

                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/mofarhankhan/insight-hub.git'
            }
        }

        stage('Verify Project') {
            steps {
                sh '''
                    echo "Workspace:"
                    pwd

                    echo "Project structure:"
                    ls -la
                '''
            }
        }

        stage('Docker Build Backend') {
            steps {
                sh '''
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./server
                '''
            }
        }

        stage('Docker Build Frontend') {
            steps {
                sh '''
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./client
                '''
            }
        }

        stage('Verify Docker Images') {
            steps {
                sh '''
                    echo "Backend Image:"
                    docker images ${BACKEND_IMAGE}

                    echo "Frontend Image:"
                    docker images ${FRONTEND_IMAGE}
                '''
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
