pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out Insight-hub source code....'
                
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/mofarhankhan/insight-hub.git'
            }
        }
        
        stage('Verify Project'){
            steps{
                echo 'Project files'
                
                sh '''
                    pwd
                    ls -la
                    echo "---Client-----"
                    ls -la client
                    echo "---Server-----"
                    ls -la server
                '''
            }
        }
        
    }
    
    post{
        success{
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed...!!!!'
        }
    }
    
}

