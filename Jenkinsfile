pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'dev-main', description: 'Enter the branch name to checkout')
        string(name: 'DOCKER_NETWORK', defaultValue: 'asset-management-network', description: 'Enter network name')
        string(name: 'IMAGE_NAME', defaultValue: 'rashmi629/react-asset', description: 'Enter docker image name')
        string(name: 'IMAGE_TAG', defaultValue: 'latest', description: 'Enter docker image tag')
        string(name: 'DOCKER_USERNAME', defaultValue: 'rashmi629', description: 'Docker Hub username')
        string(name: 'REACT_APP_CONTAINER', defaultValue: 'frontend-asset-tiger', description: 'Container name')
        string(name: 'REACT_APP_PORT', defaultValue: '8100', description: 'React App Port')
        string(name: 'BASE_API_KEY', defaultValue: 'http://192.168.20.85:8200/api/', description: 'Assettiger management service api')
        string(name: 'CUSTOMER_ID', defaultValue: '1', description: 'Customer Id')
    }

    environment {
        DOCKER_NETWORK = "${params.DOCKER_NETWORK}"
        IMAGE_NAME = "${params.IMAGE_NAME}"
        IMAGE_TAG = "${params.IMAGE_TAG}"
        DOCKER_USERNAME = "${params.DOCKER_USERNAME}"
        REACT_APP_CONTAINER = "${params.REACT_APP_CONTAINER}"
        REACT_APP_PORT = "${params.REACT_APP_PORT}"
        BASE_API_KEY = "${params.BASE_API_KEY}"
        CUSTOMER_ID = "${params.CUSTOMER_ID}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                script {
                    // Explicitly check out from GitHub using the branch provided by the parameter
                    echo "Checking out from branch: ${params.BRANCH_NAME}"
                    git branch: "${params.BRANCH_NAME}", url: 'https://github.com/yourusername/your-repo.git'
                }
            }
        }

        stage('Create Docker Network') {
            steps {
                script {
                    sh """
                        echo "Checking if network ${DOCKER_NETWORK} exists..."
                        if [ -z \$(docker network ls --filter name=^${DOCKER_NETWORK}\$ --format="{{ .Name}}") ]; then
                            echo "Network ${DOCKER_NETWORK} does not exist. Creating..."
                            docker network create ${DOCKER_NETWORK}
                            echo "Network ${DOCKER_NETWORK} has been created."
                        else
                            echo "Network ${DOCKER_NETWORK} already exists."
                        fi
                    """
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push image to Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        def dockerImage = docker.image("${IMAGE_NAME}:${IMAGE_TAG}")
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}:${IMAGE_TAG}").pull()
                }
            }
        }

        stage('Run React App Container') {
            steps {
                script {
                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${REACT_APP_CONTAINER}", returnStatus: true) == 0
                    if (containerExists) {
                        echo "Container ${REACT_APP_CONTAINER} already exists. Removing..."
                        sh "docker rm -f ${REACT_APP_CONTAINER}"
                    }
                    echo "Creating and Starting new container ${REACT_APP_CONTAINER}..."
                    sh """
                        docker run -d --name ${REACT_APP_CONTAINER} --network ${DOCKER_NETWORK} \
                        -p ${REACT_APP_PORT}:80 \
                        --env BASE_API_KEY=${BASE_API_KEY} \
                        --env CUSTOMER_ID=${CUSTOMER_ID} \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
