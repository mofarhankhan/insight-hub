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


    stage('Verify Project Structure') {
        steps {
            sh '''
                set -e

                echo "===== Workspace ====="
                pwd

                echo "===== Project Files ====="
                ls -la

                echo "===== Client Files ====="
                ls -la client

                echo "===== Server Files ====="
                ls -la server

                test -f client/package.json
                test -f server/package.json
                test -f client/Dockerfile
                test -f server/Dockerfile

                echo "Project structure validation successful!"
            '''
        }
    }


    stage('Install Backend Dependencies') {
        steps {
            sh '''
                set -e

                echo "Installing backend dependencies..."

                cd server

                npm ci

                echo "Backend dependencies installed successfully!"
            '''
        }
    }


    stage('Install Frontend Dependencies') {
        steps {
            sh '''
                set -e

                echo "Installing frontend dependencies..."

                cd client

                npm ci

                echo "Frontend dependencies installed successfully!"
            '''
        }
    }


    stage('Frontend Production Build') {
        steps {
            sh '''
                set -e

                echo "Building frontend for production..."

                cd client

                npm run build

                test -d dist

                echo "Frontend production build successful!"
            '''
        }
    }


    stage('Dependency Security Audit') {
        steps {
            sh '''
                set +e

                echo "===== Backend Dependency Security Audit ====="

                cd server
                npm audit --audit-level=high

                BACKEND_AUDIT=$?

                cd ..

                echo "===== Frontend Dependency Security Audit ====="

                cd client
                npm audit --audit-level=high

                FRONTEND_AUDIT=$?

                cd ..

                if [ $BACKEND_AUDIT -ne 0 ] || [ $FRONTEND_AUDIT -ne 0 ]; then
                    echo "High severity dependency vulnerabilities detected!"
                    exit 1
                fi

                echo "Dependency security audit passed!"
            '''
        }
    }


    stage('Docker Build Backend') {
        steps {
            sh '''
                set -e

                echo "Building backend Docker image..."

                docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./server

                echo "Backend Docker image built successfully!"
            '''
        }
    }


    stage('Docker Build Frontend') {
        steps {
            sh '''
                set -e

                echo "Building frontend Docker image..."

                docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./client

                echo "Frontend Docker image built successfully!"
            '''
        }
    }


    stage('Verify Docker Images') {
        steps {
            sh '''
                set -e

                echo "===== Backend Image ====="

                docker image inspect \
                    ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    > /dev/null

                echo "Backend image exists!"

                echo "===== Frontend Image ====="

                docker image inspect \
                    ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    > /dev/null

                echo "Frontend image exists!"

                echo "Docker image verification successful!"
            '''
        }
    }
}


post {

    success {
        echo 'CI pipeline completed successfully!'
    }

    failure {
        echo 'Pipeline failed! Check Jenkins logs for details.'
    }

    always {
        echo 'Pipeline execution finished.'
    }
}


}

