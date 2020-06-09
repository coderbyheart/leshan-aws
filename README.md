# Leshan LwM2M AWS IoT Gateway

![Docker](https://github.com/coderbyheart/leshan-aws/workflows/Test%20Docker%20Image/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Use [Eclipse Leshan](https://github.com/eclipse/leshan) as a LwM2M gateway to
[AWS IoT](https://aws.amazon.com/iot/).

## Running in Docker

    docker build -t coderbyheart/leshan-aws .

Make these environment variable available:

> ℹ️ Linux users can use [direnv](https://direnv.net/) to simplify the process.

    export AWS_REGION=<...>
    export AWS_QUEUE_URL=<...>
    export AWS_ACCESS_KEY_ID=<...>
    export AWS_SECRET_ACCESS_KEY=<...>

    docker run \
        -e AWS_QUEUE_URL \
        -e AWS_REGION \
        -e AWS_ACCESS_KEY_ID \
        -e AWS_SECRET_ACCESS_KEY \
        --rm --net=host -P coderbyheart/leshan-aws

## Deploy to AWS

Make these environment variable available:

> ℹ️ Linux users can use [direnv](https://direnv.net/) to simplify the process.

    export AWS_REGION=<...>
    export AWS_ACCESS_KEY_ID=<Access Key ID of the service account>
    export AWS_SECRET_ACCESS_KEY=<Secret Access Key of the service account>

Install dependencies

    npm ci

Set the ID of the stack

    export STACK_PREFIX="${STACK_PREFIX:-leshan}"

Deploy the ECR stack to an AWS Account

    npx cdk -a 'node dist/cdk-ecr.js' deploy ${STACK_PREFIX}-ecr

Prepare the account for CDK resources:

    npx cdk bootstrap

Publish the docker image to AWS Elastic Container Registry

    ECR_REPOSITORY_NAME=`aws cloudformation describe-stacks --stack-name ${STACK_PREFIX}-ecr | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "repositoryName") | .OutputValue'`
    ECR_REPOSITORY_URI=`aws cloudformation describe-stacks --stack-name ${STACK_PREFIX}-ecr | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "repositoryUri") | .OutputValue'`
    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPOSITORY_URI}
    docker tag coderbyheart/leshan-aws:latest ${ECR_REPOSITORY_URI}:latest
    docker push ${ECR_REPOSITORY_URI}:latest

Deploy the server stack to an AWS account

    npx cdk deploy '*'

## Continuous Deployment

Continuous Deployment of releases is done
[through GitHub Actions](.github/workflows/cd.yaml). Configure these secrets:

- `AWS_REGION`: Region where the stack is deployed
- `AWS_ACCESS_KEY_ID`: Access key ID for the CD user
- `AWS_SECRET_ACCESS_KEY`: Secret access key for the CD user
- `USER_GITHUB_TOKEN_FOR_ACTION_TRIGGER`: In order to be able to trigger this
  action, a GitHub user token with the permissions `public_repo`, `repo:status`,
  `repo_deployment` is needed (the default Actions credentials
  [can't trigger other Actions](https://help.github.com/en/actions/reference/events-that-trigger-workflows#triggering-new-workflows-using-a-personal-access-token)).

Afterwards the [Test Action](.github/workflows/test.yml) will trigger a
deployment.

## Deploying a new version of the server manually

Publish a new version of the image to ECR (see above), then trigger a new
deployment:

    SERVICE_ID=`aws cloudformation describe-stacks --stack-name ${STACK_PREFIX} | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "fargateServiceArn") | .OutputValue'`
    CLUSTER_NAME=`aws cloudformation describe-stacks --stack-name ${STACK_PREFIX} | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "clusterArn") | .OutputValue'`
    aws ecs update-service --service $SERVICE_ID --cluster $CLUSTER_NAME --force-new-deployment
