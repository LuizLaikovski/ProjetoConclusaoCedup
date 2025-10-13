FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    openjdk-21-jdk \
    && wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor | tee /usr/share/keyrings/mongodb-archive-keyring.gpg > /dev/null \
    && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update && apt-get install -y mongodb-org

RUN mkdir -p /data/db

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080 27017

CMD mongod --bind_ip_all --fork --logpath /var/log/mongodb.log && \
    sleep 3 && \
    mongosh --eval "use ClickRead'y" --eval "db.createCollection('app')" && \
    java -jar app.jar