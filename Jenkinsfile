pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        BACKEND_IMAGE  = "insight-hub-backend"
        FRONTEND_IMAGE = "insight-hub-frontend"
        IMAGE_TAG      = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'

                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/mofarhankhan/insight-hub.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Filesystem Security Scan') {
            steps {
                sh '''
                    trivy fs . \
                        --severity HIGH,CRITICAL \
                        --exit-code 1 \
                        --no-progress
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                        -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                        ./server
                '''
            }
        }

        stage('Build Frontend Image') {
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
                    docker image inspect ${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker image inspect ${FRONTEND_IMAGE}:${IMAGE_TAG}
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }

        success {
            echo 'CI and filesystem security checks completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the failed stage before proceeding.'
        }
    }
}
