pipeline {
    agent any

    environment {
	    REGISTRY = "mofarhankhann"
        BACKEND_IMAGE = "insight-hub-backend"
        FRONTEND_IMAGE = "insight-hub-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout'){
            steps{
                checkout scm
            }
        }

        stage('Install Dependencies'){
            parallel {

                stage('Backend Dependencies') {
                    steps{
                        dir('server'){
                            sh 'npm ci'
                        }
                    }
                }

                stage('Frontend Dependencies') {
                    steps{
                        dir('client'){
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Filesystem Security Scan'){
            steps{
                sh '''
                    trivy fs . \
                        --scanners vuln,secret \
                        --severity HIGH,CRITICAL \
                        --exit-code 1
                '''
            }
        }

        stage('Build Docker Images'){
            parallel{

                stage('Build Backend Image'){
                    steps{
                        sh '''
                            docker build \
                                --tag ${BACKEND_IMAGE}:${IMAGE_TAG} \
                                server
                        '''
                    }
                }

                stage('Build Frontend Image'){
                    steps{
                        sh '''
                            docker build \
                                --tag ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                                client
                        '''
                    }
                }
            }
        }

        stage('Docker Image Security Scan'){
            steps{

                sh """
                    echo "Scanning backend image: ${BACKEND_IMAGE}:${IMAGE_TAG}"

                    trivy image \
                        --severity HIGH,CRITICAL \
                        --exit-code 1 \
                        ${BACKEND_IMAGE}:${IMAGE_TAG}
                """

                sh """
                    echo "Scanning frontend image: ${FRONTEND_IMAGE}:${IMAGE_TAG}"

                    trivy image \
                        --severity HIGH,CRITICAL \
                        --exit-code 1 \
                        ${FRONTEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('Kubernetes Manifest Validation'){
            steps{
                sh '''
                    kubeconform \
                        -strict \
			-summary \
                        k8s/
                '''
            }
        }

        stage('Docker Registry Push'){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]){
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            --username "$DOCKER_USERNAME" \
                            --password-stdin

                        docker tag \
                            ${BACKEND_IMAGE}:${IMAGE_TAG} \
                            ${REGISTRY}/${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker tag \
                            ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                            ${REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                        docker push \
                            ${REGISTRY}/${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker push \
                            ${REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    '''
                }
            }
        }

        stage('Update Kubernetes Image Tag'){
            steps{
                sh '''
                    sed -i "s/newTag: \\"[0-9.]*\\"/newTag: \\"${IMAGE_TAG}\\"/g" k8s/kustomization.yaml
                '''
            }
        }

    }

    post {
        always{
            echo 'Pipeline Execution finished!!!'
        }

        success{
            echo 'CI security checks and Docker builds completed successfully!!!'
        }

        failure{
            echo 'Pipeline failed. Review the failed stage in Jenkins!!!'
        }
    }
    

}
