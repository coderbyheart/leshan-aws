FROM alpine:latest as base
WORKDIR /workdir
RUN apk update && \
    apk upgrade && \
    apk add git openjdk8 maven && \
    git clone https://github.com/eclipse/leshan.git && \
    cd leshan && \
    mvn clean install

FROM base
CMD java -jar /workdir/leshan/leshan-server-demo/target/leshan-server-demo-*-SNAPSHOT-jar-with-dependencies.jar 

EXPOSE 5683/udp
EXPOSE 5684/udp
EXPOSE 5783/udp
EXPOSE 5784/udp
EXPOSE 8080/tcp
EXPOSE 8081/tcp