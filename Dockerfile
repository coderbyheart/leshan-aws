FROM alpine:latest as base
WORKDIR /workdir
RUN apk update && \
    apk upgrade && \
    apk add git openjdk8 maven

FROM base
RUN git clone https://github.com/coderbyheart/leshan-aws-gateway.git leshan && \
    cd leshan && \
    mvn clean install && \
    git rev-parse HEAD  | tr -d '\n' > .version

CMD VERSION=`cat /workdir/leshan/.version` java -jar /workdir/leshan/leshan-server-demo/target/leshan-server-demo-*-SNAPSHOT-jar-with-dependencies.jar 

EXPOSE 5683/udp 5684/udp 5783/udp 5784/udp 8080/tcp 8081/tcp

ARG AWS_QUEUE_URL
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ENV AWS_QUEUE_URL=$AWS_QUEUE_URL
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
