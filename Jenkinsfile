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
                checkout scm
                echo "Checked out from branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Create Docker Network') {
            steps {
                script {
                    sh """
                        echo "Checking if network ${env.DOCKER_NETWORK} exists..."
                        if [ -z \$(docker network ls --filter name=^${env.DOCKER_NETWORK}\$ --format="{{ .Name}}") ]; then
                            echo "Network ${env.DOCKER_NETWORK} does not exist. Creating..."
                            docker network create ${env.DOCKER_NETWORK}
                            echo "Network ${env.DOCKER_NETWORK} has been created."
                        else
                            echo "Network ${env.DOCKER_NETWORK} already exists."
                        fi
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        sh """
                            docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} .
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Failed to build Docker image: ${e.message}")
                    }
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}:${IMAGE_TAG}").tag("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push image to Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}'
                        sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
                    }
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                script {
                    try {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").pull()
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Failed to pull Docker image: ${e.message}")
                    }
                }
            }
        }

        stage('Run React App Container') {
            steps {
                script {
                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${env.REACT_APP_CONTAINER}", returnStatus: true) == 0
                    if (containerExists) {
                        echo "Container ${env.REACT_APP_CONTAINER} already exists. Removing..."
                        sh "docker rm -f ${env.REACT_APP_CONTAINER}"
                    }
                    echo "Creating and Starting new container ${env.REACT_APP_CONTAINER}..."
                    sh """
                        docker run -d --name ${env.REACT_APP_CONTAINER} --network ${env.DOCKER_NETWORK} \
                        -p ${env.REACT_APP_PORT}:80 \
                        --env-file .env \
                        ${env.IMAGE_NAME}:${env.IMAGE_TAG}
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

// ===================================================================

// pipeline {
//     agent any

//     options {
//         skipDefaultCheckout(true)
//     }

//     parameters {
//         string(name: 'BRANCH_NAME', defaultValue: 'dev-main', description: 'Enter the branch name to checkout')
//         string(name: 'DOCKER_NETWORK', defaultValue: 'asset-management-network', description: 'Enter network name')
//         string(name: 'IMAGE_NAME', defaultValue: 'rashmi629/react-asset', description: 'Enter docker image name')
//         string(name: 'IMAGE_TAG', defaultValue: 'latest', description: 'Enter docker image tag')
//         string(name: 'DOCKER_USERNAME', defaultValue: 'rashmi629', description: 'Docker Hub username')
//         string(name: 'REACT_APP_CONTAINER', defaultValue: 'frontend-asset-tiger', description: 'Container name')
//         string(name: 'REACT_APP_PORT', defaultValue: '8100', description: 'React App Port')

//         string(name: 'BASE_API_KEY', defaultValue: 'http://192.168.20.85:8200/api/', description: 'Assettiger management service api')
//         string(name: 'CUSTOMER_ID', defaultValue: '1', description: 'Customer Id')
//     }

//     environment {
//         DOCKER_NETWORK = "${params.DOCKER_NETWORK}"
//         IMAGE_NAME = "${params.IMAGE_NAME}"
//         IMAGE_TAG = "${params.IMAGE_TAG}"
//         DOCKER_USERNAME = "${params.DOCKER_USERNAME}"
//         REACT_APP_CONTAINER = "${params.REACT_APP_CONTAINER}"
//         REACT_APP_PORT = "${params.REACT_APP_PORT}"

//         // Add your environment variables here
//         BASE_API_KEY = "${params.BASE_API_KEY}"
//         BASE_UI_FIELDS_API = "${params.BASE_UI_FIELDS_API}"
//         BASE_LOCATION_API = "${params.BASE_LOCATION_API}"
//         CUSTOMER_ID = "${params.CUSTOMER_ID}"
//     }

//     stages {

//         stage('Clean Workspace') {
//             steps {
//                 cleanWs()
//             }
//         }

//         stage('Git Checkout') {
//             steps {

//                 checkout scm
//                 // checkout([$class: 'GitSCM',
//                 //     branches: [[name: "${env.BRANCH_NAME}"]],
//                 //     userRemoteConfigs: [[url: 'https://github.com/rashmiPit/reactjenkins.git', credentialsId: 'git-user1']]
//                 // ])
//                 echo "Checked out from branch: ${env.BRANCH_NAME}"
//             }
//         }

//         stage('Create Docker Network') {
//             steps {
//                 script {
//                     sh """
//                         echo "Checking if network ${env.DOCKER_NETWORK} exists..."
//                         if [ -z \$(docker network ls --filter name=^${env.DOCKER_NETWORK}\$ --format="{{ .Name}}") ]; then
//                             echo "Network ${env.DOCKER_NETWORK} does not exist. Creating..."
//                             docker network create ${env.DOCKER_NETWORK}
//                             echo "Network ${env.DOCKER_NETWORK} has been created."
//                         else
//                             echo "Network ${env.DOCKER_NETWORK} already exists."
//                         fi
//                     """
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     try {
//                         sh """
//                             docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} .
//                         """
//                     } 
//                     catch (Exception e) {
//                         currentBuild.result = 'FAILURE'
//                         error("Failed to build Docker image: ${e.message}")
//                     }
//                 }
//             }
//         }

//         stage('Tag Docker Image') {
//             steps {
//                 script {
//                     docker.image("${IMAGE_NAME}:${IMAGE_TAG}")
//                 }
//             }
//         }

//         stage('Push image to Hub'){
//             steps{
//                 script {
//                     withCredentials([string(credentialsId: 'docker1', variable: 'dockerpwd')]) {
//                         sh 'docker login -u ${DOCKER_USERNAME} -p ${dockerpwd}'
//                     }
//                 sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
//                 }
//             }
//         }

//         stage('Pull Docker Image') {
//             steps {
//                 script {
//                     try {
//                         docker.image("${IMAGE_NAME}:${IMAGE_TAG}").pull()
//                     } catch (Exception e) {
//                         currentBuild.result = 'FAILURE'
//                         error("Failed to pull Docker image: ${e.message}")
//                     }
//                 }
//             }
//         }

//         stage('Run React App Container') {
//             steps {
//                 script {
//                     def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${env.REACT_APP_CONTAINER}", returnStatus: true) == 0
//                     if (containerExists) {
//                         echo "Container ${env.REACT_APP_CONTAINER} already exists. Removing..."
//                         sh "docker rm -f ${env.REACT_APP_CONTAINER}"
//                     }
//                     echo "Creating and Starting new container ${env.REACT_APP_CONTAINER}..."
//                     sh """
//                         docker run -d --name ${env.REACT_APP_CONTAINER} --network ${env.DOCKER_NETWORK} \
//                         -p ${env.REACT_APP_PORT}:80 \
//                         --env-file .env \
//                         ${env.IMAGE_NAME}:${env.IMAGE_TAG}
//                     """
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             cleanWs()
//         }
//     }
// }
